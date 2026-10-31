/**
 * 台灣全民英檢 (GEPT) 測驗平台 — Google 試算表「全民英檢成績(自動)」自動寫入與 Google 帳號檢核後端腳本
 * 綁定試算表 ID: 1Tc4ga4XEA9LoB-HB2bFhN5j1S-ws1UHT65Ea0y8s7PI
 * 試算表網址: https://docs.google.com/spreadsheets/d/1Tc4ga4XEA9LoB-HB2bFhN5j1S-ws1UHT65Ea0y8s7PI/edit
 *
 * 部署步驟：
 * 1. 開啟「全民英檢成績(自動)」試算表 -> 點選上方選單「擴充功能」>「Apps Script」
 * 2. 將本程式碼貼入 Code.gs 並儲存（如需自動讀取 Google 帳戶中文顯示名稱，可於左側「服務」啟用 People API）
 * 3. 點選右上角「部署」>「新增部署作業」> 類型選擇「網頁應用程式 (Web App)」
 * 4. 「執行身分」選擇「我 (Me)」，「誰可以存取」必須選擇「所有人 (Anyone)」
 *    （考生瀏覽器只送出成績，不再跳出「未完成 Google 驗證程序」的授權視窗）
 * 5. 複製部署後的網頁應用程式網址 (https://script.google.com/macros/s/.../exec)
 *    貼入前端 src/index.html 的 GAS_WEBAPP_URL
 * 6. 頁籤「App版次」由編譯成功後自動建立。改過本檔後要再部署新版本，
 *    平板啟動時的版次檢查與寫入版次才會生效。
 * 7. Gemini 金鑰只放在「專案設定 → 指令碼屬性」，名稱 GEMINI_API_KEY。
 *    不要寫進本檔或網頁。出題由 doGet?action=generateQuestions 在背景呼叫。
 */

const SPREADSHEET_ID = '1Tc4ga4XEA9LoB-HB2bFhN5j1S-ws1UHT65Ea0y8s7PI';
const SHEET_NAME = '測驗成績紀錄';
const REVIEW_SHEET_NAME = '作答回顧';
const VERSION_SHEET_NAME = 'App版次';
// 編譯腳本從此常數讀取。不要貼進 index.html，否則任何平板都能把舊版改成最新。
const VERSION_PUBLISH_TOKEN = 'b7e4c91a6d2f4803ae15c8d79f0b3264';

/**
 * 供前端開啟時自動檢核 Google 帳號驗證狀態並直接抓取 Google 提供的中文姓名（免手動填寫）
 */
function getAuthenticatedGoogleUser() {
  try {
    const email = Session.getActiveUser().getEmail();
    if (!email) {
      return { loggedIn: false, email: '', name: '' };
    }
    let displayName = '';
    let pictureUrl = '';
    try {
      if (typeof People !== 'undefined' && People.People) {
        const profile = People.People.get('people/me', { personFields: 'names,photos' });
        if (profile && profile.names && profile.names.length > 0) {
          const n = profile.names[0];
          if (n.familyName && n.givenName && /[\u4e00-\u9fa5]/.test(n.familyName + n.givenName)) {
            displayName = n.familyName + n.givenName;
          } else {
            displayName = n.displayName || '';
          }
        }
        if (profile && profile.photos && profile.photos.length > 0) {
          pictureUrl = profile.photos[0].url || '';
        }
      }
    } catch (innerErr) {}

    if (!displayName) {
      displayName = email.split('@')[0];
    }
    return {
      loggedIn: true,
      email: email,
      name: displayName,
      picture: pictureUrl
    };
  } catch (err) {
    return { loggedIn: false, error: String(err) };
  }
}

/** 開始／結束時間只保留 HH:mm:ss；前面加 ' 讓試算表以文字儲存，避免自動補上日期。 */
function toSheetClockText(value) {
  const text = String(value == null ? '' : value).trim();
  if (!text || text === '-') return text;
  const match = text.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
  if (!match) return text;
  const hh = ('0' + match[1]).slice(-2);
  const mm = match[2];
  const ss = match[3] || '00';
  return "'" + hh + ':' + mm + ':' + ss;
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function sheetTextValue(value) {
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    return Utilities.formatDate(value, 'Asia/Taipei', 'yyyy-MM-dd HH:mm:ss');
  }
  return String(value == null ? '' : value).replace(/^'/, '').trim();
}

function ensureVersionSheet(ss) {
  let sheet = ss.getSheetByName(VERSION_SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(VERSION_SHEET_NAME);
  const header = String(sheet.getRange(1, 1).getValue() || '');
  if (header !== '版次代碼') {
    if (sheet.getLastRow() > 0) sheet.insertRowBefore(1);
    sheet.getRange(1, 1, 1, 4).setValues([['版次代碼', '版次名稱', '建置時間', '是否最新']]);
    sheet.setFrozenRows(1);
  }
  sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
  sheet.getRange('A:A').setNumberFormat('0');
  sheet.setColumnWidth(2, 160);
  sheet.setColumnWidth(3, 180);
  sheet.getRange('A1').setNote('由 build-apk.bat 編譯成功後寫入。D 欄為「是」的那一列，是平板啟動時要比對的最新版。');
  return sheet;
}

function getLatestAppVersion() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(VERSION_SHEET_NAME);
  if (!sheet || sheet.getLastRow() < 2) {
    return { ok: true, found: false, versionCode: 0, versionName: '', builtAt: '' };
  }
  const values = sheet.getRange(1, 1, sheet.getLastRow(), 4).getValues();
  let best = null;
  for (let i = 1; i < values.length; i++) {
    const code = Number(values[i][0]);
    if (!code || String(values[i][3]) !== '是') continue;
    if (!best || code >= best.versionCode) {
      best = {
        versionCode: code,
        versionName: sheetTextValue(values[i][1]),
        builtAt: sheetTextValue(values[i][2])
      };
    }
  }
  if (!best) return { ok: true, found: false, versionCode: 0, versionName: '', builtAt: '' };
  return {
    ok: true,
    found: true,
    versionCode: best.versionCode,
    versionName: best.versionName,
    builtAt: best.builtAt
  };
}

function publishAppVersion(data) {
  const token = String(data.token || '');
  if (!token || token !== VERSION_PUBLISH_TOKEN) {
    return { ok: false, error: '版次發布驗證失敗' };
  }
  const versionCode = Number(data.versionCode);
  const versionName = String(data.versionName || '').trim();
  const builtAt = String(data.builtAt || '').trim();
  if (!versionCode || versionCode < 1 || Math.floor(versionCode) !== versionCode) {
    return { ok: false, error: '版次代碼不正確' };
  }
  if (!/^\d{4}\.\d{2}\.\d{2}\.\d+$/.test(versionName)) {
    return { ok: false, error: '版次名稱格式不正確' };
  }
  if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(builtAt)) {
    return { ok: false, error: '建置時間格式不正確' };
  }

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ensureVersionSheet(ss);
  const last = Math.max(sheet.getLastRow(), 1);
  const codes = sheet.getRange(1, 1, last, 1).getValues();
  const marks = sheet.getRange(1, 4, last, 1).getValues();
  let targetRow = -1;
  const clearRows = [];
  for (let i = 1; i < codes.length; i++) {
    const row = i + 1;
    if (Number(codes[i][0]) === versionCode) targetRow = row;
    else if (String(marks[i][0]) === '是') clearRows.push(row);
  }
  clearRows.forEach(function (row) {
    sheet.getRange(row, 4).setValue('否');
  });
  if (targetRow === -1) targetRow = sheet.getLastRow() + 1;
  sheet.getRange(targetRow, 1, 1, 4).setValues([[
    versionCode,
    versionName,
    "'" + builtAt,
    '是'
  ]]);
  SpreadsheetApp.flush();
  return { ok: true, versionCode: versionCode, versionName: versionName, builtAt: builtAt, row: targetRow };
}

function cleanBlock(value, maxLen) {
  return String(value == null ? '' : value).replace(/[<>]/g, '').trim().slice(0, maxLen || 900);
}

function hasEnglish(text, minLetters) {
  const letters = String(text || '').match(/[A-Za-z]/g);
  return !!(letters && letters.length >= minLetters);
}

function answerIndex(value, count) {
  const text = String(value == null ? '' : value).trim();
  if (/^\d+$/.test(text)) {
    const n = Number(text);
    if (n >= 0 && n < count) return n;
  }
  const letter = text.toUpperCase().charAt(0);
  const map = { A: 0, B: 1, C: 2, D: 3 };
  if (Object.prototype.hasOwnProperty.call(map, letter) && map[letter] < count) return map[letter];
  return -1;
}

function plainChoices(list) {
  if (!Array.isArray(list)) return [];
  return list.map(function (item) {
    return cleanBlock(item, 220).replace(/^[A-D][\.\)]\s*/, '');
  }).filter(function (item) { return item; });
}

function shuffleChoices(options, answer, extras) {
  const items = options.map(function (text, idx) {
    return { text: text, ok: idx === answer, extra: extras ? extras[idx] : '' };
  });
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = items[i];
    items[i] = items[j];
    items[j] = tmp;
  }
  const prefixes = ['A. ', 'B. ', 'C. ', 'D. '];
  return {
    options: items.map(function (it, idx) { return prefixes[idx] + it.text; }),
    answer: items.findIndex(function (it) { return it.ok; }),
    extras: extras ? items.map(function (it) { return it.extra; }) : null
  };
}

function keywordList(value, fallbackText) {
  const source = Array.isArray(value) ? value : String(value || '').split(/[,，]/);
  let list = source.map(function (word) {
    return String(word).toLowerCase().replace(/[^a-z0-9' -]/g, '').trim();
  }).filter(function (word) { return word.length > 1; });
  if (list.length < 3 && fallbackText) {
    list = String(fallbackText).toLowerCase().split(/[^a-z0-9']+/).filter(function (word) {
      return word.length > 3;
    }).slice(0, 6);
  }
  return list.slice(0, 8);
}

function pickTheme(level, forbidden) {
  const elementary = ['上學的早晨', '全家早餐', '搭公車', '圖書館', '週末公園', '便利商店', '天氣與衣服', '同學生日', '校園活動', '早餐店'];
  const intermediate = ['打工排班', '社團活動', '週末旅遊', '規律運動', '社區服務', '線上課程', '零用錢', '準備考試', '鄰里生活', '健康習慣'];
  const list = (level === '初級' ? elementary : intermediate).filter(function (item) { return item !== forbidden; });
  return list[Math.floor(Math.random() * list.length)];
}

function questionPrompt(level) {
  const elementary = level === '初級';
  return [
    '你是全民英檢命題者。請寫一份原創的 30 分鐘濃縮練習卷，使用繁體中文題幹與英文試題。',
    '詞彙只能落在 LTTC 全民英檢參考字表（https://www.lttc.ntu.edu.tw/tw/vocabulary ，2024 年 2 月修訂）。',
    elementary
      ? '級別是初級、CEFR A2。只用初級字表裡的日常用字，不要用中級或中高級字。'
      : '級別是中級、CEFR B1。可以用初級與中級字表，不要用中高級或學術字。',
    '不要抄官方考古題。每個干擾選項都要文法成立，但語意錯誤。正解位置不要都放在第一個。',
    '聽力 audio 必須是完整英文口白。看圖辨義要把 A、B、C 的英文描述念出來，因為試卷只顯示代號。',
    '回傳單一 JSON 物件，不要 Markdown。',
    'listening 必須正好 10 題，依序是：看圖辨義 2、問答 3、簡短對話 3、短文或談話 2。',
    elementary
      ? '初級聽力每題 3 個選項。前 2 題 svg 只能是 coffee、runner、morning、schedule 其中之一，而且要和圖意一致。最後 2 題是廣播，optionSvgs 給 3 個不重複的代號，只能從 desk、t610、t730、noon、month、computer、closed、bread、cake、card、friends、cash、monday、saturday、everyday、night、home 選，並與正確圖片一致。'
      : '中級聽力每題 4 個選項。前 2 題 svg 只能是 coffee、runner、schedule、morning。最後 2 題不要 optionSvgs。',
    'reading 必須正好 10 題、每題 4 個選項：詞彙 4 題、段落填空 3 題、閱讀理解 3 題。',
    '第 5 題與第 8 題（從 1 起算）要帶 passage，同組其餘題 passage 留空。段落填空的 passage 用 (5)(6)(7) 當空格。',
    'speaking 必須正好 5 題。',
    elementary
      ? '初級口說：前 2 句是 8 到 12 個字的複誦句；第 3 題是 25 到 40 個字的朗讀短文；後 2 題是日常生活問句。'
      : '中級口說：第 1 題是 30 到 45 個字的朗讀短文；接著 2 題是 15 秒能答完的問題；第 4 題是 30 秒能答完的問題；第 5 題是看圖敘述。圖固定是三欄 Work、Run、Home。printedQuestions 給 3 個繁體中文問題。',
    elementary
      ? 'sentences 給 3 題，依序是句子改寫、句子合併、句子重組。essay 是看圖段落：圖固定是晴天、有人在慢跑、桌上有一杯飲料。用繁體中文出題，sample 約 50 個英文字。'
      : 'translation 是一段 20 到 40 個中文字的中譯英，sample 為英文。essay 是 80 到 120 字的英文作文題，prompt 用繁體中文說明題目。',
    '每一題都要有 why（繁體中文一句解析）和 rate（60 到 90 的整數）。keywords 用小寫英文單字陣列。answer 從 0 起算。',
    'JSON 形狀：{"listening":[{"audio":"","options":[],"answer":0,"why":"","rate":80,"svg":"","optionSvgs":[]}],"reading":[{"prompt":"","passage":"","options":[],"answer":0,"why":"","rate":80}],"speaking":[{"audio":"","keywords":[],"printedQuestions":[]}],"sentences":[{"type":"","prompt":"","sample":"","keywords":[]}],"translation":{"prompt":"","sample":"","keywords":[]},"essay":{"prompt":"","sample":"","keywords":[]}}',
    elementary ? '初級不要 translation。' : '中級不要 sentences。'
  ].join('\n');
}

function requestGemini(apiKey, model, prompt, useThinking) {
  const generationConfig = {
    temperature: 0.8,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json'
  };
  if (useThinking) generationConfig.thinkingConfig = { thinkingBudget: 0 };
  const response = UrlFetchApp.fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent',
    {
      method: 'post',
      contentType: 'application/json',
      headers: { 'x-goog-api-key': apiKey },
      muteHttpExceptions: true,
      payload: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: generationConfig
      })
    }
  );
  const status = response.getResponseCode();
  let body = {};
  try { body = JSON.parse(response.getContentText() || '{}'); } catch (err) { body = {}; }
  if (status < 200 || status >= 300) {
    const message = body && body.error && body.error.message ? String(body.error.message) : ('HTTP ' + status);
    return { ok: false, status: status, error: message.slice(0, 180) };
  }
  const parts = body.candidates && body.candidates[0] && body.candidates[0].content
    ? body.candidates[0].content.parts || []
    : [];
  const text = parts.filter(function (part) { return part && part.text && !part.thought; }).map(function (part) {
    return part.text;
  }).join('');
  if (!text) return { ok: false, status: status, error: '命題沒有回傳內容' };
  return { ok: true, status: status, text: text };
}

function callGemini(apiKey, prompt) {
  const models = ['gemini-2.5-flash', 'gemini-2.0-flash'];
  let lastError = '出題服務沒有回應';
  for (let i = 0; i < models.length; i++) {
    const first = requestGemini(apiKey, models[i], prompt, true);
    if (first.ok) return first.text;
    if (first.status === 400) {
      const second = requestGemini(apiKey, models[i], prompt, false);
      if (second.ok) return second.text;
      lastError = second.error || first.error;
      break;
    }
    lastError = first.error || lastError;
    if (first.status !== 404) break;
  }
  throw new Error(lastError);
}

function normalizeQuestionPaper(level, raw, round) {
  if (!raw || typeof raw !== 'object') return null;
  const elementary = level === '初級';
  const listenCount = elementary ? 3 : 4;
  const listenParts = elementary
    ? ['第一部分：看圖辨義', '第一部分：看圖辨義', '第二部分：問答', '第二部分：問答', '第二部分：問答', '第三部分：簡短對話', '第三部分：簡短對話', '第三部分：簡短對話', '第四部分：短文聽解', '第四部分：短文聽解']
    : ['第一部分：看圖辨義', '第一部分：看圖辨義', '第二部分：問答', '第二部分：問答', '第二部分：問答', '第三部分：簡短對話', '第三部分：簡短對話', '第三部分：簡短對話', '第四部分：簡短談話', '第四部分：簡短談話'];
  const readParts = ['第一部分：詞彙', '第一部分：詞彙', '第一部分：詞彙', '第一部分：詞彙', '第二部分：段落填空', '第二部分：段落填空', '第二部分：段落填空', '第三部分：閱讀理解', '第三部分：閱讀理解', '第三部分：閱讀理解'];
  const stemSvg = { coffee: 1, runner: 1, morning: 1, schedule: 1 };
  const choiceSvg = { desk: 1, t610: 1, t730: 1, noon: 1, month: 1, computer: 1, closed: 1, bread: 1, cake: 1, card: 1, friends: 1, cash: 1, monday: 1, saturday: 1, everyday: 1, night: 1, home: 1 };
  const prefix = elementary ? 'E' : 'I';
  const meta = {};
  const listening = [];
  const sourceL = Array.isArray(raw.listening) ? raw.listening : [];
  if (sourceL.length !== 10) return null;
  for (let i = 0; i < 10; i++) {
    const item = sourceL[i] || {};
    const choices = plainChoices(item.options);
    if (choices.length !== listenCount) return null;
    const ok = answerIndex(item.answer, choices.length);
    if (ok < 0) return null;
    let optionSvgs = null;
    if (elementary && i >= 8 && Array.isArray(item.optionSvgs)) {
      optionSvgs = item.optionSvgs.map(function (name) { return String(name || '').trim(); });
      if (optionSvgs.length !== choices.length || optionSvgs.some(function (name) { return !choiceSvg[name]; })) optionSvgs = null;
    }
    const shuffled = shuffleChoices(choices, ok, optionSvgs);
    const id = prefix + 'L' + (i + 1) + '_G' + round;
    const audio = cleanBlock(item.audio, 700);
    if (!hasEnglish(audio, 20)) return null;
    const q = {
      id: id,
      part: listenParts[i],
      prompt: '請聽語音後作答：',
      options: shuffled.options,
      answer: shuffled.answer,
      audioText: audio,
      stemKey: 'g' + round + '-' + id
    };
    if (i < 2) {
      const svg = String(item.svg || '').trim();
      q.svgType = stemSvg[svg] ? svg : 'coffee';
    }
    if (shuffled.extras) q.optionSvgs = shuffled.extras;
    listening.push(q);
    meta[id] = { peerRate: Math.max(60, Math.min(90, Number(item.rate) || 78)), explanation: cleanBlock(item.why, 160) || '請依聽到的關鍵字作答。' };
  }

  const reading = [];
  const sourceR = Array.isArray(raw.reading) ? raw.reading : [];
  if (sourceR.length !== 10) return null;
  for (let i = 0; i < 10; i++) {
    const item = sourceR[i] || {};
    const choices = plainChoices(item.options);
    if (choices.length !== 4) return null;
    const ok = answerIndex(item.answer, 4);
    if (ok < 0) return null;
    const shuffled = shuffleChoices(choices, ok, null);
    const id = prefix + 'R' + (i + 1) + '_G' + round;
    const q = {
      id: id,
      part: readParts[i],
      prompt: cleanBlock(item.prompt, 300),
      options: shuffled.options,
      answer: shuffled.answer,
      stemKey: 'g' + round + '-' + id
    };
    if (!q.prompt) return null;
    if (i === 4 || i === 7) {
      q.passage = cleanBlock(item.passage, 1200);
      if (q.passage.length < 40) return null;
    }
    reading.push(q);
    meta[id] = { peerRate: Math.max(60, Math.min(90, Number(item.rate) || 78)), explanation: cleanBlock(item.why, 160) || '請看空格前後與全文。' };
  }

  const speakPlan = elementary
    ? [
      ['第一部分：純音聽複誦', true, 10, '請聽兩次後，在 10 秒內複誦這句英文。'],
      ['第一部分：純音聽複誦', true, 10, '請聽兩次後，在 10 秒內複誦這句英文。'],
      ['第二部分：朗讀短文', false, 20, '【試卷印有短文】請直接朗讀下方文字，正試不播放示範音。'],
      ['第三部分：回答問題', true, 15, '請聽問題兩次，再用英文回答。'],
      ['第三部分：回答問題', true, 15, '請聽問題兩次，再用英文回答。']
    ]
    : [
      ['第一部分：朗讀短文', false, 25, '【試卷印有短文】請直接朗讀下方文字，正試不播放示範音。'],
      ['第二部分：回答問題', true, 15, '請聽兩次後，用 15 秒回答。'],
      ['第二部分：回答問題', true, 15, '請聽兩次後，用 15 秒回答。'],
      ['第二部分：回答問題', true, 30, '請聽兩次後，用 30 秒說明。'],
      ['第三部分：看圖敘述', false, 45, '【試卷印有圖與問題】請看圖後直接回答，不必把題號唸出來。']
    ];
  const sourceS = Array.isArray(raw.speaking) ? raw.speaking : [];
  if (sourceS.length !== 5) return null;
  const speaking = speakPlan.map(function (plan, i) {
    const item = sourceS[i] || {};
    const audio = cleanBlock(item.audio, 500);
    if (!hasEnglish(audio, 12)) return null;
    const q = {
      id: prefix + 'S' + (i + 1) + '_G' + round,
      part: plan[0],
      audioOnly: plan[1],
      timeLimitSec: plan[2],
      audioText: audio,
      expectedKeywords: keywordList(item.keywords, audio),
      instruction: plan[3],
      stemKey: 'g' + round + '-S' + (i + 1)
    };
    if (!elementary && i === 4) {
      q.svgType = 'balance';
      const printed = Array.isArray(item.printedQuestions) ? item.printedQuestions.map(function (line) {
        return cleanBlock(line, 80);
      }).filter(Boolean) : [];
      q.printedQuestions = printed.length === 3
        ? printed
        : ['1. 圖中的三個部分分別是什麼？', '2. 你覺得這樣安排一週好嗎？為什麼？', '3. 你自己會怎麼調整？'];
    }
    return q.expectedKeywords.length ? q : null;
  });
  if (speaking.some(function (item) { return !item; })) return null;

  const writing = {};
  if (elementary) {
    const rows = Array.isArray(raw.sentences) ? raw.sentences : [];
    if (rows.length !== 3 || !raw.essay) return null;
    const types = ['句子改寫', '句子合併', '句子重組'];
    writing.sentences = rows.map(function (row, i) {
      const sample = cleanBlock(row.sample, 240);
      return {
        id: 'EW' + (i + 1) + '_G' + round,
        type: types[i],
        prompt: cleanBlock(row.prompt, 300),
        sample: sample,
        keywords: keywordList(row.keywords, sample),
        stemKey: 'g' + round + '-EW'
      };
    });
    if (writing.sentences.some(function (row) { return !row.prompt || !row.sample || !row.keywords.length; })) return null;
    const essaySample = cleanBlock(raw.essay.sample, 500);
    writing.essay = {
      id: 'EW_ESSAY_G' + round,
      title: '第二部分：看圖段落寫作',
      svgType: 'morning',
      prompt: cleanBlock(raw.essay.prompt, 400),
      sample: essaySample,
      keywords: keywordList(raw.essay.keywords, essaySample),
      minWords: 35,
      stemKey: 'g' + round + '-EW'
    };
    if (!writing.essay.prompt || !writing.essay.sample) return null;
  } else {
    if (!raw.translation || !raw.essay) return null;
    const transSample = cleanBlock(raw.translation.sample, 400);
    writing.translation = {
      id: 'IW_TRANS_G' + round,
      title: '中譯英',
      prompt: cleanBlock(raw.translation.prompt, 300),
      sample: transSample,
      keywords: keywordList(raw.translation.keywords, transSample),
      stemKey: 'g' + round + '-IW'
    };
    const essaySample = cleanBlock(raw.essay.sample, 900);
    writing.essay = {
      id: 'IW_ESSAY_G' + round,
      title: '英文作文',
      prompt: cleanBlock(raw.essay.prompt, 400),
      sample: essaySample,
      keywords: keywordList(raw.essay.keywords, essaySample),
      minWords: 60,
      stemKey: 'g' + round + '-IW'
    };
    if (!writing.translation.prompt || !writing.translation.keywords.length || !writing.essay.prompt || !writing.essay.sample) return null;
  }

  return { set: { listening: listening, reading: reading, speaking: speaking, writing: writing }, meta: meta };
}

function generateQuestionPaper(level, purpose) {
  try {
    if (level !== '初級' && level !== '中級') return { ok: false, error: '級別不正確' };
    const use = purpose === 'exam' ? 'exam' : 'practice';
    const props = PropertiesService.getScriptProperties();
    const apiKey = String(props.getProperty('GEMINI_API_KEY') || '').trim();
    if (!apiKey) return { ok: false, error: '尚未設定 GEMINI_API_KEY' };

    const cache = CacheService.getScriptCache();
    const cacheKey = 'gq3_' + (level === '初級' ? 'e' : 'i') + '_' + use;
    const cached = cache.get(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.ok && parsed.set) return parsed;
      } catch (err) {}
    }

    const gateKey = cacheKey + '_busy';
    if (cache.get(gateKey)) return { ok: false, busy: true };
    cache.put(gateKey, '1', 55);
    try {
      const again = cache.get(cacheKey);
      if (again) return JSON.parse(again);
      let avoid = '';
      if (use === 'exam') {
        const practiceRaw = cache.get('gq3_' + (level === '初級' ? 'e' : 'i') + '_practice');
        if (practiceRaw) {
          try { avoid = JSON.parse(practiceRaw).theme || ''; } catch (err) { avoid = ''; }
        }
      }
      const theme = pickTheme(level, avoid);
      const prompt = questionPrompt(level) + '\n這一份的情境是「' + theme + '」。' + (avoid ? '\n不要使用這個情境：' + avoid + '。' : '') + '\n變化編號 ' + Utilities.getUuid() + '。';
      const text = callGemini(apiKey, prompt).replace(/```json|```/g, '').trim();
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');
      if (jsonStart < 0 || jsonEnd <= jsonStart) throw new Error('題目不是 JSON');
      const raw = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
      const round = Number(props.getProperty('GEMINI_PAPER_ROUND') || '1') + 1;
      props.setProperty('GEMINI_PAPER_ROUND', String(round));
      const paper = normalizeQuestionPaper(level, raw, round);
      if (!paper) return { ok: false, error: '題目格式無法使用' };
      const payload = { ok: true, level: level, purpose: use, round: round, theme: theme, set: paper.set, meta: paper.meta };
      const packed = JSON.stringify(payload);
      if (Utilities.newBlob(packed).getBytes().length < 90000) cache.put(cacheKey, packed, 1800);
      return payload;
    } finally {
      cache.remove(gateKey);
    }
  } catch (err) {
    const message = String(err && err.message ? err.message : err);
    return { ok: false, error: message.indexOf('AIza') >= 0 ? '出題失敗' : message.slice(0, 180) };
  }
}

function doGet(e) {
  try {
    const action = e && e.parameter ? String(e.parameter.action || '') : '';
    if (action === 'appVersion') return jsonOut(getLatestAppVersion());
    if (action === 'generateQuestions') {
      const level = e && e.parameter ? String(e.parameter.level || '') : '';
      const purpose = e && e.parameter ? String(e.parameter.purpose || '') : '';
      return jsonOut(generateQuestionPaper(level, purpose));
    }
    return jsonOut({ ok: false, error: '未知的查詢' });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

function ensureReviewSheet(ss) {
  let sheet = ss.getSheetByName(REVIEW_SHEET_NAME);
  const header = ['測驗序號', '考生中文姓名', '測驗級別', '科目', '題號', '部分', '題目', '正確答案或參考', '考生作答', '結果'];
  if (!sheet) sheet = ss.insertSheet(REVIEW_SHEET_NAME);
  if (String(sheet.getRange(1, 1).getValue() || '') !== '測驗序號') {
    if (sheet.getLastRow() > 0) sheet.insertRowBefore(1);
    sheet.getRange(1, 1, 1, header.length).setValues([header]);
    sheet.getRange(1, 1, 1, header.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(7, 420);
    sheet.setColumnWidth(8, 320);
    sheet.setColumnWidth(9, 320);
  }
  return sheet;
}

function clipReviewText(value, maxLen) {
  return String(value == null ? '' : value).slice(0, maxLen);
}

/** 依 Session_ID 覆寫頁籤「作答回顧」。成績主表 A～R 維持不變。 */
function replaceSessionReview(ss, data) {
  const review = data && data.review;
  const items = review && review.items;
  if (!items || !items.length) return;
  const sheet = ensureReviewSheet(ss);
  const sessionId = String(data.sessionId || '');
  const last = sheet.getLastRow();
  if (last >= 2) {
    const ids = sheet.getRange(2, 1, last - 1, 1).getValues();
    for (let i = ids.length - 1; i >= 0; i--) {
      if (String(ids[i][0]) === sessionId) sheet.deleteRow(i + 2);
    }
  }
  const rows = [];
  items.forEach(function (item) {
    if (!item) return;
    rows.push([
      sessionId,
      data.userName || '',
      data.level || '',
      clipReviewText(item.subject, 20),
      item.no || '',
      clipReviewText(item.part, 80),
      clipReviewText(item.stem, 3500),
      clipReviewText(item.correct, 1500),
      clipReviewText(item.chosen, 1500),
      clipReviewText(item.result, 200)
    ]);
  });
  if (!rows.length) return;
  const start = Math.max(sheet.getLastRow() + 1, 2);
  sheet.getRange(start, 1, rows.length, 10).setValues(rows);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const rawBody = e.postData ? e.postData.contents : '{}';
    const data = JSON.parse(rawBody);
    if (data && data.action === 'publishAppVersion') {
      return jsonOut(publishAppVersion(data));
    }
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    const sessionId = String(data.sessionId || ('GEPT-' + new Date().getTime()));
    const values = sheet.getDataRange().getValues();
    let targetRow = -1;

    // 依 A 欄 Session_ID 尋找是否已有「開始測驗」時建立的紀錄列 (Upsert 機制)
    for (let i = 1; i < values.length; i++) {
      if (String(values[i][0]) === sessionId) {
        targetRow = i + 1; // 1-indexed row number
        break;
      }
    }

    if (targetRow === -1) {
      targetRow = sheet.getLastRow() + 1;
    }

    const r = targetRow;
    // A~R 共 18 欄結構（不顯示 Google帳號 欄位）
    // K, L, O, P 欄使用試算表公式自動計算初試總分、初試判定、複試判定與總評結果
    const rowData = [
      sessionId,                                          // A: 測驗序號 (Session_ID)
      data.userName || '未命名考生',                        // B: 考生中文姓名 (User_Name)
      data.level || '初級',                                // C: 測驗級別 (Level)
      data.status || '進行中',                             // D: 測驗狀態 (Status)
      toSheetClockText(data.startTime),                   // E: 開始時間 (僅 HH:mm:ss)
      toSheetClockText(data.endTime),                     // F: 結束或離開時間 (僅 HH:mm:ss)
      Number(data.durationMin || 0),                      // G: 作答時長(分) (Duration_Min)
      String(data.progressPct || '0%'),                   // H: 完成進度(%) (Progress_Pct)
      Number(data.lScore || 0),                           // I: 一階聽力得分 (L_Score_120)
      Number(data.rScore || 0),                           // J: 一階閱讀得分 (R_Score_120)
      `=I${r}+J${r}`,                                   // K: 初試總分 (Stage1_Total)
      `=IF(AND(K${r}>=160,I${r}>=72,J${r}>=72),"通過","未通過")`, // L: 初試判定 (Stage1_Pass)
      Number(data.sScore || 0),                           // M: 二階口說音聽得分 (S_Score_100)
      Number(data.wScore || 0),                           // N: 二階寫作得分 (W_Score_100)
      `=IF(C${r}="初級",IF(AND(M${r}>=80,N${r}>=70),"通過","未通過"),IF(AND(M${r}>=80,N${r}>=80),"通過","未通過"))`, // O: 複試判定 (Stage2_Pass)
      `=IF(D${r}="中途關閉","中途離開(未完試)",IF(OR(D${r}="進行中",D${r}="進行中(背景自動備份)"),"測驗進行中",IF(AND(L${r}="通過",O${r}="通過"),"兩階段合格",IF(L${r}="通過","初試通過/複試待加強","未達通過標準"))))`, // P: 總評結果 (Overall_Result)
      data.lastCheckpoint || '',                          // Q: 最後停留階段與題號 (Last_Checkpoint)
      data.notes || ''                                    // R: 口說錄音與作答摘要 (Audio_&_Notes)
    ];

    sheet.getRange(targetRow, 1, 1, rowData.length).setValues([rowData]);
    try {
      replaceSessionReview(ss, data);
    } catch (reviewErr) {
      // 成績列已寫入。作答回顧失敗時仍回傳成功，避免考生端把整筆成績當成沒送出。
    }
    SpreadsheetApp.flush();

    return ContentService.createTextOutput(JSON.stringify({
      ok: true,
      sessionId: sessionId,
      row: targetRow,
      status: data.status
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      error: String(err)
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

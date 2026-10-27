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
 */

const SPREADSHEET_ID = '1Tc4ga4XEA9LoB-HB2bFhN5j1S-ws1UHT65Ea0y8s7PI';
const SHEET_NAME = '測驗成績紀錄';
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

function doGet(e) {
  try {
    const action = e && e.parameter ? String(e.parameter.action || '') : '';
    if (action === 'appVersion') return jsonOut(getLatestAppVersion());
    return jsonOut({ ok: false, error: '未知的查詢' });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
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

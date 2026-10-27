---
trigger: glob
globs: "src/**/*.html, src/**/*.js, gas/*.gs"
description: "確保於測驗開始、作答進行中、正常交卷及異常關閉視窗時，皆能可靠地自動寫入 Google 試算表「全民英檢成績(自動)」（A~R 共 18 欄，不顯示 Google 帳號欄位）。"
---
# Google 試算表「全民英檢成績(自動)」Beacon 自動同步規範

1. `navigator.sendBeacon(url, blob)` 發送至 Google Apps Script `doPost(e)` 時，`Blob` 的 MIME type 必須設為 `'text/plain;charset=utf-8'`，避免瀏覽器在關閉視窗瞬間因 CORS `OPTIONS` 預檢請求而被取消。
2. 試算表欄位固定為 A～R 共 18 欄，**不顯示「Google帳號」欄位**（A 欄為 `測驗序號(Session_ID)`、B 欄為 `考生中文姓名(User_Name)`、C 欄為 `測驗級別(Level)`）。
3. 後端 `Code.gs` 必須根據 `payload.sessionId` 在 `測驗成績紀錄` 工作表第 A 欄進行搜尋：
   - 若找不到該 `Session_ID`，則新增一列。
   - 若已存在該 `Session_ID`，則直接覆寫更新該列對應之狀態、結束時間、耗時、各科得分與最後停留題號，並保留 K、L、O、P 欄的試算表內建公式。
4. `doPost` 若收到 `action: publishAppVersion`，只更新頁籤 `App版次`，不得寫入「測驗成績紀錄」。平板啟動時以 `doGet` 的 `action=appVersion` 讀取 D 欄為「是」的版次代碼。

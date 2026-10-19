# 2026和泰汽車集團管理論壇網站

可直接部署的繁體中文響應式網站，固定使用淺藍、淺紫 A 版排版，整合活動議程、講者資料、活動報到、會議與晚宴座位圖、台北士林萬麗酒店場地交通、滿意度問卷及會後簡報狀態。

## 本機預覽

```bash
python3 -m http.server 8080
```

開啟 `http://localhost:8080/`。正式測試請使用 HTTP 伺服器，不建議直接以 `file://` 開啟。

## 活動資訊

- 活動名稱：2026和泰汽車集團管理論壇
- 英文名稱：2026 HOTAI GROUP MANAGEMENT FORUM
- 活動時間：2026/10/22（四）上午10:00 至晚上 19:00
- 會議地點：台北士林萬麗酒店 2樓 金萱廳
- 地址：台北市士林區中山北路五段470巷8號
- 午宴場地：1樓 士林廚房自助餐廳
- 晚宴場地：2樓 龍井廳
- 主辦單位：和泰汽車股份有限公司

## 正式附件

- `assets/images/和泰汽車Hotai LOGO.png`：頁首、頁尾及網站識別
- `assets/images/朱建平.jpg`：朱建平講者照片
- `assets/images/蘇書平.jpg`：蘇書平講者照片
- `assets/images/decor/`：car、cloud、flash、flower、star、火箭及氣球裝飾圖示
- `assets/seat-data.js`：最新會議及晚宴座位資料

會議座位圖呈現姓名、公司、投影幕、講台、電腦、入口及柱子。晚宴座位圖呈現七個桌次及每位人員的公司、姓名、部門／單位、完整職稱。兩種座位圖均不顯示個人座位編號。

## 外部服務

- 活動報到：`assets/data.js` → `integrations.checkinFormUrl`
- SurveyCake 問卷：`assets/data.js` → `integrations.surveyCakeUrl`
- 飯店官方資訊：`assets/data.js` → `event.officialVenueUrl`
- Google Maps 導航：`assets/data.js` → `event.navigationUrl`

報到頁同時提供 iframe 及另開視窗備援，以處理登入、瀏覽器或公司網路限制。

## 網站結構

- `index.html`：首頁及聯絡資訊
- `agenda.html`：活動議程
- `speakers.html`：講者照片、講題、經歷與來源
- `checkin.html`：活動報到表單
- `seating.html`：會議座位及晚宴分桌
- `resources.html`：滿意度問卷及五項會後簡報狀態
- `venue.html`：飯店場地、交通及報到引導服務
- `assets/data.js`：活動、議程、聯絡、場地及外部服務設定
- `assets/seat-data.js`：正式座位資料
- `assets/app.js`：頁面內容與互動
- `assets/styles.css`：固定 A 版響應式樣式

## 部署注意事項

可部署至 Azure Static Web Apps、Azure Storage Static Website、GitHub Pages、Cloudflare Pages 或既有 Web Server。上傳專案根目錄即可。

正式環境請確認：

- HTTPS 與正式網域
- Content Security Policy 允許報到表單 iframe
- 公司 Proxy 與登入政策允許報到表單及 SurveyCake
- 隱私權與個資蒐集告知
- 監控、備份及緊急聯絡窗口

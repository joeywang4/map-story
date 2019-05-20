# Map Story

### 簡介
這是一個以地點為主題的社交軟體，可以在地圖上發廢文。

### 連結
- Heroku: https://map-story.herokuapp.com/
- Github: https://github.com/joeywang4/map-story

### 使用說明
- App
1. 先在右上角的Register註冊一個帳號
2. 點選左下角的鉛筆開始發廢文
3. 送出！
- Build
1. Clone下全部的東西
2. 設定.env裡面的資訊（可參考example.env）
3. npm install
4. npm run build
5. npm start

### 其他說明
* 請給予它您位置權限，不然就只能在博理館發廢文了
* 在貼文上點擊可以瞬移到他發文的位置
* 按左下角的房子可以回到現在位置（或是回到博理）
* 註冊時的Icon URL請用正方形圖片，否則比例會跑掉
* 別人發文的時候畫面會自動更新歐！

### 使用的框架
- 前端
    - React, React-router-dom: 這個應該不用介紹
    - Leaflet, React-Leaflet: 地圖框架與跟React相容的地圖框架
- 後端
    - Express: 這個應該不用介紹
    - Bcrypt: 拿來做密碼的hashing
    - Mongoose: 連接MongoDB資料庫
    - Socket.io: 串連前端與後端

### 貢獻
- 前端
地圖的畫面是使用別人的框架，但右側的貼文列表與其對應地圖的操作都是自行完成。其他網頁的組成也都是自行設計，包括上方的導覽列與登入介面等。
- 後端
Routing的規則，資料庫的連接，還有登入驗證都是自行撰寫。

### 心得
* CSS真的很難搞，弄前端弄得心很累
* 前後端在兜起來的時候有點麻煩，因為覺得開兩個port前後端溝通會變得很複雜，所以每次都是build完只開後端一個port，不知道有沒有比較方便的作法
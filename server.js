// server.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

let downloadCount = 0; // 仮のダウンロード数

// JSON形式のデータを解析するためのミドルウェアを追加
app.use(bodyParser.json());

// ダウンロード数を取得するエンドポイント
app.get('/api/downloads', (req, res) => {
    res.json({ downloads: downloadCount });
});

// ダウンロード数をインクリメントするエンドポイント
app.post('/api/downloads', (req, res) => {
    if (req.body.increment) {
        downloadCount++; // ダウンロード数をインクリメント
    }
    res.json({ downloads: downloadCount });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

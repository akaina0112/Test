// JavaScript code in script.js file
const express = require('express');
const app = express();

let downloadCount = 0;

app.get('/download', (req, res) => {
    // Increment download count
    downloadCount++;
    res.download('path_to_file'); // ファイルの実際のパスを指定する必要があります
});

app.get('/downloads', (req, res) => {
    res.json({ downloads: downloadCount });
});

app.listen(3000, () => console.log('Server is running on port 3000'));


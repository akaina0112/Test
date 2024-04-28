const owner = 'akaina0112'; // GitHubリポジトリの所有者名
const repo = 'Test'; // GitHubリポジトリの名前

const fileName1 = '20230704_185437.jpg'; // ファイル1の名前
const fileName2 = 'example.zip'; // ファイル2の名前
const fileName3 = 'sample.txt'; // ファイル3の名前
const fileName4 = 'document.pdf'; // ファイル4の名前
const fileName5 = 'data.csv'; // ファイル5の名前

const set= ' DL'; //名前


//プログラム保存

function fetchReleaseInfo() {
    fetchFileData(fileName1)
        .then(file1Data => {
            fetchFileData(fileName2)
                .then(file2Data => {
                    fetchFileData(fileName3)
                        .then(file3Data => {
                            fetchFileData(fileName4)
                                .then(file4Data => {
                                    fetchFileData(fileName5)
                                        .then(file5Data => {
                                            displayReleaseInfo(file1Data, file2Data, file3Data, file4Data, file5Data);
                                        })
                                        .catch(error => {
                                            console.error('Error fetching file5 info:', error);
                                        });
                                })
                                .catch(error => {
                                    console.error('Error fetching file4 info:', error);
                                });
                        })
                        .catch(error => {
                            console.error('Error fetching file3 info:', error);
                        });
                })
                .catch(error => {
                    console.error('Error fetching file2 info:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching file1 info:', error);
        });
}

function fetchFileData(fileName) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.github.com/repos/${owner}/${repo}/releases`)
            .then(response => response.json())
            .then(data => {
                let downloadCount = 0;
                let downloadUrl = '';
                data.forEach(release => {
                    release.assets.forEach(asset => {
                        if (asset.name === fileName) {
                            downloadCount += asset.download_count;
                            downloadUrl = asset.browser_download_url;
                        }
                    });
                });
                const fileData = {
                    downloadCount: downloadCount,
                    downloadUrl: downloadUrl
                };
                resolve(fileData);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function displayReleaseInfo(file1Data, file2Data, file3Data, file4Data, file5Data) {
    const releaseInfoHTML1 = `
        <div class="release-info">
            <div class="download-info">
                <button class="download-button" onclick="downloadAsset('${file1Data.downloadUrl}')">Download</button>
                <p>: ${file1Data.downloadCount}${set}</p>
            </div>
        </div>`;
    document.getElementById('release-info1').innerHTML = releaseInfoHTML1;

    const releaseInfoHTML2 = `
        <div class="release-info">
            <div class="download-info">
                <button class="download-button" onclick="downloadAsset('${file2Data.downloadUrl}')">Download</button>
                <p>: ${file2Data.downloadCount}${set}</p>
            </div>
        </div>`;
    document.getElementById('release-info2').innerHTML = releaseInfoHTML2;

    const releaseInfoHTML3 = `
        <div class="release-info">
            <div class="download-info">
                <button class="download-button" onclick="downloadAsset('${file3Data.downloadUrl}')">Download</button>
                <p>: ${file3Data.downloadCount}${set}</p>
            </div>
        </div>`;
    document.getElementById('release-info3').innerHTML = releaseInfoHTML3;

    const releaseInfoHTML4 = `
        <div class="release-info">
            <div class="download-info">
                <button class="download-button" onclick="downloadAsset('${file4Data.downloadUrl}')">Download</button>
                <p>: ${file4Data.downloadCount}${set}</p>
            </div>
        </div>`;
    document.getElementById('release-info4').innerHTML = releaseInfoHTML4;

    const releaseInfoHTML5 = `
        <div class="release-info">
            <div class="download-info">
                <button class="download-button" onclick="downloadAsset('${file5Data.downloadUrl}')">Download</button>
                <p>: ${file5Data.downloadCount}${set}</p>
            </div>
        </div>`;
    document.getElementById('release-info5').innerHTML = releaseInfoHTML5;
}

function downloadAsset(url) {
    window.open(url, '_blank');
}

// 初期読み込み時にリリース情報を取得
fetchReleaseInfo();

// 30秒ごとにリリース情報を更新
setInterval(fetchReleaseInfo, 3000); // 30秒ごとに更新

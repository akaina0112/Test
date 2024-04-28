const owner = 'akaina0112'; // GitHubリポジトリの所有者名
const repo = 'Test'; // GitHubリポジトリの名前


function fetchReleaseInfo() {
    const fileName1 = '20230704_185437.jpg'; // ファイル1の名前
    const fileName2 = 'example.zip'; // ファイル2の名前

    // ファイル1の情報を取得
    fetchFileData(fileName1)
        .then(file1Data => {
            // ファイル2の情報を取得
            fetchFileData(fileName2)
                .then(file2Data => {
                    // リリース情報を表示
                    displayReleaseInfo(file1Data, file2Data);
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

function displayReleaseInfo(file1Data, file2Data) {
    const releaseInfoHTML1 = `
        <div class="release-info">
            <div class="download-info">
                <p>ダウンロード数: ${file1Data.downloadCount}</p>
                <button class="download-button" onclick="downloadAsset('${file1Data.downloadUrl}')">Download</button>
            </div>
        </div>`;
    document.getElementById('release-info1').innerHTML = releaseInfoHTML1;

    const releaseInfoHTML2 = `
        <div class="release-info">
            <div class="download-info">
                <p>ダウンロード数: ${file2Data.downloadCount}</p>
                <button class="download-button" onclick="downloadAsset('${file2Data.downloadUrl}')">Download</button>
            </div>
        </div>`;
    document.getElementById('release-info2').innerHTML = releaseInfoHTML2;
}

function downloadAsset(url) {
    window.open(url, '_blank');
}

// 初期読み込み時にリリース情報を取得
fetchReleaseInfo();

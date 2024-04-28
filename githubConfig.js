import { owner, repo, fileNames, set } from './config.js';

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
                    fileName: fileName,
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

function fetchReleaseInfo() {
    return Promise.all(fileNames.map(fileName => fetchFileData(fileName)))
        .then(fileDataArray => {
            return fileDataArray;
        })
        .catch(error => {
            console.error('Error fetching file info:', error);
        });
}

function downloadAsset(url) {
    window.open(url, '_blank');
}

export { fetchReleaseInfo, downloadAsset };

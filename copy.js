      window.onload = function() {
            // CSSを動的に生成する
            const style = document.createElement('style');
            style.textContent = `
                #notification {
                    display: none;
                    position: fixed;
                    top: -100px;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: #444444;
                    color: white;
                    padding: 20px 30px;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: bold;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    text-align: center;
                    z-index: 9999;
                    transition: top 0.3s ease;
                }

                #notification span {
                    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
                }

                #notification button {
                    color: #e6e6fa;
                    margin-top: 10px;
                    padding: 10px 20px;
                    background-color: transparent;
                    background-image: url('./cat.gif');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                    animation: catWalk 5s linear infinite;
                }

                #notification button:hover {
                    opacity: 0.8;
                }

                @keyframes catWalk {
                    0% { background-position: left top; }
                    100% { background-position: right top; }
                }
            `;
            document.head.appendChild(style);

            // HTMLを動的に生成する
            const notification = document.createElement('div');
            notification.id = 'notification';
            notification.innerHTML = `
                <span id="notification-message"></span><br>
                <span id="notification-message2"></span><br>
                <button id="notification-close">OK</button>
            `;
            document.body.appendChild(notification);

            // JavaScriptを動的に生成する
            // キーボードショートカットの無効化
            document.addEventListener('keydown', function(event) {
                if (event.ctrlKey && (event.key === 'u' || event.key === 's' || event.key === 'p')) {
                    event.preventDefault();
                    showNotification('このショートカットは無効化されています。');
                }
            });

            // 右クリックの無効化
            document.addEventListener('contextmenu', function(event) {
                event.preventDefault();
                showRightClickNotification('右クリックは無効化されています。');
            });

            // 通知を表示する関数（ショートカット無効化用）
            function showNotification(message) {
                const notification = document.getElementById('notification');
                const notificationMessage = notification.querySelector('#notification-message');
                const notificationMessage2 = notification.querySelector('#notification-message2');
                notificationMessage.textContent = message;
                notificationMessage2.textContent = 'このショートカットは無効化されています。';
                notification.style.display = 'block';
                notification.style.top = '20px';
            }

            // 通知を表示する関数（右クリック無効化用）
            function showRightClickNotification(message) {
                const notification = document.getElementById('notification');
                const notificationMessage = notification.querySelector('#notification-message');
                const notificationMessage2 = notification.querySelector('#notification-message2');
                notificationMessage.textContent = message;
                notificationMessage2.textContent = '右クリックは無効化されています。';
                notification.style.display = 'block';
                notification.style.top = '20px';
            }

            // OKボタンをクリックしたときの処理
            document.getElementById('notification-close').addEventListener('click', function() {
                const notification = document.getElementById('notification');
                notification.style.top = '-100px';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 510);
            });
        };

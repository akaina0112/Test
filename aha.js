      window.onload = function() {
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

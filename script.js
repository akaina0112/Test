// JavaScript code in script.js file

// ローカルストレージから共有クリック数を読み込む
let sharedClickCount = localStorage.getItem("sharedClickCount") || 0;

// 共有クリック数を表示する関数
function displaySharedClickCount() {
  // 共有クリック数を表示する要素を取得
  const sharedClickCountElement = document.getElementById("sharedClickCount");
  // 共有クリック数を表示
  sharedClickCountElement.textContent = sharedClickCount;
}

// クリックされたら、共有クリック数を増やして表示する関数
function incrementSharedClickCount() {
  // 共有クリック数を1増やす
  sharedClickCount++;
  // ローカルストレージに新しい共有クリック数を保存
  localStorage.setItem("sharedClickCount", sharedClickCount);
  // 共有クリック数を表示する関数を呼び出す
  displaySharedClickCount();
}

// クリックされたボタン要素を取得
const clickButton = document.getElementById("clickButton");

// ボタンがクリックされたら、共有クリック数を増やす関数を呼び出す
clickButton.addEventListener("click", incrementSharedClickCount);

// ページ読み込み時に共有クリック数を表示する
displaySharedClickCount();

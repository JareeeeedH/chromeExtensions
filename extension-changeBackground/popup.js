// 按鈕DOM撈取
let btnNight = document.getElementById("color-night");
let btnBack = document.getElementById("color-back");

// 偵聽click事件
  btnNight.addEventListener("click", async () => {

    // tab取得user當前頁面
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // 使用scripting permission將function注入當前頁面(contnet)
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor
    });
  });

  btnBack.addEventListener("click", async () => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setBack
    });
  });


// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {

  // document.body.style.backgroundColor = '#46484a';
  document.body.style.backgroundColor = 'rgb(70, 70, 70)';
  document.body.style.background = 'rgb(70, 70, 70)';
  document.body.style.Color = 'white';

//取所有div變深色
  // let div = document.body.querySelectorAll('div');
  // for(let i=0; i<div.length; i++){
  //   div[i].style.backgroundColor = '#46484a';
  //   div[i].style.color = 'white';
  // }

}


function setBack() {
  document.body.style.backgroundColor = '';
  document.body.style.Color = '';
}
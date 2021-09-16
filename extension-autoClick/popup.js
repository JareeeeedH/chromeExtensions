// button, input DOM撈取
let time = document.querySelector('#time');
let btn = document.querySelector('#auto-click');


// 偵聽點擊，將時間傳遞給當前頁面；
btn.addEventListener('click', function(){

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {  

    chrome.tabs.sendMessage(tabs[0].id, { time: time.value }, function() {  
        console.log('sent to content');  
    });  

  });

})
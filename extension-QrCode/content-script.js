
let message =  {name:'jared', greeting:'hey Wazzup'}

console.log('js Contnet')


// message送出給background
// callback第一個參數是 background接收到返回的消息 如果有的話．
// chrome.runtime.sendMessage(message, function(response) {  
//   console.log(response);  
// });


// 當前頁面偵聽background發過來的訊息

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // message的資料格式取決於傳送時的資料
  // const { start } = message;

  // if (start) {
  //   const images = document.getElementsByTagName('img');
  //   const imgSrcList = Array.from(images).map((img) => img.src);
  //   sendResponse(imgSrcList);
  // }

  // console.log('content 收到',message,sender,sendResponse)


// });


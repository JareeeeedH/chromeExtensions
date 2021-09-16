
let timer;

let intervalTime =0;
let x = 0;
let y = 0;

// 接收extension發來的訊息，並執行callbacl
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
  // 先清除timer
  clearInterval(timer);
  alert('連點開始');
  createStop();
  intervalTime = message.time;

  // 偵聽滑鼠移動，持續獲得滑鼠位置。
  document.addEventListener('mousemove', function(evt){
     x = evt.clientX;
     y = evt.clientY;
    })

  // 啟動時鐘,獲取Dom,執行點擊。
   timer= setInterval(()=>{

    let element = document.elementFromPoint(x, y);
    console.log(x, y, element);
    element.click();

   }, intervalTime)

});



// 頁面新增停止按鈕
function createStop(){
  let body = document.querySelector('body');

  let stopButton = document.createElement('BUTTON');
      stopButton.innerHTML = '停止';
      stopButton.style.borderRadius='5px';
      stopButton.style.border= '2px solid black';
      stopButton.style.padding= '2px';
      stopButton.style.color= 'red';
      stopButton.style.position= 'fixed';
      stopButton.style['top']='5vh';
      stopButton.style['left']='1vw';
      stopButton.style.display='fixed';
      stopButton.style.zIndex= '99999';
      stopButton.style.cursor='pointer';

    stopButton.addEventListener('click',function(e){

      clearInterval(timer);
      e.stopPropagation();
      alert('STOP')
      console.log('STOP!!')

    })

  body.appendChild(stopButton);
};


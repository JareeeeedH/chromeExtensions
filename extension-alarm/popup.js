let submitBtn = document.getElementById("submit");
let alarmTime = document.getElementById('mins');
let title = document.getElementById('title');

// 如果沒資料，寫進去的假資料。
let myalarms = [
  {title: '打電話給小虎', eventTime: Date.now() + 60000},
  {title: '訂便當', eventTime: Date.now() + 90000},
  {title: '視訊會議', eventTime: Date.now() + 120000},
];

let data = [];
let myUl = document.querySelector('.wrapper');
let getStorageDataToWrite = function(){

    chrome.storage.sync.get(function(result){

    // 取資料或拿假資料
    data = result['alarm'] ||myalarms;

    for(let i=0; i<data.length; i++){
      let itemElem = document.createElement('LI');
      itemElem.classList.add('item');

      let titleSpan = document.createElement('SPAN');
      titleSpan.classList.add('title');
      titleSpan.innerHTML = data[i].title;

      // timeStampe處理
      let timeSpan = document.createElement('SPAN');
      timeSpan.classList.add('timer');
      let newDate = new Date(data[i].eventTime);
      let timeMon = newDate.getMonth();
      let timeDate = newDate.getDate();
      let timeHour = newDate.getHours();
      let timeMins = newDate.getMinutes();
      let show = `${timeMon}/${timeDate} - ${timeHour}:${timeMins}`;

      timeSpan.innerHTML = show;
      

      itemElem.appendChild(titleSpan);
      itemElem.appendChild(timeSpan);

      myUl.appendChild(itemElem)

    }
  }); 
};

getStorageDataToWrite();

// 新增，存入storage，加入Dom
submitBtn.addEventListener('click',function(){

  let newTitle = title.value;
  let settingTime = Date.now() + alarmTime.value * 60000;
  let newItem = {title: newTitle, eventTime: settingTime};
  data.push(newItem);

  // 新增資料儲存並寫入html
  chrome.storage.sync.set({alarm: data}, function() {

      let itemElem = document.createElement('LI');
      itemElem.classList.add('item');

      let titleSpan = document.createElement('SPAN');
      titleSpan.classList.add('title');
      titleSpan.innerHTML = newTitle;

      // timeStampe處理
      let timeSpan = document.createElement('SPAN');
      timeSpan.classList.add('timer');
      let newDate = new Date(settingTime);
      let timeMon = newDate.getMonth();
      let timeDate = newDate.getDate();
      let timeHour = newDate.getHours();
      let timeMins = newDate.getMinutes();
      let show = `${timeMon}/${timeDate}, ${timeHour}:${timeMins}`;

      timeSpan.innerHTML = show;
      

      itemElem.appendChild(titleSpan);
      itemElem.appendChild(timeSpan);

      myUl.appendChild(itemElem)
  });

  // 溝通background新增alarm;
  chrome.runtime.sendMessage( newItem, function(response) { 
      //background收到後的回覆 
      console.log(response, 'response from background');  
    });

})


// 發送給background
// 獲得background接收到後的response;
// btn.addEventListener('click', function(){

//   console.log('click, 送訊息給background');

//   chrome.runtime.sendMessage('message from popup.js', function(response) { 
//       //background收到後的回覆 
//       console.log(response);  
//     });


// })



















// 
// Check and debug to use
let notis = document.getElementById("notis");
let alarms = document.getElementById("alarms");
notis.addEventListener('click',checkNotifications);
alarms.addEventListener('click',checkAlarms);

// 查看註冊過的通知
function checkNotifications(){
  chrome.notifications.getAll(item=>{
    console.log('所有通知',item);
  })
}
// 查看alarms
function checkAlarms(){
  chrome.alarms.getAll().then((item)=>{
    console.log('所有Alarm',item)
  })
}

// 彈出測試按鈕
let ringBtn = document.getElementById("ring");
ringBtn.addEventListener('click',ringTest);
function ringTest(){
  chrome.notifications.create('ring起來', {
    type: 'basic',
    iconUrl: 'timg.jpg',
    title: 'ring起來',
    message: 'ring起來',
    priority: 2
  });

  // 清除系統通知，才可以重複彈出。
   chrome.notifications.clear('ring起來', function(item){
    console.log('Clear', item)
  });
            
}
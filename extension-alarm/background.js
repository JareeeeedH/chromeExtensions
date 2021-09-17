
// 安裝擴充功能就開通一個連續的alarm
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('check', { periodInMinutes: 30});
})

// 偵聽觸發alarm事件
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log(alarm,'alarm發生');

  // check天氣通知事件;
  if(alarm.name == 'check'){
    let key = '1dfea560d8fed397118e5ca364205374';
    let cityName = 'Taichung'
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`;

    fetch(url).then(function(response) {

      let mydata = response.json();
      mydata.then((item)=>{

            let location = item.name;
            let desc = item.weather[0].description;
            let humidity = item.main.humidity;
            let temp =(item.main.temp)-273.15;
            let C = temp.toFixed(2);
            let weatherMeg = `溫度${C} | 濕度:${humidity}`

            // 發送通知與清除
            chrome.notifications.create('weatherRing', {
              type: 'basic',
              iconUrl: 'timg.jpg',
              title: `台中天氣${desc}`,
              message: weatherMeg,
              priority: 2
            });
            
            // 清除系統通知，才可以連續彈出。
            chrome.notifications.clear('weatherRing', function(item){
              console.log('Clear', item)
            });
            
      })

    })
  }
  else{
    // 天氣以外其他的alarm觸發，發通知與清除。
    chrome.notifications.create(alarm.name, {
      type: 'basic',
      iconUrl: '16.png',
      title: alarm.name,
      message: alarm.name,
      priority: 2
    });
    
    chrome.notifications.clear(alarm.name, function(item){
      console.log('ClearNotification', alarm.name, item)
    });

  }


});

// 如果沒資料，寫進去的假資料。
let myAlarms = [
  {title: '打電話給小虎', eventTime: Date.now() + 60000},
  {title: '訂便當', eventTime: Date.now() + 90000},
  {title: '視訊會議', eventTime: Date.now() + 120000},
];

// chrome.storage.sync.set({alarm: myalarms}, function() {
//   console.log('set OK')
// });


//拿資料，迴圈寫鬧鐘
function createAllAlarms(){
    chrome.storage.sync.get(function(result){


    data = result['alarm'] || myAlarms;
    console.log(result)
    console.log(data)
    
    for(let i=0; i<data.length; i++){

      // alarm名稱與時間
      let notificationTitle = data[i].title;
      let settingTime = data[i].eventTime;

      // 開通alarm
      chrome.alarms.create(notificationTitle, { 
        when: settingTime});
    }
    
  });
};

createAllAlarms();

// 接受訊息
chrome.runtime.onMessage.addListener(  
  function(request, sender, sendResponse) {

    console.log('Background收到訊息')
    console.log('request',request);
    console.log('sender',sender);
    console.log('sendResponse',sendResponse);
    console.log('------------------')

    // console.log(sender.tab ? "取得到tab，這是來自內容腳本的訊息：" + sender.tab.url:"沒有tab，這是來自擴充功能內部的訊息");  

    sendResponse('I got you!');

     //收到request，新增鬧鐘。
     let notificationTitle = request.title;
     let settingTime = request.eventTime;

     chrome.alarms.create(notificationTitle, { 
      when: settingTime
      });

  });




















// 查看歷史通知紀錄或者清楚記錄。
  // chrome.notifications.getAll(item=>{

  //   console.log('所有通知',item);
    
  //   console.log('清起來')
  //   for(key in item){
  //     chrome.notifications.clear(key, function(item){console.log(item,'clear')});
  //   }

  // })
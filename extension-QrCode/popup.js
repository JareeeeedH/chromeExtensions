let unLock = document.getElementById("open");
let body = document.getElementsByTagName('body')[0];
let url = "https://chart.apis.google.com/chart?cht=qr&choe=UTF-8&chs=150x150&chl="

unLock.addEventListener("click", async () => {

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(tab);

  let qrCode = document.createElement("IMG");
  qrCode.src = `${url}${tab.url}`;
  qrCode.style.marginTop='5px';


  body.appendChild(qrCode);

  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   function: helloWorld,
  // });

});

function helloWorld() {
  console.log('hehe')
}

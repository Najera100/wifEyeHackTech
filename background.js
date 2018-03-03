console.log('Background JS Started');

chrome.cookies_helper = new Array(); // the environment does not pass to extension env
chrome.cookies.onChanged.addListener(function(info) {
   console.log("onChanged" + JSON.stringify(info));
   //TODO pass info use chrome.sendmessage

 });

//!NotePopup cannot coexist with onClicked function for browserAction

chrome.browserAction.onClicked.addListener(function (tab) {
   console.log("browser_icon is clicked", tab, tab[tab.id]);
   var tab_url = chrome.extension.getURL("popup.html");
   console.log(tab_url);
   focusOrCreateTab(tab_url);
});


chrome.runtime.onMessage.addListener(function (a,b,c){
   debugger;
});

function focusOrCreateTab(url) {
   chrome.windows.getAll({ "populate": true }, function (windows) {
      var existing_tab = null;
      for (var i in windows) {
         var tabs = windows[i].tabs;
         for (var j in tabs) {
            var tab = tabs[j];
            if (tab.url == url) {
               existing_tab = tab;
               break;
            }
         }
      }
      if (existing_tab) {
         chrome.tabs.update(existing_tab.id, { "selected": true });
      } else {
         chrome.tabs.create({ "url": url, "selected": true });
      }
   });
}


function getJson(url) {
   var xhr = new XMLHttpRequest(); // a new request
   xhr.open("GET", url, true);
   xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
         db.push({ url: url, data: JSON.parse(xhr.responseText) });
      }
   }
   xhr.send(null);
}

getJson("databases/bugs.json");
getJson("databases/click2play.json");
getJson("databases/compatibility.json");
getJson("databases/surrogates.json");
getJson("databases/tags.json");

myid = [];
// https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage

['_ga', '_gid', '_utmb'].forEach(name => {
   chrome.cookies.getAll({ name: name }, (info) => {
      myid.push(info);
      info.forEach(it => {
         chrome.runtime.sendMessage(null,JSON.stringify(it),null);
      });
   });
});

chrome.cookies.getAll({ url: "https://google.com" }, (info) => { console.log(info) })

chrome.cookies.onChanged.addListener(function (info) {
   console.log(info);
   //TODO pass info use chrome.sendmessage
});

chrome.cookies.getAllCookieStores((cks_arr) => {
   for (i in cks_arr) {
      console.log(cks_arr[i]);
   }
});

chrome.windows.getAll({ "populate": true }, function (windows) {
   var existing_tab = null;
   for (var i in windows) {
      var tabs = windows[i].tabs;
      for (var j in tabs) {
         var tab = tabs[j];
         //   debugger;
      }
   }
});

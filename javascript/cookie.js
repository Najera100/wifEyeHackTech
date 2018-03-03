var doc = document.getElementById('p');

db = [];

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
         console.log(it.name, it.value, it.domain);
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

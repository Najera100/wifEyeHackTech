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

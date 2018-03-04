var globals = {};

chrome.tabs.getSelected(null, function (tab) {
	console.log('log');
	console.log(tab);

	globals.current_tab = tab;
	setTackerTitle();

	chrome.runtime.onMessage.addListener(
		function (request, sender, sendResponse) {
			console.log(request);
			request.split(' ').map(function (kv) {
				d3.select('#content').append('p')
					.text(kv);
			});
			setTimeout(()=>{
				chrome.cookies.getAll({ url: `http://${globals.hostname}` }, (info) => {
					info.forEach(d => d3.select('#content').append('p').text(d));
				});
			},2000);
		}
	);

	chrome.tabs.executeScript(tab.id, {
		code: `
	    chrome.runtime.sendMessage(document.cookie, function(response) {
				  console.log(response);
				});`
	});
});


function setTackerTitle() {
	//get hostname
	var t = document.createElement('a')
	t.href = globals.current_tab.url;
	globals.hostname = t.hostname;

	var p = document.getElementById('trackers').firstElementChild;
	p.innerHTML = `${p.innerHTML}<b>${globals.hostname}<b>?`;
}


function getCookie(key) {
	var re = new RegExp(key + "=([^;]+)");
	var val = re.exec(document.cookie);
	return (val != null) ? unescape(val[1]) : null;
}

function setCookie(key, value) {
	document.cookie = `${key}=${value}`;
}

function returnCount() {
	var count = getCookie('clickcount');
	if (count == null) {
		setCookie('clickcount', 1);
	} else {
		setCookie('clickcount', count*1 + 1);
	}
	return count;
}

var count_para = document.getElementById('usage_count');
count_para.firstElementChild.innerHTML = `You used Wif-eye <b>${returnCount()}<b> times;`;

// BUTTON
var button = document.getElementById('tabmode');
button.onclick = newtab;
console.log('tab-code is running!');

function newtab() {
	var tab_url = chrome.extension.getURL("cookie.html");
	console.log(tab_url);
	focusOrCreateTab(tab_url);
}

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
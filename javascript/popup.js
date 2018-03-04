function binarySplit(s, sep) {
	var i = s.indexOf(sep);
	return [s.substring(0, i), s.substring(i+1)];
}

function getCookieKeyValuePair(request) {
	return request.split('; ').map(function(d) {
		return binarySplit(d, '=');
	});
}


chrome.tabs.getSelected(null, function(tab) {
      console.log('log');
      console.log(tab);
			     	
      chrome.runtime.onMessage.addListener(
			  function(request, sender, sendResponse) {
			  	console.log(request);
			  	var kvs = getCookieKeyValuePair(request);
			  	
			  	console.log(kvs);
			  	kvs.forEach(kv => {
						var key = kv[0];
						var value = kv[1];
						
				  	chrome.cookies.getAll({ 
				  		name: key
				  	}, function(cookiesThatMatchKey) {
							for (i in cookiesThatMatchKey) {
								var cookie = cookiesThatMatchKey[i];
								if(cookie.value == value) {
									console.log(cookie);
								}
							}
				  	});
				  });
			  
			  	request.split(' ').map(function(kv) {
				  	d3.select('#content').append('p')
				  		.text(kv);
			  	});
			  }
			);

      chrome.tabs.executeScript(tab.id, {code: `
	      chrome.runtime.sendMessage(document.cookie, function(response) {
				  console.log(response);
				});
      `});

});

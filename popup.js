chrome.tabs.getSelected(null, function(tab) {
      console.log('log');
      console.log(tab);
      
      chrome.runtime.onMessage.addListener(
			  function(request, sender, sendResponse) {
			  	console.log(request);
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

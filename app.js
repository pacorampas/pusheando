window.addEventListener("load", function() {
	newEndPoint();

	window.navigator.mozSetMessageHandler('push', function(e) {
		var messages = document.getElementById('messages');
		var date = new Date();
		var p = document.createElement('p');
		p.textContent = 'Time: '+date.getHours()+':'+date.getMinutes()+' version: '+e.version;
		messages.appendChild(p);
	});
	
});

function newEndPoint(){
	if(localStorage.endPoint){
		return;
	}

	var req = navigator.push.register();
  
	req.onsuccess = function(e) {
		var endpoint = req.result;
		localStorage.endPoint = endpoint;
		console.log("New endpoint: " + endpoint );
	}

	req.onerror = function(e) {
		console.error("Error getting a new endpoint: " + JSON.stringify(e));	
	}
}

/*
curl -X PUT -d "version=6"   https://as.push.tefdigital.com/v1/notify/931aec0f0e699e943c342eebc0ad7284f8f62639b9a1a0116dea0b967d455fc5
*/
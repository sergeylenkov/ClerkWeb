export class ApiRequest {
	constructor(url) {
		this.url = url;
		console.log('ApiRequest ' + url);
	}

	get(action, callback) {
		if (this.makeRequest(callback)) {
			let url = this.url + '?action=' + action;
			console.log('get ' + url);
			this.request.open('get', url, true);
			this.request.send();
		}
	}

	post(action, data, callback) {
		if (this.makeRequest(callback)) {
			let url = this.url + '?action=' + action;
			console.log('post ' + url);
			this.request.open('post', url, true);
			this.request.setRequestHeader('content-type', 'application/json;charset=UTF-8');
			this.request.send(JSON.stringify(data));
		}
	}

	makeRequest(callback) {
		let self = this;
	    this.request = new XMLHttpRequest();

	    if (!this.request) {
	    	console.log('create requets error');
			return false;
	    }

		this.request.responseType = 'json';
	    this.request.onreadystatechange = function() {
			console.log('requestStateChange ' + self.request.readyState + ' ' + self.request.status);
			if (self.request.readyState === XMLHttpRequest.DONE) {
				if (self.request.status === 200) {
					if (callback) {
						callback(self.request.response);
					}
			    } else {
					console.log('request error');
					if (callback) {
						callback(null);
					}
			    }
			}
		}

	    return true;
	}
}

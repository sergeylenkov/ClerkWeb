export class ApiRequest {
	constructor(url) {
		this.url = url;
	}

	get(action, data, callback) {
		if (this.makeRequest(callback)) {
			let url = this.url + '?action=' + action;

			if (data) {
				url = url + '&' + this.formatParams(data);
			}
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
	    	console.log('create request error');
			return false;
	    }

		this.request.responseType = 'json';
	    this.request.onreadystatechange = function() {
			if (self.request.readyState === XMLHttpRequest.DONE) {
				if (self.request.status === 200) {
					console.log('request ' + self.request.responseURL + ' completed');
					if (callback) {
						if (self.request.response) {
							callback(self.request.response);
						} else {
							callback(null);
						}
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

	formatParams(params) {
  		return Object.keys(params)
        	         .map(function(key) {
          				return key + '=' + params[key]
        			  }).join('&');
	}
}

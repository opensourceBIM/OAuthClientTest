var QueryString = function () {
	  // This function is anonymous, is executed immediately and 
	  // the return value is assigned to QueryString!
	  var query_string = {};
	  var query = window.location.search.substring(1);
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	        // If first entry with this name
	    if (typeof query_string[pair[0]] === "undefined") {
	      query_string[pair[0]] = decodeURIComponent(pair[1]);
	        // If second entry with this name
	    } else if (typeof query_string[pair[0]] === "string") {
	      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
	      query_string[pair[0]] = arr;
	        // If third or later entry with this name
	    } else {
	      query_string[pair[0]].push(decodeURIComponent(pair[1]));
	    }
	  } 
	  return query_string;
	}();
	

	// Got this from https://blog.centerkey.com/2013/05/javascript-colorized-pretty-print-json.html
	var jsonPrettyPrint = {
		replacer : function(match, pIndent, pKey, pVal, pEnd) {
			var key = '<span class=json-key>';
			var val = '<span class=json-value>';
			var str = '<span class=json-string>';
			var r = pIndent || '';
			if (pKey)
				r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
			if (pVal)
				r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
			return r + (pEnd || '');
		},
		toHtml : function(obj) {
			var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
			return JSON.stringify(obj, null, 3).replace(/&/g, '&amp;')
					.replace(/\\"/g, '&quot;').replace(/</g, '&lt;')
					.replace(/>/g, '&gt;').replace(jsonLine,
							jsonPrettyPrint.replacer);
		}
	};
	
function post(url, data, callback, errorCallback) {
	var settings = {
		contentType: "application/json",
		type: "POST",
		data: JSON.stringify(data)
	};
	$.ajax(url, settings).done(function(data) {
		callback(data);
	  })
	  .fail(function() {
	    console.error("login");
	  });
}

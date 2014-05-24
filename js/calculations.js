function calcStatsByProperty(data) {
	var result = {};
	for (key in data) {
		obj = data[key];
		console.group("liczymmy", obj);

		var val;

		for (key in obj) {
			console.group("obj[%s] == ", key, obj[key]);
			//console.log(obj[key],isNaN(obj[key]));
			val = isNaN(obj[key]) ? obj[key] : parseFloat(obj[key]);
			if (( typeof val === "number") && !isNaN(val)) {
				//console.log("number",val);
				console.log("before\n-----------\t\t");
				console.log(result);
				( typeof result[key] === "undefined") ? result[key] = val : result[key] += val;
				console.log(result);
				console.log("after\n-----------\t\t");
			} else {
				val = obj[key];
				//console.log("number not",val);
				if ( typeof result[key] === "undefined")
					result[key] = {};
				( typeof result[key][val] === "undefined") ? result[key][val] = 1 : result[key][val] += 1;
			}
			console.groupEnd();
		}
		console.groupEnd();

	};
	return result;
}

function getDailyStats(data){
	for(var i=0,j=data.length; i<j; i++){
	  console.log(data[i].day,calcStatsByProperty(data[i].issues));
	};
}

if ( typeof mstats === "undefined") {
	mstats = {};
}
if (!mstats.utils) {
	mstats.utils = {};
}
mstats.calc = {
	calcStatsByProperty : function(data) {
		var result = {};
		for (key in data) {
			obj = data[key];
			//		console.group("liczymmy", obj);

			var val;

			for (key in obj) {
				//			console.group("obj[%s] == ", key, obj[key]);
				//console.log(obj[key],isNaN(obj[key]));
				val = isNaN(obj[key]) ? obj[key] : parseFloat(obj[key]);
				if (( typeof val === "number") && !isNaN(val)) {
					//console.log("number",val);
					//				console.log("before\n-----------\t\t");
					//				console.log(result);
					( typeof result[key] === "undefined") ? result[key] = val : result[key] += val;
					//				console.log(result);
					///				console.log("after\n-----------\t\t");
				}
				else {
					val = obj[key];
					//console.log("number not",val);
					if ( typeof result[key] === "undefined")
						result[key] = {};
					( typeof result[key][val] === "undefined") ? result[key][val] = 1 : result[key][val] += 1;
				}
				//			console.groupEnd();
			}
			//		console.groupEnd();

		};

		return result;
	},
	getDailyStats : function(data) {
		var day = {};
		days = []
		console.time("kupa");
		for (key in data) {
			day = {
				day : key,
				data : data[key]
			}

			console.log(day.day, mstats.calc.calcStatsByProperty(day.data));
			days.push({day:day.day,data:mstats.calc.calcStatsByProperty(day.data)});
		}
		console.timeEnd("kupa");

	}
}
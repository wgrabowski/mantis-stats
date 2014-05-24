if (typeof mstats === "undefined") {
	mstats = {};
}
if (!mstats.utils) {
	mstats.utils = {};
}
mstats.utils.data = {
	formatData : function(rawObj) {
		var keys = [], newObj = {};
		for (key in rawObj) {
			keys.push(key);
		}
		keys.sort();

		
		for (var i = 0, j = keys.length; i < j; i++) {
			
			newObj[keys[i]] = rawObj[keys[i]][0];
			
		};
		console.log(newObj);
		console.groupEnd();
		return newObj;
	},
	csvToJSON : CSV2JSON,
	storeData : function(data, storageKey) {
		var toStore = ( typeof data === "object") ? JSON.stringify(data) : data;
		localStorage.setItem(mstats.settings.storagePrefix + storageKey, toStore);
	},
	loadData : function(storageKey) {
		var data = localStorage.getItem(mstats.settings.storagePrefix + storageKey);
		try {
			data = JSON.parse(data);
		} catch(x) {
		}
		return data;
	}
};

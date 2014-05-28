if (typeof mstats ==="undefined") {
	mstats = {};
}
if (!mstats.utils) {
	mstats.utils = {};
}

mstats.utils.file = {
	readFilesAsText : function(files,defer) {
		var obj = [];
		for (var i = 0, j = files.length; i < j; i++) {
			var reader = new FileReader();
			reader.onloadend = function(evt) {
				if (evt.target.readyState == FileReader.DONE) {
					obj.push(evt.target.result);
					if(obj.length == files.length) {defer.resolve();};
				}
			};
			reader.readAsText(files[i]);
			
		}
		return obj;

	},
	getDataFromFiles : function(files,defer) {
		var obj = {}, key, val;
		for (var i = 0, j = files.length; i < j; i++) {
			
			key = mstats.utils.file.fileNameToDateStamp(files[i].name);
			val = mstats.utils.file.readFilesAsText([files[i]],defer);
			
			obj[key] = val;
			
		};
		
		return obj;
	},
	fileNameToDateStamp : function(name) {
		return name.match(/[0-9]{4}_[0-9]{2}_[0-9]{2}/)[0];
	}
};

statsApp = {
	init : function() {
		statsApp.attachEvents();
	},
	attachEvents : function() {
		statsApp.fileInput.onchange = function(e) {
			var allLoaded = Q.defer();
			var allCleaned = allLoaded.promise;
			var rawData = mstats.utils.file.getDataFromFiles(e.target.files,allLoaded);
			
			allCleaned.then(function(){
				var cleanData = mstats.utils.data.formatData(rawData);
				rawData = null;
				statsApp.data = cleanData;
				cleanData = null;
				
			});
			
		}
	},
	showStats : function(type) {
		

	},
	fileInput : document.querySelector("input#csv"),
	data : {},
	chartView:document.querySelector("#charts .content")
}

statsApp.init();

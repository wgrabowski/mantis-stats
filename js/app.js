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
		
		for(var i=0,j=button = statsApp.showButtons.length; i<j; i++){
		  var button = statsApp.showButtons[i];
		  button.onclick = function(e){
				statsApp.showStats(e.target.getAttribute("data-show"));  	
		  }
		};
		statsApp.recalcButton.onclick = function(){
			console.log("cliock");
			statsApp.calcStats();
		}
	},
	calcStats : function() {
	  	statsApp.stats = mstats.calc.getDailyStats(statsApp.data);

	},
	showStats : function(templateName) {
	  	var h = Handlebars.templates[templateName]({days:statsApp.stats});
	  	statsApp.chartView.innerHTML = h;	

	},
	fileInput : document.querySelector("input#csv"),
	showButtons : document.querySelectorAll("button[data-show]"),
	recalcButton : document.querySelector("button#recalc"),
	data : {},
	chartView:document.querySelector("#charts .content")
}

statsApp.init();


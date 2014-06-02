statsApp = {
	init : function() {
		statsApp.attachEvents();
	},
	attachEvents : function() {
		statsApp.loadButton.onclick = function(e){
			statsApp.fileInput.click();
		};
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
			statsApp.recalcButton.disabled = false;
			
		};
		statsApp.canvasBg.onchange = function(e) {
			statsApp.canvas.style.background = e.target.value;
			
		};
		
		for(var i=0,j=button = statsApp.showButtons.length; i<j; i++){
		  var button = statsApp.showButtons[i];
		  button.onclick = function(e){
				statsApp.showStats(e.target.getAttribute("data-show"));  	
		  };
		};
		for(var i=0,j=button = statsApp.drawButtons.length; i<j; i++){
		  var button = statsApp.drawButtons[i];
		  button.onclick = function(e){
				var set = prepareDataset(statsApp.stats,button.getAttribute("data-draw"));  	
				drawDataset(set);
		  };
		};
		statsApp.recalcButton.onclick = function(){
			var i = 0,j=0;
			statsApp.calcStats();
			for(i=0,j = statsApp.drawButtons.length; i<j; i++){
				console.log(statsApp.drawButtons[i]);
				statsApp.drawButtons[i].disabled = false;
			}
			for(i=0,j= statsApp.showButtons.length; i<j; i++){
				console.log(statsApp.showButtons[i]);
				statsApp.showButtons[i].disabled = false;
			}
		};
	},
	calcStats : function() {
	  	statsApp.stats = mstats.calc.getDailyStats(statsApp.data);

	},
	showStats : function(templateName) {
	  	var h = Handlebars.templates[templateName]({days:statsApp.stats});
	  	statsApp.chartView.innerHTML = h;	

	},
	loadButton : document.querySelector("#load"),
	fileInput : document.querySelector("input#csv"),
	showButtons : document.querySelectorAll("button[data-show]"),
	drawButtons : document.querySelectorAll("button[data-draw]"),
	recalcButton : document.querySelector("button#recalc"),
	canvas : document.querySelector("canvas"),
	canvasBg : document.querySelector("#canvasBg"),
	data : {},
	chartView:document.querySelector("#charts .content")
};

statsApp.init();


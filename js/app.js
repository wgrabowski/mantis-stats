statsApp = {
	init : function() {
		statsApp.attachEvents();
	},
	attachEvents : function() {
		statsApp.loadButton.onclick = function(e) {
			statsApp.fileInput.click();
		};
		statsApp.fileInput.onchange = function(e) {
			var allLoaded = Q.defer();
			var allCleaned = allLoaded.promise;
			var rawData = mstats.utils.file.getDataFromFiles(e.target.files, allLoaded);

			allCleaned.then(function() {
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

		for (var i = 0, j = button = statsApp.showButtons.length; i < j; i++) {
			var button = statsApp.showButtons[i];
			button.onclick = function(e) {
				statsApp.showStats(e.target.getAttribute("data-show"));
			};
		};
		for (var i = 0, j = button = statsApp.drawButtons.length; i < j; i++) {
			var button = statsApp.drawButtons[i];
			button.onclick = function(e) {
				var set = prepareDataset(statsApp.stats, e.target.getAttribute("data-draw"));
				drawDataset(set);
			};
		};
		statsApp.recalcButton.onclick = function() {
			var i = 0, j = 0;
			statsApp.calcStats();

		};
	},
	calcStats : function() {
		statsApp.stats = mstats.calc.getDailyStats(statsApp.data);
		for ( i = 0, j = statsApp.drawButtons.length; i < j; i++) {
			console.log(statsApp.drawButtons[i]);
			statsApp.drawButtons[i].disabled = false;
		}
		for ( i = 0, j = statsApp.showButtons.length; i < j; i++) {
			console.log(statsApp.showButtons[i]);
			statsApp.showButtons[i].disabled = false;
		}

	},
	showStats : function(templateName) {
		var h = Handlebars.templates[templateName]({
			days : statsApp.stats
		});
		statsApp.chartView.innerHTML = h;

	},
	fillGaps : function() {
		var stop = new Date(statsApp.dateRange.end);
		var iterationDays = [];
		iterationDays.push(statsApp.dateRange.start);
		debugger;
		for (var d = new Date(statsApp.dateRange.start); d <= stop; d.setDate(d.getDate() + 1)) {
			if (d.getDay() != 0 && d.getDay() != 6) {
				iterationDays.push(new Date(d));
			};

		}
		iterationDays.push(statsApp.dateRange.end);

		for (var i = 0, j = iterationDays.length; i < j; i++) {
			iterationDays[i] = statsApp.dateToKey(iterationDays[i]);
		};
		console.log(iterationDays);
	},
	dateToKey : function(date) {
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		return '' + y + '_' + (m <= 9 ? '0' + m : m) + '_' + (d <= 9 ? '0' + d : d);
	},
	loadButton : document.querySelector("#load"),
	fileInput : document.querySelector("input#csv"),
	showButtons : document.querySelectorAll("button[data-show]"),
	drawButtons : document.querySelectorAll("button[data-draw]"),
	recalcButton : document.querySelector("button#recalc"),
	canvas : document.querySelector("canvas"),
	canvasBg : document.querySelector("#canvasBg"),
	data : {},
	chartView : document.querySelector("#charts .content")
};

statsApp.init();


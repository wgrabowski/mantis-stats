var graphs = document.querySelector("#graphs");
var legend = document.querySelector("#legend");

var canvasSize = {
	x : graphs.width - 100,
	y : graphs.height
};
var gridCount = {
	x : 15,
	y : 90
};
var scale = {
	x : canvasSize.x / gridCount.x,
	y : canvasSize.y / gridCount.y,
};
var ctx = graphs.getContext("2d");

function drawDataset(dataset) {
	graphs.width = graphs.width;
	legend.width = legend.width;
	var count = 1;
	var ctx = legend.getContext("2d");
	for (key in dataset) {
		console.log(key, statusColors[key]);
		drawChart(dataset[key], chartColors[count-1]);
		ctx.fillStyle = chartColors[count-1];
		ctx.font = "bold 30px Roboto,Calibri,sans-serif";
		ctx.fillText(key, 10, 30 * count);
		count++;
	}
	drawGrid();
}

function drawGrid() {
	var ctx = graphs.getContext("2d");
	for (var i = 0; i < gridCount.x; i++) {
		ctx.beginPath();
		ctx.moveTo(i * scale.x, 0);
		ctx.lineTo(i * scale.x, canvasSize.y);
		ctx.strokeStyle = "gray";
		ctx.lineWidth = 1;
		ctx.stroke();
	};
	for (var i = 0; i < gridCount.y; i++) {
		ctx.beginPath();
		ctx.moveTo(0, i * scale.y);
		ctx.lineTo(canvasSize.x, i * scale.y);
		ctx.strokeStyle = "gray";
		ctx.lineWidth = 1;
		ctx.stroke();
	};
}

function drawChart(dataset, color) {
	var ctx = graphs.getContext("2d");
	ctx.beginPath();
	for (var i = 0, j = dataset.length; i < j; i++) {
		value = isNaN(dataset[i]) ? 0 : dataset[i] * scale.y;
		i == 0 ? ctx.moveTo(i * scale.x, value) : ctx.lineTo(i * scale.x, value);
	}
	ctx.strokeStyle = color;
	ctx.lineWidth = 3;
	ctx.stroke();

}

function prepareDataset(originalData, field) {
	var mapped = [], dataset = {};
	mapped = originalData.map(function(item) {
		return {
			label : item.day,
			data : item.data[field]
		}
	});

	for (var i = 0, j = mapped.length; i < j; i++) {
		data = mapped[i].data;
		for (key in data) {
			if ( typeof dataset[key] === "undefined")
				dataset[key] = [];
			dataset[key][i] = data[key];
		}
	};
	return dataset;
}

statusColors = {
	"new" : "pink",
	"reopened" : "red",
	"resolved" : "steelblue",
	"closed" : "gray",
	"in progress" : "lime",
	"code review" : "violet",
	"client feedback" : "yellow"
};
var chartColors = ["black", "navy", "green", "teal", "maroon", "purple", "olive", "silver", "gray", "blue", "lime", "aqua+", "red", "fuschia", "yellow"];


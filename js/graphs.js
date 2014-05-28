var graphs = document.querySelector("#graphs");
var ctx = graphs.getContext("2d");

function drawDataset(dataset){
	for(key in dataset){
		console.log(key,statusColors[key]);
		drawChart(dataset[key],statusColors[key],30);
	}
}

function drawChart(dataset, color,labelOffset) {
	var ctx = graphs.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(0, 0);
	for (var i = 0, j = dataset.length; i < j; i++) {
		console.log("draw %d %d",i * labelOffset, dataset[i]);
		value = isNaN(dataset[i]) ? 0 : dataset[i]*scaleY
		ctx.lineTo(i * labelOffset, value);
	}
	ctx.strokeStyle = color;
	ctx.stroke();
}

function prepareDataset(originalData,field){
	var mapped = [],dataset = {};
	mapped = originalData.map(function(item){return {label:item.day,data:item.data[field]}});
	
	for(var i=0,j=mapped.length; i<j; i++){
	  data = mapped[i].data;
	  for(key in data){
	  	if(typeof dataset[key] === "undefined") dataset[key]= [];
	  	dataset[key][i]=data[key];
	  }
	};
	return dataset;
}

statusColors = {
	"new":"salmon",
	"reopened":"red",
	"resolved":"steelblue",
	"closed":"gray"
	};
scaleY=30;
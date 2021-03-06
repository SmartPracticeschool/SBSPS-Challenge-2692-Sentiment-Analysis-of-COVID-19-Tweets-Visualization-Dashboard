var globalData=0
var dayChart=0
var threeCatGraphObjects=[]
var dates
const make3catGraphs = function(data,category){
	var data_slice = data[category]
	var week = Object.keys(data_slice)
	var i;

	for (i = 0; i < week.length; i++) {
		let dataset=[]
		var keys = Object.keys(data_slice[week[i]])
		keys.map(key => {
			dataset.push(data_slice[week[i]][key])
		})
		var basename="3catGraph"
		var temp=i+1

		var tempChart = new Chart(document.getElementById(basename.concat(temp.toString())),{
		"type":"polarArea",
		"data":{
			"labels":keys,
			"datasets":[{
				"data":dataset,
				"backgroundColor":["#ff6961","#7EC8E3","#77dd77"]} 
			]}
		})
		threeCatGraphObjects.push(tempChart)
	} 
}

const update3catGraphs = function(data,category){
	var data_slice = data[category]
	var week = Object.keys(data_slice)
	var i;

	for (i = 0; i < week.length; i++) {
		let dataset=[]
		var keys = Object.keys(data_slice[week[i]])
		keys.map(key => {
			dataset.push(data_slice[week[i]][key])
		})
		var basename="3catGraph"
		var temp=i+1

		threeCatGraphObjects[i].destroy()

		var tempChart = new Chart(document.getElementById(basename.concat(temp.toString())),{
		"type":"polarArea",
		"data":{
			"labels":keys,
			"datasets":[{
				"data":dataset,
				"backgroundColor":["#ff6961","#7EC8E3","#77dd77",]} 
			]}
		})
		threeCatGraphObjects[i]= tempChart

	} 
}


const makeNegativeReasonsGroph = function(data){

	var week = Object.keys(data)
	var i;

	for (i = 0; i < week.length; i++) {
		let dataset=[]
		var keys = Object.keys(data[week[i]])
		keys.map(key => {
			dataset.push(data[week[i]][key])
		})
		var basename="pieChart"
		var temp=i+1
		new Chart(document.getElementById(basename.concat(temp.toString())),{
		"type":"doughnut",
		"data":{
			"labels":keys,
			"datasets":[{
				"data":dataset,
				"backgroundColor":["#FF9999","#FF3333","#CC0000","#660000","#C0C0C0","#808080","#404040"]}
			]}
		})
	} 

}

const makeMonthGraph = function(monthdata){
	// var dates = Object.keys(monthdata)
	var pos = []
	var neg = []
	var neu = []
	dates.map(key => {
		pos.push(monthdata[key].positive)
		neg.push(monthdata[key].negative)
		neu.push(monthdata[key].neutral)
	})


	new Chart(document.getElementById("lineChart1"),{
	"type":"line",
	"data":{
		"labels":dates,
		"datasets":[{
			"label":"Positive Values",
			"data":pos,
			"fill":false,
			"borderColor":"#00CC00",
			"lineTension":0.1
		},
		{
			"label":"Negative Values",
			"data":neg,
			"fill":false,
			"borderColor":"#CC0000",
			"lineTension":0.1
		},
		{
			"label":"Neutral Values",
			"data":neu,
			"fill":false,
			"borderColor":"#0000CC",
			"lineTension":0.1
		}]},
		"options":{}
	})
}

const makeDayGraph = function(daysData,date){
	var dayData=daysData[date]
	var hours=['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
	console.log(hours)
	var pos = []
	var neg = []
	var neu = []
	hours.map(key => {
		pos.push(dayData[key].positive)
		neg.push(dayData[key].negative)
		neu.push(dayData[key].neutral)
	})

	dayChart = new Chart(document.getElementById("lineChart2"),{
	"type":"line",
	"data":{
		"labels":hours,
		"datasets":[{
			"label":"Positive Values",
			"data":pos,
			"fill":false,
			"borderColor":"#00CC00",
			"lineTension":0.1
		},
		{
			"label":"Negative Values",
			"data":neg,
			"fill":false,
			"borderColor":"#CC0000",
			"lineTension":0.1
		},
		{
			"label":"Neutral Values",
			"data":neu,
			"fill":false,
			"borderColor":"#0000CC",
			"lineTension":0.1
		}]},
		"options":{}
	})
}

const updateDayGraph = function(daysData,date){
	var dateObj=new Date(date)
	var firstDateObj=new Date(dates[0])
	var lastDateObj=new Date(dates[dates.length-1])

	if (dateObj >= firstDateObj && dateObj<= lastDateObj) {
		// console.log('hi')
	}
	else{
		var x = document.getElementById("snackbar");
		x.innerHTML='Invalid date: Date should be between '+dates[0]+' and '+dates[dates.length-1]
		x.className = "show";
	  	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
		// alert('Invalid date: Date should be less between '+dates[0]+' and '+dates[dates.length-1])
		return
	}

	var dayData=daysData[date]
	var hours=['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
	console.log(hours)
	var pos = []
	var neg = []
	var neu = []
	hours.map(key => {
		pos.push(dayData[key].positive)
		neg.push(dayData[key].negative)
		neu.push(dayData[key].neutral)
	})
	dayChart.destroy()
	dayChart = new Chart(document.getElementById("lineChart2"),{
	"type":"line",
	"data":{
		"labels":hours,
		"datasets":[{
			"label":"Positive Values",
			"data":pos,
			"fill":false,
			"borderColor":"#00CC00",
			"lineTension":0.1
		},
		{
			"label":"Negative Values",
			"data":neg,
			"fill":false,
			"borderColor":"#CC0000",
			"lineTension":0.1
		},
		{
			"label":"Neutral Values",
			"data":neu,
			"fill":false,
			"borderColor":"#0000CC",
			"lineTension":0.1
		}]},
		"options":{}
	})
}

const initiateChart = function(data){
	// var date = '2020-03-29'
	var category = 'mostViralAccounts'
	globalData=data

	dates=Object.keys(data.dayData)
	var firstDateString=dates[0]
	console.log(firstDateString)

	makeMonthGraph(data.monthData)
	makeDayGraph(data.dayData,firstDateString)
	document.getElementById("inputdate").value=firstDateString
	make3catGraphs(data,category)
	makeNegativeReasonsGroph(data.negativeReasons)
}

$('#viralButton').on('click',function(){
	var category = 'mostViralAccounts'
	update3catGraphs(globalData,category)
})

$('#followedButton').on('click',function(){
	var category = 'mostFollowedAccounts'
	update3catGraphs(globalData,category)
})
$('#activeButton').on('click',function(){
	var category = 'mostActiveAccounts'
	update3catGraphs(globalData,category)
})

$('#dateSubmit').on('click',function(){
	var date = document.getElementById("inputdate").value;
	console.log(date)
	updateDayGraph(globalData.dayData,date)

})

const loadData = function(res){
	$.ajax({
		url: '/indiaData',
		method: "GET",
		success: initiateChart
	})
}

$(function() {
	loadData()
})


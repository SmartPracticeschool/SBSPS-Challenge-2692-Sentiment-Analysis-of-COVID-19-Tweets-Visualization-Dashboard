var lastTweet
var lineGraphData=[]
var lineColor
var lineGraph
var barGraph
var barGraphData=[0,0,0]//positive,neutral,negative
var yLabels = {
    '-1': 'negative', '0' : 'neutral', '1' : 'positive'
}
var tableData
var tableIds

const createChart = function(){

	lineGraph = new Chart(document.getElementById("lineChart1"),{
		"type":"line",
		"data":{
			"labels":[1,2,3,4,5,6,7,8,9,10],
			"datasets":[{
				"label":"Live Tweet Data",
				"data":lineGraphData,
				"fill":false,
				"borderColor":lineColor,
				"lineTension":0.1
			}]
		},
		"options": {
			"legend":{
				"display": false
			},
		    "scales": {
		        "yAxes": [{
		            "ticks": {
		                callback: function(value, index, values) {
		                    // for a value (tick) equals to 8
		                    return yLabels[value];
		                    // 'junior-dev' will be returned instead and displayed on your chart
		                }
		            }
		        }]
		    }
		}
	});

	barGraph = new Chart(document.getElementById("lineChart2"),{
		"type":"bar",
		"data":{
			"labels":["Positive","Neutral","Negative"],
			"datasets":[{
				"label":"",
				"data":barGraphData,
				"fill":false,
				"backgroundColor":["#77dd77","#7EC8E3","#ff6961"],
				"borderColor":["#77dd77","#7EC8E3","#ff6961"],
				"borderWidth":1}]
			},
			"options":{
				"legend":{
					"display":false
				},
				"scales":{
					"yAxes":[{
						"ticks":{
							"beginAtZero":true
						}
					}]
				}
			}
		});

}

const initiateTable=function(){

	var col=['Tweet Id','Tweet','Sentiment']
	
	//creating a dynamic table
	var table=document.createElement("table");
	table.setAttribute('id','mainTable')

	//creating html table header row using sheaders
	var header=table.createTHead();
	var tr=header.insertRow(-1);
	for(var i=0;i<col.length;i++){
		var th=document.createElement("th");
		th.innerHTML=col[i];
		tr.appendChild(th);
	}

	//add json data to the table as rows
	var tbody=document.createElement('tbody')
	for(var i=0;i<tableIds.length;i++){
		tr2=tbody.insertRow(-1);
		for(var j=0;j<col.length;j++){
			var tabCell=tr2.insertCell(-1);
			if(j==0){
				tabCell.innerHTML=tableIds[j];
			}
			else if(j==1){
				tabCell.innerHTML=tableData[tableIds[i]]['text'];
			}
			else{
				tabCell.innerHTML=tableData[tableIds[i]]['value'];
			}

		}
	}
	table.appendChild(tbody)
	//adding the table to a div
	var divContainer=document.getElementById("tweetsTable");
	divContainer.innerHTML="";
	divContainer.appendChild(table);

	$('#mainTable').DataTable({
		"lengthMenu":[10],
		"aaSorting" : []
	});

	console.log('done')
	
	// makePi1()
	// // makePi2()
	// makeTimeChart()
}


const loadTweet = function(){
	$.ajax({
		url : '/liveTweetData',
		method: "GET",
		success: function(data){
			console.log(data)
			var id=Object.keys(data['data'])[0]
			// console.log('id',id)
			// console.log('lasttweet',lastTweet)

			if(id == lastTweet){
				console.log('old Tweet')
			}
			else{
				console.log("new tweet")
				lineGraphData.shift()

				if(data['data'][id]['value']=='positive'){
	    			lineGraphData.push(1)
	    			barGraphData[0]+=1
	    			lineColor="#77dd77"
	    		}
	    		else if(data['data'][id]['value']=='negative'){
	    			lineGraphData.push(-1)
	    			barGraphData[2]+=1
	    			lineColor="#ff6961"
	    		}
	    		else{
	    			lineGraphData.push(0)
	    			barGraphData[1]+=1
	    			lineColor="#7EC8E3"
	    		}

				lastTweet = id

			    lineGraph.data.datasets.forEach((dataset) => {
			    	// dataset.data.shift()
			    	// dataset.data.push(lineGraphData[lineGraphData.length-1]);
			    	dataset.borderColor=lineColor
			    });
			    lineGraph.update();
			    barGraph.update()

			    tableData[id]=data['data'][id]
			    tableIds.shift()
			    tableIds.push(id)
			    initiateTable()
			}
				
		}
	})
}
setInterval(loadTweet,5000);

const loadData = function(){
	$.ajax({
    url: '/liveData',
    method: "GET",
    success: function(data){
    	console.log(data)
    	var ids=Object.keys(data['data'])
    	tableIds=ids
    	// console.log(ids)
    	for(var i =0; i<ids.length;i++){
    		if(data['data'][ids[i]]['value']=='positive'){
    			lineGraphData.push(1)
    			barGraphData[0]+=1
    			lineColor="#77dd77"
    		}
    		else if(data['data'][ids[i]]['value']=='negative'){
    			lineGraphData.push(-1)
    			barGraphData[2]+=1
    			lineColor="#ff6961"
    		}
    		else{
    			lineGraphData.push(0)
    			barGraphData[1]+=1
    			lineColor="#7EC8E3"
    		}
    	}
    	console.log(barGraphData)
    	lastTweet=ids[ids.length - 1]
    	createChart()
    	
    	tableData=data['data']
    	initiateTable()
    	loadTweet()
    }
  })
}

$(function() {
	loadData()
})
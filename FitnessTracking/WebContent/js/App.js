
var adjustCircleProgress = function (jQueryObj, value) {
	var size = 145;
	if (window.innerWidth < 768) {
		size = 170;
	}
	
	jQueryObj.circleProgress({
	    value: value,
	    size: size,
	    lineCap: 'round',
	    thickness: 30,
	    animation: {
            duration: 3500,
            easing: 'circleProgressEasing'
        }
	}).on('circle-animation-progress', function(event, progress) {
		$(this).find('strong').html(parseInt(value * 100 * progress) + '<i>%</i>');
	});
};

var adjustLineChart = function (chartID, columns) {
	var chart = c3.generate({
	    bindto: '#' + chartID,
	    data: {
	      columns: columns
	    }
	});
};

$(document).ready(function() {
	var table = $('#dataTable');
	var circleProgresses = $('#circleProgresses');
	var selectedCircleProgresses = $('#selectedCircleProgresses');
	var data = new ParseWorkouts(trackdata);
	var revData = data.fastReverse();
	
	var totalRatioColumn = ['Total Ratio'];
	var totalRatioColumns = [totalRatioColumn];
	var calorieDuration = ['Calories / Duration'];
	var calorieDurations = [calorieDuration];
	
	data.forEach(function(workout) {
		var date = new Date(workout.date);
		workout.date = date;
		
		//
		var fatBurnProgress = workout.fatBurnDuration / workout.duration;
		var fitnessProgress = workout.fitnessDuration / workout.duration;
		
		workout.fatBurnProgress = fatBurnProgress;
		workout.fitnessProgress = fitnessProgress;
		
		//
		var totalRatio = workout.calories * workout.averageBPM * workout.maxBPM * workout.fatBurnDuration / workout.duration;
		workout.totalRatio = totalRatio;
		totalRatioColumn.push(totalRatio);
		
		var calorDur = workout.calories / workout.duration;
		calorieDuration.push(calorDur.toPrecision(2));
	});
	
	// populate circle progress
	revData.forEach(function(workout, index) {
		var c = document.createElement('div');
		var circ = $(c).addClass('circle').addClass('circle-' + index);
		var s = document.createElement('strong');
		var i = document.createElement('div');
		circ.append(i);
		circ.append(s);
		circleProgresses.append(circ);
		adjustCircleProgress(circ, workout.fatBurnProgress);
	});
	
	var dataMean = Math.floor(data.length / 2);
	
	// populate selected circle progress
	data.forEach(function(workout, index) {
		if (index === 0 || (index + 1) === data.length || index === dataMean) {
			var c = document.createElement('div');
			var circ = $(c).addClass('circle').addClass('circle-' + index);
			var s = document.createElement('strong');
			var i = document.createElement('div');
			circ.append(i);
			circ.append(s);
			selectedCircleProgresses.append(circ);
			adjustCircleProgress(circ, workout.fatBurnProgress);
		}
	});
	
	// populate table
	revData.forEach(function(workout, index) {
		var row = '<tr><td>' + workout.date.toDateString()
			+ '</td><td>' + workout.date.toTimeString()
			+ '</td><td>' + workout.duration.toHHMMSS()
			+ '</td><td>' + workout.calories.tokCal()
			+ '</td><td>' + workout.averageBPM.toBPM()
			+ '</td><td>' + workout.maxBPM.toBPM()
			+ '</td><td>' + workout.fatBurnDuration.toHHMMSS()
			+ '</td><td>' + workout.fitnessDuration.toHHMMSS()
			+ '</td></tr>';
		table.append(row);
	});
	
	adjustLineChart('totalRatio', totalRatioColumns);
	adjustLineChart('caloriesDuration', calorieDurations);
});
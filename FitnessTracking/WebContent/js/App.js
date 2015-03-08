
var adjustCircleProgress = function (jQueryObj, value, isBig) {
	var size = isBig ? 300 : 145;
	var thickness = isBig ? 60 : 30;
	if (window.innerWidth <= 320) {
		size = isBig ? 110 : 63;
		thickness = isBig ? 25 : 15;
	} else if (window.innerWidth <= 568) {
		size = isBig ? 190 : 80;
		thickness = isBig ? 40 : 20;
	} else if (window.innerWidth <= 768) {
		size = isBig ? 265 : 110;
		thickness = isBig ? 55 : 25;
	}
	
	jQueryObj.circleProgress({
	    value: value,
	    size: size,
	    lineCap: 'round',
	    thickness: thickness,
	    animation: {
            duration: 3500,
            easing: 'circleProgressEasing'
        }
	}).on('circle-animation-progress', function(event, progress) {
		$(this).find('.percentage').html(parseInt(value * 100 * progress) + '<i>%</i>');
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
		var circ = $('<div>').addClass('circle').addClass('circle-' + index);
		var s = $('<div>').addClass('percentage');
		var i = $('<div>').addClass('date');
		i.html(workout.date.toDateString());
		circ.append(i);
		circ.append(s);
		circleProgresses.append(circ);
		adjustCircleProgress(circ, workout.fatBurnProgress, false);
	});
	
	var dataMean = Math.floor(data.length / 2);
	
	// populate selected circle progress
	data.forEach(function(workout, index) {
		if (index === 0 || (index + 1) === data.length || index === dataMean) {
			var circ = $('<div>').addClass('bigCircle').addClass('circle-' + index);
			var s = $('<div>').addClass('percentage');
			var i = $('<div>').addClass('date');
			i.html(workout.date.toDateString());
			circ.append(i);
			circ.append(s);
			selectedCircleProgresses.append(circ);
			adjustCircleProgress(circ, workout.fatBurnProgress, true);
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
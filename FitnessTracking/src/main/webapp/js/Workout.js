function Workout(parsed) {
	this.date = new String();
	this.duration = new String();
	this.calories = new String();
	this.averageBPM = new String();
	this.maxBPM = new String();
	this.fatBurnDuration = new String();
	this.fitnessDuration = new String();
	
	for (var prop in parsed) {
		this[prop] = parsed[prop];
	}
}

function ParseWorkouts(list) {
	var workouts = [];
	for (var item in list) {
		if (item !== "fastReverse") {
			var w = new Workout(list[item]);
			workouts.push(w);
		}
	}
	return workouts;
}
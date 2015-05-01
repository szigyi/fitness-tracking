package hu.szigyi.fitnesstracking.model;

import java.util.Date;

import com.google.appengine.repackaged.org.joda.time.Duration;

public class Workout {

	private Date date;
	
	private Date startDatetime;
	
	private Duration duration;
	
	private Integer calories;
	
	private Integer averageBPM;
	
	private Integer maxBPM;
	
	private Duration fatBurnDuration;
	
	private Duration fitnessDuration;

	@Override
	public String toString() {
		return "Workout [date=" + date + ", startDatetime=" + startDatetime
				+ ", duration=" + duration + ", calories=" + calories
				+ ", averageBPM=" + averageBPM + ", maxBPM=" + maxBPM
				+ ", fatBurnDuration=" + fatBurnDuration + ", fitnessDuration="
				+ fitnessDuration + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((date == null) ? 0 : date.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Workout other = (Workout) obj;
		if (date == null) {
			if (other.date != null)
				return false;
		} else if (!date.equals(other.date))
			return false;
		return true;
	}

	public Date getDate() {
		return date;
	}

	public Date getStartDatetime() {
		return startDatetime;
	}

	public Duration getDuration() {
		return duration;
	}

	public Integer getCalories() {
		return calories;
	}

	public Integer getAverageBPM() {
		return averageBPM;
	}

	public Integer getMaxBPM() {
		return maxBPM;
	}

	public Duration getFatBurnDuration() {
		return fatBurnDuration;
	}

	public Duration getFitnessDuration() {
		return fitnessDuration;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public void setStartDatetime(Date startDatetime) {
		this.startDatetime = startDatetime;
	}

	public void setDuration(Duration duration) {
		this.duration = duration;
	}

	public void setCalories(Integer calories) {
		this.calories = calories;
	}

	public void setAverageBPM(Integer averageBPM) {
		this.averageBPM = averageBPM;
	}

	public void setMaxBPM(Integer maxBPM) {
		this.maxBPM = maxBPM;
	}

	public void setFatBurnDuration(Duration fatBurnDuration) {
		this.fatBurnDuration = fatBurnDuration;
	}

	public void setFitnessDuration(Duration fitnessDuration) {
		this.fitnessDuration = fitnessDuration;
	}
}

package hu.szigyi.fitnesstracking.controller;

import hu.szigyi.fitnesstracking.dao.WorkoutDAOImpl;
import hu.szigyi.fitnesstracking.model.Workout;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
// @RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, consumes =
// MediaType.APPLICATION_JSON_VALUE)
public class HomeController {

	@Autowired
	private WorkoutDAOImpl workoutDAO;

	@ResponseBody
	@RequestMapping(value = "/workouts", method = RequestMethod.GET)
	public List<Workout> getWorkouts() {
		workoutDAO.get();
		return new ArrayList<Workout>();
	}
}

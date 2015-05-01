package hu.szigyi.fitnesstracking.controller;

import hu.szigyi.fitnesstracking.model.Workout;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
public class HomeController {

	@ResponseBody
	@RequestMapping(value = "/workouts", method = RequestMethod.GET)
	public List<Workout> getWorkouts() {
		return new ArrayList<Workout>();
	}
}

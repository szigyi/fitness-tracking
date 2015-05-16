package hu.szigyi.fitnesstracking.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.google.appengine.api.utils.SystemProperty;

public class WorkoutDAOImpl {

	public void get() {
		String url = null;
		try {
			System.out.println(SystemProperty.environment.value());
			if (SystemProperty.environment.value() == SystemProperty.Environment.Value.Production) {
				// Load the class that provides the new "jdbc:google:mysql://"
				// prefix.
				Class.forName("com.mysql.jdbc.GoogleDriver");
				url = "jdbc:google:mysql://fitness--tracking:database?user=root";
			} else {
				// Local MySQL instance to use during development.
				Class.forName("com.mysql.jdbc.Driver");
				url = "jdbc:mysql://localhost/database?user=root";

				// Alternatively, connect to a Google Cloud SQL instance using:
				// jdbc:mysql://ip-address-of-google-cloud-sql-instance:3306/guestbook?user=root
			}
		} catch (final Exception e) {
			e.printStackTrace();
			return;
		}

		try {
			final Connection conn = DriverManager.getConnection(url);
			try {
				final String statement = "SELECT * FROM workout";
				final Statement stmt = conn.createStatement();
				final ResultSet rs = stmt.executeQuery(statement);
				while (rs.next()) {
					final int int1 = rs.getInt("calories");
					System.out.println("Calories: " + int1);
				}
			} finally {
				conn.close();
			}
		} catch (final SQLException e) {
			e.printStackTrace();
		}
	}
}

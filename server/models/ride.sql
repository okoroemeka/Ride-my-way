DROP TABLE IF EXISTS rides CASCADE;
CREATE TABLE rides(
	id SERIAL PRIMARY KEY,
 	destination VARCHAR(50) NOT NULL,
 	current_location VARCHAR(50) NOT NULL,
 	departure_time VARCHAR(10) NOT NULL,
	seat_available INT NOT NULL, 
 	user_id INT REFERENCES users(user_id)
);
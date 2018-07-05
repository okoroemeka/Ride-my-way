--DROP TABLE IF EXISTS rides CASCADE;
CREATE TABLE rides(
	id SERIAL PRIMARY KEY,
 	first_name VARCHAR(50) NOT NULL,
 	last_name VARCHAR (50) NOT NULL,
 	phone_number INT NOT NULL,
 	destination VARCHAR(50) NOT NULL,
 	current_location VARCHAR(50) NOT NULL,
 	departure_time VARCHAR(10) NOT NULL,
 	user_id INT REFERENCES users(user_id)
);
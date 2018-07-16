DROP TABLE IF EXISTS rides CASCADE;
CREATE TABLE rides(
	id SERIAL PRIMARY KEY,
 	destination VARCHAR NOT NULL,
 	current_location VARCHAR NOT NULL,
 	departure_time VARCHAR NOT NULL,
	seat_available INT NOT NULL, 
 	user_id INT REFERENCES users(id) ON DELETE CASCADE,
	createdAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
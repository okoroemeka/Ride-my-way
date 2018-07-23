DROP TABLE IF EXISTS rideRequest;
CREATE TABLE rideRequest(
	id SERIAL PRIMARY KEY,
	full_name VARCHAR NOT NULL,
 	pickup_location VARCHAR NOT NULL,
 	departure_time VARCHAR NOT NULL,
	status VARCHAR DEFAULT 'pending',
 	user_id INT REFERENCES users(id) ON DELETE CASCADE,
    ride_id INT REFERENCES rides(id) ON DELETE CASCADE,
    createdAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

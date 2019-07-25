const tripModel = {
  getAllTrips: `
  SELECT * FROM
    trips
  `,

  createTrip: `
  INSERT INTO
    trips(
      bus_id, origin, destination, trip_date, fare)
    VALUES($1, $2, $3, $4, $5)
    returning *
  `,

  getTripById: `
  SELECT * FROM
    trips WHERE id = $1
  `,
};

export default tripModel;

import { query } from '../db/index';

const tripModel = {
  createTrip: async (newTrip) => {
    const queryText = `
    INSERT INTO
      trips(
        bus_id, origin, destination, trip_date, fare)
      VALUES($1, $2, $3, $4, $5)
      returning *
    `;
    const values = [
      newTrip.bus_id,
      newTrip.origin,
      newTrip.destination,
      newTrip.trip_date,
      newTrip.fare,
    ];

    try {
      const { rows } = await query(queryText, values);
      const trip = rows[0];
      const output = {
        trip_id: trip.id,
        bus_id: trip.bus_id,
        origin: trip.origin,
        destination: trip.destination,
        trip_date: trip.trip_date,
        fare: trip.fare,
      };
      return output;
    } catch (error) {
      return { error };
    }
  },

  getTripById: `
  SELECT * FROM
    trips WHERE id = $1
  `,

  getAllTrips: async () => {
    const queryText = `
    SELECT * FROM
      trips
    `;

    try {
      const { rows } = await query(queryText);
      const trips = rows;
      const outputs = [];
      trips.forEach((trip) => {
        const output = {
          trip_id: trip.id,
          bus_id: trip.bus_id,
          origin: trip.origin,
          destination: trip.destination,
          trip_date: trip.trip_date,
          fare: trip.fare,
        };
        outputs.push(output);
      });
      return outputs;
    } catch (error) {
      return { error };
    }
  },
};

export default tripModel;

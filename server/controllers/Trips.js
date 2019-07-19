import { query } from '../db/index';
import tripModel from '../models/Trips';

const getAllTripsController = async (req, res) => {
  const { getAllTrips } = tripModel;
  const queryText = getAllTrips;

  if ((req.user.id !== req.value.body.user_id) || (req.user.is_admin !== req.value.body.is_admin)) return res.status(401).json({ status: 401, error: 'invalid token' });

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
    return res.status(200).json({ status: 200, count: outputs.length, data: outputs });
  } catch (error) {
    return res.status(500).json({ status: 500, error });
  }
};

export default getAllTripsController;

import tripModel from '../models/Trips';

const tripsController = {
  getAllTrips: async (req, res) => {
    const allTrips = await tripModel.getAllTrips();
    if (allTrips.error) return res.status(500).json({ status: 500, error: allTrips.error });
    return res.status(200).json({ status: 200, count: allTrips.length, data: allTrips });
  },

  createTrip: async (req, res) => {
    const createdTrip = await tripModel.createTrip(req.value.body);
    if (createdTrip.error) return res.status(500).json({ status: 500, error: createdTrip.error });
    return res.status(201).json({ status: 201, message: 'Trip created successfully', data: createdTrip });
  },
};

export default tripsController;

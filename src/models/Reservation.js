import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date:  { type: Date,   required: true },
  time:  { type: String, required: true },
  station: { type: String },
  area: { type: String },
  moveInDate: { type: String },
  initialCost: { type: String },
  occupants: { type: String },
  occupation: { type: String },
  buildingStructure: { type: String },
  pets: { type: String },
  parking: { type: String },
  interiorColor: { type: String },
  preferences: { type: String },
  notes: { type: String },
  googleCalendarEventId: { type: String },
}, { timestamps: true });

export default mongoose.model('Reservation', reservationSchema); 
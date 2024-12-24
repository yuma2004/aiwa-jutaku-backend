import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date:  { type: Date,   required: true },
  time:  { type: String, required: true },
  notes: { type: String },
  googleCalendarEventId: { type: String },
}, { timestamps: true });

export default mongoose.model('Reservation', reservationSchema); 
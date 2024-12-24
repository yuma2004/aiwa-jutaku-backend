import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  startTime:       { type: String, default: '09:00' },
  endTime:         { type: String, default: '17:00' },
  timeSlot:        { type: Number, default: 30 },  // 30分刻み
  weeklyHolidays:  { type: [Number], default: [0,6] }, // 日曜(0),土曜(6)
  specialHolidays: { type: [Date], default: [] },
}, { timestamps: true });

export default mongoose.model('Setting', settingSchema); 
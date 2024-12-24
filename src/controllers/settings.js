import Setting from '../models/Setting.js';

export const getSettings = async (req, res) => {
  try {
    const setting = await Setting.findOne() || await Setting.create({});
    res.json(setting);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching settings' });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const data = req.body;
    let setting = await Setting.findOne();
    if (!setting) {
      setting = new Setting();
    }

    if (data.startTime !== undefined) setting.startTime = data.startTime;
    if (data.endTime !== undefined) setting.endTime = data.endTime;
    if (data.timeSlot !== undefined) setting.timeSlot = data.timeSlot;
    if (data.weeklyHolidays !== undefined) setting.weeklyHolidays = data.weeklyHolidays;
    if (data.specialHolidays !== undefined) setting.specialHolidays = data.specialHolidays;

    await setting.save();
    res.json({
      message: 'Settings updated',
      settings: setting
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating settings' });
  }
}; 
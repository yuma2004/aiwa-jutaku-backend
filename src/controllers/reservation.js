import Reservation from '../models/Reservation.js';
import { createEvent, deleteEvent, updateEvent } from '../services/googleCalendar.js';

export const createReservation = async (req, res) => {
  try {
    // 1. リクエストボディからデータを取得
    const {
      name, phone, email, date, time,
      station, area, moveInDate, initialCost,
      occupants, occupation, buildingStructure,
      pets, parking, interiorColor, preferences,
      notes
    } = req.body;

    // 2. MongoDB に保存
    const newReservation = await Reservation.create({
      name, phone, email, date, time,
      station, area, moveInDate, initialCost,
      occupants, occupation, buildingStructure,
      pets, parking, interiorColor, preferences,
      notes
    });

    // 3. Google カレンダー登録
    const startDateTime = new Date(`${date}T${time}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

    const eventData = await createEvent({
      summary: `内覧予約: ${name}`,
      description: `
【基本情報】
電話: ${phone}
メール: ${email}

【希望条件】
最寄り駅: ${station}
希望エリア: ${area}
入居希望時期: ${moveInDate}
初期費用の目安: ${initialCost}
入居人数: ${occupants}
職業: ${occupation}

【物件条件】
建物構造: ${buildingStructure}
ペット: ${pets}
駐車場: ${parking}
内装カラー: ${interiorColor}
その他希望: ${preferences}

【備考】
${notes}`,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString()
    });

    // 4. イベントIDをMongoDBに反映
    newReservation.googleCalendarEventId = eventData.id;
    await newReservation.save();

    res.status(201).json({
      message: 'Reservation created',
      reservation: newReservation
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating reservation' });
  }
};

export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching reservations' });
  }
};

export const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(reservation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching reservation' });
  }
};

export const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Not found' });
    }

    if (notes) {
      reservation.notes = notes;
    }

    await reservation.save();
    res.json({
      message: 'Reservation updated',
      reservation
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating reservation' });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Not found' });
    }

    if (reservation.googleCalendarEventId) {
      await deleteEvent(reservation.googleCalendarEventId);
    }

    await reservation.deleteOne();
    res.json({ message: 'Reservation deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting reservation' });
  }
}; 
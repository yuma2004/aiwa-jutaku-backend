import { google } from 'googleapis';
import 'dotenv/config';

const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_CALENDAR_ID } = process.env;

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const auth = new google.auth.JWT(
  GOOGLE_CLIENT_EMAIL,
  null,
  GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),  // \nを改行に戻す
  SCOPES
);

const calendar = google.calendar({ version: 'v3', auth });

/**
 * イベント作成
 */
export async function createEvent({ summary, description, start, end }) {
  const event = {
    summary,
    description,
    start: { dateTime: start },
    end:   { dateTime: end },
  };
  const res = await calendar.events.insert({
    calendarId: GOOGLE_CALENDAR_ID,
    requestBody: event,
  });
  return res.data; // { id: 'xxx', ... }
}

/**
 * イベント削除
 */
export async function deleteEvent(eventId) {
  await calendar.events.delete({
    calendarId: GOOGLE_CALENDAR_ID,
    eventId,
  });
}

/**
 * イベント更新
 */
export async function updateEvent(eventId, updateFields) {
  const res = await calendar.events.patch({
    calendarId: GOOGLE_CALENDAR_ID,
    eventId,
    requestBody: updateFields,
  });
  return res.data;
} 
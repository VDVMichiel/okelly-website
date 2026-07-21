export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  description: string;
  type: 'club' | 'lic' | 'lik' | 'nic' | 'other';
};

const API_KEY = process.env.GOOGLE_SHEETS_API_KEY || '';
const SHEET_ID = process.env.GOOGLE_SHEET_ID || '';
const TAB_NAME = process.env.GOOGLE_SHEET_TAB || 'Kalender';

export async function fetchEvents(): Promise<Event[]> {
  if (!API_KEY || !SHEET_ID) {
    console.error('Google Sheets API key or Sheet ID is not configured.');
    return [];
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${TAB_NAME}?key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Failed to fetch events from Google Sheets:', response.statusText);
      return [];
    }

    const data = await response.json();
    const rows: string[][] = data.values;

    if (!rows || rows.length <= 1) {
      return [];
    }

    return rows.slice(1).map((row, index) => ({
      id: row[0] || String(index + 1),
      date: row[1] || '',
      type: (row[2] || 'other').toLowerCase() as Event['type'],
      title: row[3] || '',
      time: row[4] || '',
      endTime: row[5] || '',
      location: row[6] || '',
      description: row[7] || '',
    }));
  } catch (error) {
    console.error('Error fetching events from Google Sheets:', error);
    return [];
  }
}

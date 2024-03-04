import {google} from "googleapis";

export const sheetIdentifier = {
    spreadsheetId: '17K4pnqkhCsq99DpyYDtqSos7VxVkaNx11cjfxmfEFS8',
    range: 'Hoja 1'
};

export async function connectGoogleSheets(){
    const credentials = Buffer.from(import.meta.env.GOOGLE_CREDENTIALS , 'base64').toString('utf-8');
    const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(credentials),
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const sheets = google.sheets({ version: 'v4', auth});

    return sheets;
}
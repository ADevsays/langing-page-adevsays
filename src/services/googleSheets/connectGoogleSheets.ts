import {google} from "googleapis";
import connectionSheet from "src/utils/getConnectionSheet";

export const sheetIdentifier = {
    spreadsheetId: '1IWTQ18Hai6cV-dsRbtFJiT0XFgKIVLR42H1dpmZVaPs',
    range: 'Hoja 1'
};

export async function connectGoogleSheets(){
    const credentials = Buffer.from(import.meta.env.GOOGLE_CREDENTIALS , 'base64').toString('utf-8');
    const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(credentials),
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    console.log("call from anywher")
    const sheets = google.sheets({ version: 'v4', auth});
    connectionSheet.updateConnectionSheet(sheets);
    return sheets;
}
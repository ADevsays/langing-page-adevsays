import { connectGoogleSheets, sheetIdentifier } from "./connectGoogleSheets";

export async function getEmails(){
    const sheets = await connectGoogleSheets();
    const sheet = await sheets.spreadsheets.values.get(sheetIdentifier);
    const rows = sheet.data.values;
    const emails = rows?.flat();
    return emails;
}
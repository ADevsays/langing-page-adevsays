import connectionSheet from "src/utils/getConnectionSheet";
import { sheetIdentifier } from "./connectGoogleSheets";

export async function getEmails(){
    const sheets = connectionSheet.getSheet();
    const sheet = await sheets.spreadsheets.values.get(sheetIdentifier);
    const rows = sheet.data.values;
    const emails = rows?.flat();
    return emails.slice(1);
}
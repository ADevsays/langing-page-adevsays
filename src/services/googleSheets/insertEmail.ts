import { connectGoogleSheets, sheetIdentifier } from "./connectGoogleSheets";

export async function insertEmail(email:string){
    const sheets = await connectGoogleSheets();
    const sheet = await sheets.spreadsheets.values.get(sheetIdentifier);

    const rows = sheet.data.values;
    if (rows?.some(row => row[0] === email)) {
        return null;
    }

    //@ts-ignore
    await sheets.spreadsheets.values.append({
        spreadsheetId: sheetIdentifier.spreadsheetId,
        range: sheetIdentifier.range,
        valueInputOption: 'USER_ENTERED', 
        insertDataOption: 'INSERT_ROWS',
        resource:{
            values:[[email]]
        }
      },
    );

    return true;

}
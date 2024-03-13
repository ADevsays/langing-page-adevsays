import { connectGoogleSheets } from "./connectGoogleSheets";

interface PropsCouponToken{couponName:string, token:string, expirationTime:number, price:number}

const couponsSheet = {   
    spreadsheetId: '17K4pnqkhCsq99DpyYDtqSos7VxVkaNx11cjfxmfEFS8',
    range: 'Tokens'
}

export async function saveCouponToken({couponName, token, expirationTime, price}:PropsCouponToken){
    const sheets = await connectGoogleSheets();
    if(!couponName || !token) return null;
    //@ts-ignore
    await sheets.spreadsheets.values.append({
        spreadsheetId: couponsSheet.spreadsheetId,
        range: couponsSheet.range,
        valueInputOption: 'USER_ENTERED', 
        insertDataOption: 'INSERT_ROWS',
        resource:{
            values:[[couponName, token, expirationTime, price]]
        }
    });
    return true;    
}

export async function getCouponTokens(){
    const sheets = await connectGoogleSheets();
    const sheet = await sheets.spreadsheets.values.get(couponsSheet);
    const rows = sheet.data.values;
    const tokens = rows?.slice(1);
    return tokens?.map(token => ({
        couponName: token[0],
        token: token[1],
        expirationTime: Number(token[2]),
        price: token[3]
    }));
}
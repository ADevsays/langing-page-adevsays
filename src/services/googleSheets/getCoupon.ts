import { connectGoogleSheets } from "./connectGoogleSheets";

const couponsSheet = {   
    spreadsheetId: '17K4pnqkhCsq99DpyYDtqSos7VxVkaNx11cjfxmfEFS8',
    range: 'Coupons'
}

export async function getCoupon(){
    const sheets = await connectGoogleSheets();    
    const sheet = await sheets.spreadsheets.values.get(couponsSheet);
    const rows = sheet.data.values?.slice(1);
    if(!rows) throw new Error("Maybe dont have coupons");
    return rows?.map(coupon=>{
        return {
            coupon: coupon[0],
            expirationTime: Number(coupon[1]),
            porcentage: Number(coupon[3])
        }
    }) as Coupon[];
}
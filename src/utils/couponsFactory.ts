export class Coupons{
    public couponsList = [] as Coupon[];
    public currentCoupon = {} as Coupon;

    constructor(couponsReceived: Coupon[]){
        this.couponsList = couponsReceived;
    };

    checkIfExistsCoupon(userCoupon:string){
        const exists = this.couponsList
                        .some(({coupon})=> coupon.toLowerCase() === userCoupon.toLowerCase());
        if(exists){
            this.currentCoupon = this.couponsList
                                .find(({coupon})=> 
                                        coupon.toLowerCase() === userCoupon.toLowerCase()) as Coupon;
            return this.currentCoupon;
        }
        return null;
    };

    checkIsExpired(){
        const now = new Date().getTime();
        if(!this.currentCoupon.expirationTime) return false;
        return now >= this.currentCoupon?.expirationTime; 
    };

    calcPorcentage(normalPrice:string){
        if(!this.currentCoupon.porcentage) return 0;
        const converNumber = Number(normalPrice.replace(",", "."));
        return Math.ceil(converNumber - ((converNumber * this.currentCoupon.porcentage) / 100)) as number;
    };

}
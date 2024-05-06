interface CheckPayment {
    expiration: number,
    payment: boolean,
    quantity: string,
    useCoupon: boolean,
    setExpiration: ()=> void
}
interface Coupon{
    coupon:string, 
    expirationTime:number,
    porcentage: number
}

interface TokenCoupon{
    couponName:string, 
    expirationTime:number,
    token:string,
    price:string
}

interface ArticleBlog{
    title:string;
    description:string;
    slug: string;
    img: string;
    tags: string[];
    date: string;
}
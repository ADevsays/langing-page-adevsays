import {ads} from "../consts/affiliateLinks";

export default function getBanner(next:number = 0){
    const time = new Date().getHours() + next;
    const adIndex = time % ads.length;
    return ads[adIndex]
}
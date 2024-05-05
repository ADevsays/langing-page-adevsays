import {ads} from "../consts/affiliateLinks";

export default function getBanner(){
    const time = new Date().getHours();
    const adIndex = time % ads.length;
    return ads[adIndex]
}
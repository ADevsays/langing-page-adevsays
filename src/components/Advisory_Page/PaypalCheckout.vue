<script lang="ts" setup>
import { closePaypalButton } from 'src/services/paypal/connectPaypal';
import { closeModal } from 'src/utils/actionsModal';
import { computed, ref, reactive, onMounted} from 'vue';
import CouponForm from './CouponForm.vue';
import { reloadTokenIfExists } from 'src/utils/saveUsedCoupon';
import keyCouponUse from 'src/consts/keyCouponUse';
import { getFromLocal } from 'src/helpers/getFromLocal';
import { deleteFromLocal } from 'src/helpers/deleteFromLocal';
import parsedToken from 'src/helpers/parsedToke';
import createPayButton from 'src/helpers/createPayButton';

const couponModalState = ref(false);
const alreadyHaveCoupon = ref(false);
const price = reactive({
    normal: "20",
    coupon: false,
    base: 20
});

const updateCurrentPrice = (newPrice:string)=>{
    price.normal = newPrice;
    price.coupon = true;
};

const closePaypalModal = ()=>{
    closeModal("#paypalModal");  
    closePaypalButton();
    couponModalState.value = false;
};

const updateCouponModal = async ()=>{
    couponModalState.value = !couponModalState.value;
    if(!couponModalState.value) return;
    const existsCoupon = await reloadTokenIfExists();
    if(!existsCoupon) return;
    price.normal = String(existsCoupon.price);
    price.coupon = true;
    alreadyHaveCoupon.value = true;
    createPayButton(existsCoupon.price);
    setTimeout(() => {
        alreadyHaveCoupon.value = false;
        couponModalState.value = false;
    }, 5000);
};

const buttonCouponText = computed(()=>{
    return couponModalState.value ? "Tal vez más tarde" : "¡Utilízalo ahora mismo!";
});

onMounted(async ()=>{
    const stringDataCouponUsed = getFromLocal(keyCouponUse);
    if(!stringDataCouponUsed) return;
    const objCouponDataSave = parsedToken(stringDataCouponUsed);
    const now = new Date().getTime();
    const isExpired = now >= objCouponDataSave.expirationTime;
    if(isExpired){
        deleteFromLocal(keyCouponUse);
        return;
    };
    price.normal = String(objCouponDataSave.price);
    price.coupon = true;
});

</script>

<template>
    <div id="paypalModal" class="w-full fixed hidden inset-0 h-full z-[999] justify-center pt-12 bg-black bg-opacity-90 overflow-y-sroll overflow-x-hidden">
        <section class="bg-gradient-to-br relative to-[#121212] to-40% from-blue-950 flex flex-col items-center pt-12 w-full md:max-w-[620px] h-auto md:max-h-[640px] rounded-xl">        
            <article class="h-auto w-full px-1 md:px-6"> 
                <h3 class="text-2xl font-bold text-center">¡<span class="text-yellow-400">Felicidades</span> por dar el primer paso!</h3>
                <p class="w-full text-base p-4 pb-2 mt-3 text-gray-300 text-pretty font-normal">Estás a punto de acceder a una asesoría personalizada para convertir tus dudas en soluciones. 📚
                    <br/> 
                    Sé que la seguridad es importante, por esto todos tus datos estarán protegidos por la plataforma de Paypal, yo no tengo acceso a ninguno de ellos. ☝</p>
                <p class="w-full p-4 text-gray-300 text-pretty font-normal pb-2">Recuerda que al invertir en esta asesoría, estás invirtiendo en ti; en tu tiempo, en tu pasión y por qué no, también en tu futuro. 🔥</p>
            </article>
            <p class="w-full p-4 text-gray-300 text-xs text-pretty font-bold pb-4 px-4 md:px-9">
                ¿Tienes un cupón? 
                <button @click="updateCouponModal" class="text-sky-600 underline">{{ buttonCouponText }}</button>
            </p>
            <CouponForm @update-current-price="updateCurrentPrice" :normalPrice="price.normal" :openState="couponModalState"/> 
            <p v-if="alreadyHaveCoupon" class="text-sm text-yellow-400">Parece que ya tenías un cupón reclamado. Sigue con tu compra.</p>
            <p class="w-full text-right px-8 md:px-9 font-normal text-gray-400 mt-6 relative">
                Valor para reservar: 
                <span v-if="price.coupon" class="line-through absolute top-[-20px] ms-1 text-blue-800 text-sm font-bold">${{ price.base }}</span>
                <span class="text-yellow-400 font-bold text-xl"> 
                    ${{ price.normal }}
                </span> 
                USD
            </p>
            <small class="text-center w-full px-1 lg:px-9 pb-4 mt-0 lg:bg-transparent bg-[#121212] block italic font-bold text-xs pt-8">Desarrollado por Paypal. 👇</small>
            <div id="paypalContainer" class=" w-full px-1 lg:px-9 pb-4 mt-0 lg:bg-transparent bg-[#121212]"></div>
        </section>
        <button @click="closePaypalModal" id="closeModalCalendly" class="absolute top-[12px] right-[10px]">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-x" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10l4 4m0 -4l-4 4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg>
            </span>
        </button>  
    </div>
</template>
<script setup lang=ts>
import createPayButton from 'src/helpers/createPayButton';
import { Coupons } from 'src/utils/couponsFactory';
import { checkUsedCoupon, saveCouponInSheet } from 'src/utils/saveUsedCoupon';
import { onMounted, watch, ref } from 'vue';

const props = defineProps<{
    openState?: boolean | false,
    normalPrice: string
}>();
const emit = defineEmits(["updateCurrentPrice"]);

const errorsMsg = {
    EMPTY: "El campo tiene que tener más de 4 dígitos",
    INVALID: "Lo siento, parece que el cupón que has escrito no es válido",
    EXPIRED: "El cupón que tratas de usar ya ha expirado, lo lamento.",
    USED: "Parece que ya has reclamado este cupón."
};

const isLoaded = ref(false);
const couponCache = ref<null | Coupons>(null);
const haveBeenError = ref(false);
const successfull = ref(false);
const errorToShow = ref(errorsMsg.INVALID);
const valueForm = ref("");

const getCoupons = async () => {
    isLoaded.value = false;
    const data = await fetch("/api/get-coupon");
    const coupons = await data.json();
    isLoaded.value = true;
    const computedCouponArray = new Coupons(coupons);
    couponCache.value = computedCouponArray;
}

const cleanState =()=>{
    setTimeout(() => {
        valueForm.value = "";
        haveBeenError.value = false;
    }, 2200);
}

const onlyValidation = (errMsg:string)=>{
    haveBeenError.value = true;
    errorToShow.value = errMsg;
    cleanState();
}

const validateCoupon = async ()=>{
    if(valueForm.value.length < 3){
        onlyValidation(errorsMsg.EMPTY);
        return;
    }
    const userCoupon = couponCache.value?.checkIfExistsCoupon(valueForm.value);
    if(!userCoupon){
        onlyValidation(errorsMsg.INVALID);
        return;
    }
    const isExpired = couponCache.value?.checkIsExpired();
    if(isExpired){
        onlyValidation(errorsMsg.EXPIRED);
        return;
    }
    const currentPrice = String(couponCache.value?.calcPorcentage(props.normalPrice));
    const sendValues = {
        couponName: userCoupon.coupon,
        expirationTime: userCoupon.expirationTime,
        price: currentPrice
    };
    const isUsedCoupon = await checkUsedCoupon(sendValues);
    if(isUsedCoupon.isUsed){
        onlyValidation(errorsMsg.USED);
        return;
    };
    await saveCouponInSheet({
        couponName: userCoupon.coupon,
        expirationTime: userCoupon.expirationTime,
        price: currentPrice
    });
    successfull.value = true;
    emit("updateCurrentPrice", currentPrice);
    createPayButton(currentPrice);
    setTimeout(() => {
        successfull.value = false;
    }, 5000);
}

onMounted(() => {
    watch(() => props.openState, (newState) => {
        if (newState && (!couponCache.value)) {
            getCoupons();
        }
    });
})

</script>

<template>
    <form @submit.prevent="validateCoupon" v-show="isLoaded" :class="props.openState ? 'h-[30px] px-1 md:px-9 opacity-1 mb-6' : 'h-0 opacity-0 mb-0'"
        class="relative transition-all w-full grid grid-cols-3 px-4 ">
        <input type="text"
            v-model="valueForm"
            class="p-3 rounded-xl col-span-2 bg-gray-800 opacity-70 focus:opacity-100 focus:outline-none rounded-r-none"
            placeholder="Ingresa tu cupón...">
        <button :class="props.openState ? 'block' : 'hidden'"
            class="text-sm lg:text-base col-span-1 w-full h-full rounded-xl rounded-s-none bg-gradient-to-br from-cyan-600 to-blue-600  hover:text-white dark:text-white">Aplicar
            descuento 15%</button>
    </form>
    <small v-show="haveBeenError" class="text-sm text-red-400 m-0 p-0">
        {{errorToShow}}
    </small>
    <p v-show="successfull" class="text-yellow-400 px-1 lg:px-9 font-bold text-sm mt-1 p-0 text-center animate-fade-in animate-duration-150">¡Felicidades! El cupón se ha reclamado correctamente, se te aplicará el descuento en seguida. 😄</p>
    <div v-show="!isLoaded && props.openState" class="w-full flex items-center justify-center mt-4">
        <div class="loader"></div>
    </div>
</template>

<style scoped>
    .loader {
    width: 30px;
    padding: 4px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #25b09b;
    --_m: 
        conic-gradient(#0000 10%,#000),
        linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
            mask: var(--_m);
    -webkit-mask-composite: source-out;
            mask-composite: subtract;
    animation: l3 1s infinite linear;
    }
    @keyframes l3 {to{transform: rotate(1turn)}}
</style>


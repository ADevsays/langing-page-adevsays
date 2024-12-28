<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { closePaypalButton, createPaypalButton } from "../../services/paypal/connectPaypal";
import callSendEmail from "../../services/email/callApiSend";
import cryptoPayment from "../../services/cryptomus/payment";

interface FormData{
    name:string, 
    email:string, 
    confirmEmail:string
};

const checkoutOption = ref("paypal");
const checkContainer = ref(null);
const validateData = ref(false);
const form = ref<null | HTMLFormElement>(null);
const cryptoUrl = ref("");

const data = reactive<FormData>({name:"", email: "", confirmEmail: ""});

const validate = ()=>{
    const fullForm = Object.values(data).every(value => value.trim() !== "");
    const equalEmail = data.email === data.confirmEmail;
    validateData.value = fullForm && equalEmail;
    changeCheck(checkoutOption.value)
};

const handleInput = (e:Event)=>{
    const input = e.target as HTMLInputElement;
    const key = input.name as keyof FormData;
    data[key] = input.value;
    validate();
};

const confirmPayment = async ()=>{
    await callSendEmail({email: data.confirmEmail, name:data.name});
    window.location.href = "/minimarket/devjourney/success";
};

const getCryptomusData = async ()=>{
    if(!cryptoUrl.value){
        const {result} = await cryptoPayment({email: data.confirmEmail, name:data.name});
        cryptoUrl.value = result.url;
    }
}

const changeCheck = (option:string)=>{
    checkoutOption.value = option;
    if(option === "paypal"){
        createPaypalButton(checkContainer.value, "14.99", confirmPayment);
    }else{
        getCryptomusData();
        closePaypalButton();
    }
};

onMounted(()=> changeCheck("paypal"))

</script>

<template>
    <form @submit.prevent = "" ref="form"lass="border-t mt-12">
        <label class="w-full ">
            <small class="my-3 block">Tu nombre completo</small>
            <input 
                @input="handleInput"
                :value="data.name"
                name="name"
                class="block w-full rounded-lg p-3 bg-white border border-gray-400" type="text" required placeholder="introduce tu nombre completo">
        </label>
        <label class="w-full ">
            <small class="my-3 block">Tu email</small>
            <input 
                @input="handleInput"
                :value="data.email"
                name="email"
                class="block w-full rounded-lg p-3 bg-white border border-gray-400" type="email" required placeholder="introduce tu email">
        </label>
        <label class="w-full ">
            <small class="my-3 block">Confirma tu email</small>
            <input 
                @input="handleInput"
                :value="data.confirmEmail"
                name="confirmEmail"
                class="block w-full rounded-lg p-3 bg-white border border-gray-400" type="email" required placeholder="confirma tu email">
        </label>
    </form>

    <div class="w-full flex items-center justify-between gap-8 mt-12 flex-col md:flex-row">
        <button 
            @click="changeCheck('paypal')"
            class="min-h-[80px] flex  items-center justify-center flex-1 text-gray-400 rounded-lg bg-white border-gray-400 w-full border text-left">
            <img class="max-w-[310px]" src="/resources/minmarket/devjourney/titles/paypal.webp" alt="paypal black and white icon">
        </button>
        <button 
            @click="changeCheck('cryptomus')"
            class="min-h-[80px] flex  items-center justify-center flex-1 text-gray-400 rounded-lg bg-white border-gray-400 w-full border text-left">
            <img class="max-w-[110px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBigXc_dqg4IFFfNmgL3oi3-MRZiCs2bd9Kg&s" alt="paypal black and white icon">
        </button>
    </div>

    <div ref="checkContainer" class="w-full py-6 mt-6 relative">
        <div 
            @click="form?.requestSubmit()"
            v-if="!validateData" 
            class="size-full absolute inset-0 z-[999]"></div>
        <p class="text-lg text-gray-400">Detalles de la compra</p>
        <div class="flex justify-between items-center mb-6">
            <p class="font-bold">Devjourney por Adevsays</p>
            <span class="text-gray-400">US $14.99</span>
        </div>
        <a 
            :href="cryptoUrl"
            v-if="checkoutOption === 'cryptomus'"
            class="w-full flex justify-center items-center bg-black rounded-lg">
            <img 
                class="w-full max-h-[75px] object-contain"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVi_DDknBgYOxYdx-zvLgui7ylM2Wj4oBrbA&s"
            >
        </a>
    </div>
</template>

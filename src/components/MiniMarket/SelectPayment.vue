<script setup lang="ts">
import { reactive, ref } from "vue";
import { createPaypalButton } from "../../services/paypal/connectPaypal";
import callSendEmail from "../../services/email/callApiSend";

const checkoutOption = ref("paypal");
const checkContainer = ref(null);
const validateData = ref(false);

const data = reactive({name:"", email: "", confirmEmail: ""});

const validate = ()=>{
    const fullForm = Object.values(data).every(value => value.trim() !== "");
    const equalEmail = data.email === data.confirmEmail;
    validateData.value = fullForm && equalEmail;
    changeCheck(checkoutOption.value)
};

const handleInput = (e:Event)=>{
    const input = e.target as HTMLInputElement;
    data[input.name] = input.value;
    validate();
};

const confirmPayment = async ()=>{
    await callSendEmail({email: data.confirmEmail, name:data.name});
    window.location.href = "/minimarket/devjourney/success";
    
};

const changeCheck = (option:string)=>{
    checkoutOption.value = option;
    if(!validateData.value) return;
    if(option === "paypal"){
        createPaypalButton(checkContainer.value, "14.99", confirmPayment);
    }
};

</script>

<template>
    <form class="border-t mt-12">
        <label class="w-full ">
            <small class="my-3 block">Tu nombre completo</small>
            <input 
                @input="handleInput"
                name="name"
                class="block w-full rounded-lg p-3 bg-white border border-gray-400" type="text" required placeholder="introduce tu nombre completo">
        </label>
        <label class="w-full ">
            <small class="my-3 block">Tu email</small>
            <input 
                @input="handleInput"
                name="email"
                class="block w-full rounded-lg p-3 bg-white border border-gray-400" type="email" required placeholder="introduce tu email">
        </label>
        <label class="w-full ">
            <small class="my-3 block">Confirma tu email</small>
            <input 
                @input="handleInput"
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
        <!-- <button 
            @click="changeCheck('cryptomus')"
            class="min-h-[80px] flex  items-center justify-center flex-1 text-gray-400 rounded-lg bg-white border-gray-400 w-full border text-left">
            <img class="max-w-[110px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBigXc_dqg4IFFfNmgL3oi3-MRZiCs2bd9Kg&s" alt="paypal black and white icon">
        </button> -->
    </div>

    <div ref="checkContainer" class="w-full py-6 mt-6">
        <p class="text-lg text-gray-400">Detalles de la compra</p>
        <div class="flex justify-between items-center mb-6">
            <p class="font-bold">Devjourney por Adevsays</p>
            <span class="text-gray-400">US $14.99</span>
        </div>
        <p class="italic font-medium" v-show="!validateData">Por favor, rellena los datos y confirma tu email</p>
    </div>
</template>

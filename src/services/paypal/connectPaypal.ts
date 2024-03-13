import { loadScript, type PayPalButtonsComponent } from "@paypal/paypal-js";
import { closeModal, handleModal, injectSuccessAlert, insertCalendlyWidget } from "src/utils/actionsModal";
import { savePayment } from "src/utils/checkPayment";

let paypalButtonInstance: PayPalButtonsComponent | undefined;

function actionsOfSuccessfullPayment(){
    injectSuccessAlert("#paypalModal");
    savePayment("20");
    setTimeout(()=>{
        handleModal("#modalCalendly", 1500);
        closeModal("#paypalModal");
        closePaypalButton();
        insertCalendlyWidget("#widgetCalendly");
    }, 3000)
}

const formatAmountValue = (amount:string)=> Number(amount).toFixed(2);

const API = import.meta.env.PUBLIC_PAYPAL_CLIENT_ID;

export async function createPaypalButton(container: HTMLElement | null, price:string){
    try {
        await loadScript({ clientId: `${API}&locale=es_ES` });
        if (paypalButtonInstance) {
            paypalButtonInstance.close();
        }
        if(!window.paypal?.Buttons) return;

        paypalButtonInstance = window?.paypal?.Buttons({
            fundingSource: window.paypal.FUNDING?.CARD,
            createOrder: (_, actions)=>{
                console.log(price)
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [{
                        amount: {
                            value: formatAmountValue(price),
                            currency_code: "USD"
                        },
                    }],
                    application_context: {
                        shipping_preference: 'NO_SHIPPING'
                    }
                });
            },
            onApprove: async (_, {order})=> {
                if({order}){
                    return order?.capture().then(actionsOfSuccessfullPayment);
                }
            }
        });
        if(container)
        paypalButtonInstance?.render(container)
    } catch (error) {
        console.error('Error al cargar el script de PayPal:', error);
    }
}

export function closePaypalButton(){
    if (paypalButtonInstance) {
        paypalButtonInstance.close();
    }
}
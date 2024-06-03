import { changeClass } from "src/helpers/changeClass";

export function handleModal(query:string, time:number){
    const modalElement = document.querySelector(query);
    const loader = document.querySelector("#loader-modal");
    if(!modalElement || !loader) return;
    window.scrollTo({top: 0, behavior:"instant"});
    changeClass(loader, "flex", "hidden");
    setTimeout(()=>{
        changeClass(loader, "hidden", "flex");
        changeClass(modalElement, "flex", "hidden");
        document.body.classList.toggle("h-[700px]");
        document.body.classList.toggle("overflow-hidden");    
    }, time);
}

function removeWidget(){
    const scriptWidget = document.querySelector("#scriptLoadWidget");
    if(!scriptWidget) return null;
    scriptWidget.remove();
    const containerWidget = document.querySelector(".calendly-inline-widget");
    if(!containerWidget) return null;
    containerWidget.removeAttribute("data-processed");
    containerWidget.childNodes.forEach(child=> {
        setTimeout(() => {
            child.remove();
        }, 300);
    });
}

export function closeModal(query:string){
    const modalToClose = document.querySelector(query);
    if(!modalToClose) return;
    changeClass(modalToClose, "hidden", "flex");
    document.body.classList.add("h-[700px]");
    document.body.classList.remove("overflow-hidden");
    console.log("Change height")
    if(query === "#modalCalendly") removeWidget();
}

export function injectSuccessAlert(query:string){
    const componentSuccess = `<div style="width:620px; height:220px;" class="animate-fade-in flex justify-center items-center my-auto abslute text-center bg-gray-900 rounded-xl p-2">
                                <h3 class="my-6 w-full font-semibold text-gray-300 text-lg lg:text-2xl text-center">
                                    Tu pago <span class="text-yellow-400">ha sido exitoso</span>. A continuación selecciona el día
                                    para tu  <span class="text-yellow-400">asesoría <span class="loaderDotsProcessPay"></span>
                                </h3>
                            </div>`;
    const container = document.querySelector(query);
    if(!container) return null;
    container.innerHTML = componentSuccess;
} 

export function insertCalendlyWidget(queryWidget:string){
    const widget = document.querySelector(queryWidget);
    if(!widget) return;
    const script = document.createElement('script');
    script.id = "scriptLoadWidget";
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    widget.appendChild(script);    
}
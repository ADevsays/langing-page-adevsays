export function changeClass(element:HTMLElement | Element, class1:string, class2:string){
    element?.classList.add(class1);
    element?.classList.remove(class2);
}
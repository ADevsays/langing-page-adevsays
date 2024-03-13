export const saveInLocal = (key:string, data:any)=> {
    let dataToSave = data;
    if(typeof data === "object"){
        dataToSave = JSON.stringify(data);
    }
    localStorage.setItem(key, dataToSave);
};

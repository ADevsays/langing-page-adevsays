interface ConnectionSheet {
    sheet: any,
    connection: boolean,
    updateConnectionSheet:(newSheet:any)=>void,
    getSheet:()=> any
};

const connectionSheet:ConnectionSheet = {
    sheet: null, 
    connection: false,
    updateConnectionSheet(newSheet:any){
        this.sheet = newSheet,
        this.connection = true;
    },
    getSheet(){
        return this.sheet;
    }
};

export default connectionSheet;

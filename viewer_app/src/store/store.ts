import { makeAutoObservable } from 'mobx';
import { IItems } from '../App';

class DataStore {
    data:IItems[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    addData = (newData:IItems[]) => {
        this.data = this.data.concat(newData);
    }

    clearData = () => {
        this.data = [];
    }

    removeElement = (id:number) => {
        this.data = this.data.filter((item)=>{return item.id != id})
    }
}

export default DataStore;
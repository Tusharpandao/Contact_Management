import axios from "axios";

export class  ContactServices{
    static serverURL="http://localhost:8083"

    static getAllContacts(){
        let dataURl =`${this.serverURL}/listContact `

        return axios.get(dataURl)
    }

    static deleteContact(id){
        let dataURl = `${this.serverURL}/deleteContact/${id}`

       return axios.delete(dataURl)
    }
    
    static viewContact(id){
       
        let dataURL =`${this.serverURL}/viewContact/${id}`
        return axios.get(dataURL)
    }
    static editContact(contact){
        let dataURL =`${this.serverURL}/editContact`

        return axios.post(dataURL,contact)
    }
}
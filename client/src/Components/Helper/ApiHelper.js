import axios from "axios";

class ApiHelper {
    constructor() {
        this.baseUrl = 'http://localhost:8080'
    }

    // User Routes 
    getUser() {
        return axios.get(`${this.baseUrl}/student/`)
    }
    createUser(UserInfo) {
        return axios.post(`${this.baseUrl}/student/createStudent`, UserInfo)
    }
    updateUser(id, userInfo) {
        return axios.patch(`${this.baseUrl}/student/updateStudent/${id}`, userInfo)
    }
    deleteUser(id) {
        return axios.delete(`${this.baseUrl}/student/deleteStudent/${id}`)
    }


    // Address Routss
    getAdress(id) {
        return axios.get(`${this.baseUrl}/address/${id}`)
    }

    createAdress(addressInfo) {
        return axios.post(`${this.baseUrl}/address/createAddress`, addressInfo)
    }

    updateAdress(id, addressInfo) {
        return axios.put(`${this.baseUrl}/address/updateAddres/${id}`, addressInfo)
    }

    deleteAdress(id) {
        return axios.delete(`${this.baseUrl}/address/deleteAddres/${id}`)
    }



}
const apiHelper = new ApiHelper();
export default apiHelper;
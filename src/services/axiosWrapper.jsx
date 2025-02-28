import axios from "axios";

const api = axios.create({ 
    baseURL: "https://retopadelbackend.onrender.com/", //url base
});

api.interceptors.request.use( //modifico la request antes que se envie al servidor
    (config) => { //objeto config tiene la configuracion de la request 
        const token = sessionStorage.getItem("accessToken"); // obtengo token almacenado
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`; // agregar token al header
            config.headers["Content-Type"] = 'application/json';
        }
        return config;
});

const apiService = {

    //Llamadas de Usuarios
    getAllUsers: () => api.get("/user/getUsers"),
    getUserById: (userId)=> api.get(`/user/getUserById/${userId}`),
    editUserTickets: (userId, newTicketsData) => api.put(`/users/AddTickets/${userId}`, newTicketsData), //anadir y eliminar tickets o actualizar los tickets?
    logUser: () => api.post("/user/logUser"),

    //Llamadas de Paquetes
    createPackage: (packageData) => api.post("/package/createPackage", packageData),
    deletePackage: (packageId) => api.post(`/package/deletePackageByID/${packageId}`),
    editPackage: (packageId, packageData) => api.put(`/package/updatePackageByID/${packageId}`, packageData),
    getAllPackages: () => api.get("/package/getPackages"),

    //Llamadas del historial de transacciones
    getAllTransactions: () => api.get("/transaction/getTransactions"),
}

export default apiService;
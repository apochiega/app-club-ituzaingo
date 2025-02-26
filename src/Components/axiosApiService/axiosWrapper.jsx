import axios from "axios";

const api = axios.create({ 
    baseURL: "https://retopadelbackend.onrender.com/", 
    headers: {
        "token": ""
    },
});

api.interceptors.request.use( //modifico la request antes que se envie al servidor
    (config) => {
        const token = localStorage.getItem("token"); // Obtener token almacenado
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`; // Agregar token al header
        }
        return config;
});

    const apiService = {

        //Usuarios
        getAllUsers: () => api.get("/user/getUsers"),
        editUser: (userId, newUserData) => api.put(`/users/${userId}`, newUserData),


        //Paquetes
        createPackage: (packageData) => api.post("/packages", packageData),
        deletePackage: (packageId) => api.delete(`/packages/${packageId}`),
        editPackage: (packageId, packageData) => api.put(`/packages/${packageId}`, packageData),
        getAllPackages: () => api.get("/packages"),
    }

export default apiService;
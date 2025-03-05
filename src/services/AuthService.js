import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

// Iniciar sesión con Firebase Auth
export const logIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error;
    }
};

// Obtener el rol del usuario desde Firestore
export const getUserRole = async (uid) => {
    try {
        console.log("Obteniendo rol para UID:", uid);
        
        // Asegúrate de que la colección se llama correctamente (users o admin según tu Firestore)
        const userDocRef = doc(db, "users", uid); 
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const role = userDoc.data().role;
            console.log("Rol encontrado en Firestore:", role);
            return role;
        } else {
            console.log("No se encontró el documento del usuario en Firestore.");
            return null;
        }
    } catch (error) {
        console.error("Error al obtener el rol del usuario:", error);
        return null;
    }
};

// Cerrar sesión
export const logOut = async () => {
    sessionStorage.removeItem("authToken");
    await signOut(auth);
};

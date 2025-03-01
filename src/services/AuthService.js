import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";

// // Iniciar sesión y crear usuario si no existe
// export const logIn = async (email, password) => {
//     try {
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;

//         // Referencia al documento del usuario en Firestore
//         const userRef = doc(db, "admin", user.uid);
//         const userDoc = await getDoc(userRef);

//         if (!userDoc.exists()) {
//             // Si el usuario no existe, se crea con rol de admin
//             await setDoc(userRef, {
//                 email: user.email,
//                 role: "user", // Se asigna el rol de administrador
//                 createdAt: new Date()
//             });
//             console.log("Usuario creado como admin en Firestore");
//         } else {
//             console.log("El usuario ya existe en Firestore");
//         }

//         return user;
//     } catch (error) {
//         console.error("Error al iniciar sesión:", error);
//         throw error;
//     }
// };

// Iniciar sesión con Firebase
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
        const userDoc = await getDoc(doc(db, "users", uid)); 
        if (userDoc.exists()) {
            console.log("Rol obtenido:", userDoc.data().role);
            return userDoc.data().role; // "admin" o "user"
        }
        console.log("No se encontró el documento del usuario en Firestore.");
        return null;
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

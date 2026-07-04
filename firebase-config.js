import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDM4l8tYNjCoYw8lR2jfkoSRTTGr4RtiFQ",
  authDomain: "reneix-app.firebaseapp.com",
  projectId: "reneix-app",
  storageBucket: "reneix-app.firebasestorage.app",
  messagingSenderId: "1014616314292",
  appId: "1:1014616314292:web:fe12ed963bf2c686f062e1"
};


// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistencia de sesión configurada correctamente.");
  })
  .catch((error) => {
    console.error("Error al configurar la persistencia de la sesión:", error);
  });

export { auth, db, storage };

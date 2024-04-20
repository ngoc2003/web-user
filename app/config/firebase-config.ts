import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
export const firebaseConfig = {
  apiKey: "AIzaSyBeMAJ3wEI30E0ojVni2AT_RVbWk7YXOwc",
  authDomain: "petconnect-d3ffe.firebaseapp.com",
  projectId: "petconnect-d3ffe",
  storageBucket: "petconnect-d3ffe.appspot.com",
  messagingSenderId: "676151610396",
  appId: "1:676151610396:web:2b6dd076b4e30a125123d9",
  measurementId: "G-29B9MML7NB",
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage();

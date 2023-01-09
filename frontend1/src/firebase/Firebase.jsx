import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDFd97phDvB-ypHmdkY_o-V5H1e5J0Nu-I",
    authDomain: "profile-pic-2b5a8.firebaseapp.com",
    projectId: "profile-pic-2b5a8",
    storageBucket: "profile-pic-2b5a8.appspot.com",
    messagingSenderId: "553950601454",
    appId: "1:553950601454:web:fb90b24571dcb1f02dd3ff"
};


  const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };
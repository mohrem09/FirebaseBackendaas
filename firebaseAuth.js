// firebaseAuth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig  = {
    apiKey: "AIzaSyBJWLK8ND_06HhUFjEcQRcPUwyWqFvsdts",
  authDomain: "auth-cb625.firebaseapp.com",
  databaseURL: "https://auth-cb625-default-rtdb.firebaseio.com",
  projectId: "auth-cb625",
  storageBucket: "auth-cb625.appspot.com",
  messagingSenderId: "671503253601",
  appId: "1:671503253601:web:eb3fbd822fefe1d9fe2a20",
  measurementId: "G-EBCK47KNWM"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

export const createUser = (email, password, username, age, num, test) => {
  if (!email || !password || !username || !age || !num) {
    return Promise.reject(new Error("All fields are required"));
  }

  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return set(ref(database, 'doctors/' + user.uid), {
        username,
        email,
        num,
        age,
        test
      });
    })
    .then(() => 'User created')
    .catch((error) => {
      throw new Error(error.message);
    });
};

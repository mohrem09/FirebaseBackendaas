
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCeRIqF9eCme82fMT1ji--Z6QFfxClkHls",
  authDomain: "remdr-pro.firebaseapp.com",
  databaseURL: "https://remdr-pro-default-rtdb.firebaseio.com",
  projectId: "remdr-pro",
  storageBucket: "remdr-pro.appspot.com",
  messagingSenderId: "744470897803",
  appId: "1:744470897803:web:9ffa049514d894699ca08e",
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

// Code spécifique au navigateur
if (typeof window !== 'undefined') {
  document.getElementById("next").style.display = "none";

  sighUp.addEventListener('click', (e) => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    const age = document.getElementById('age').value;
    const num = document.getElementById('num').value;
    const test = false;

    createUser(email, password, username, age, num, test)
      .then((message) => {
        alert(message);
        document.getElementById("next").style.display = "block";
        document.getElementById("sighUp").style.display = "none";
      })
      .catch((error) => {
        alert(error.message);
      });
  });

  next.addEventListener('click', (e) => {
    window.location.href = "afterSignUp.html";
  });
}

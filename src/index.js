import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZDr2_R9l8bAtIpqy2ATKVQFdCjv19v54",
  authDomain: "my-first-project-d6b7f.firebaseapp.com",
  projectId: "my-first-project-d6b7f",
  storageBucket: "my-first-project-d6b7f.appspot.com",
  messagingSenderId: "927866744271",
  appId: "1:927866744271:web:0d404d1d10554b36b076ba",
};

// init firebase
initializeApp(firebaseConfig);

//init services
const db = getFirestore();

//collection ref
const colRef = collection(db, "time");

//get collection data
getDocs(colRef)
  .then((snapshot) => {
    const time = [];
    snapshot.docs.forEach((doc) => {
      time.push({ ...doc.data(), id: doc.id });
    });
    console.log(time);
  })
  .catch((err) => {
    console.log(e.error);
  });

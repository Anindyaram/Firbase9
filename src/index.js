import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

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
/*
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
*/
//Real time data collection

onSnapshot(colRef, (snapshop) => {
  const time = [];
  snapshop.docs.forEach((doc) => {
    time.push({ ...doc.data(), id: doc.id });
  });
  console.log(time);
});

//adding documents
const addTimeForm = document.querySelector(".add");
addTimeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Takes two argument 1st is sollection reference 2nd is object which represent new document that we wanna add to the commlection
  addDoc(colRef, {
    hour: addTimeForm.hour.value,
    minutes: addTimeForm.minutes.value,
    time: addTimeForm.time.value,
  }).then(() => {
    addTimeForm.reset();
  });
});

//Delete documents
const deleteTimeForm = document.querySelector(".delete");
deleteTimeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // const docRef = doc(database, 'collection',id of the document that we are reference to )
  const docRef = doc(db, "time", deleteTimeForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteTimeForm.reset();
  });
});

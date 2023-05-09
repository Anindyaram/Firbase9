import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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
const auth = getAuth();

//collection ref
const colRef = collection(db, "time");

//quiery string where hour==1
const q = query(
  colRef,
  /*where("title", "==", "Study"),*/
  orderBy("createdAt")
);

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

const unsubdata = onSnapshot(q, (snapshop) => {
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
    title: addTimeForm.title.value,
    hour: addTimeForm.hour.value,
    minutes: addTimeForm.minutes.value,
    createdAt: serverTimestamp(),
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

//GETING single document from firebase

const docRef = doc(db, "time", "cHeblabMCRsEOQ6kUSEw");

const unsubDoc = onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

//updating a document

const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "time", updateForm.id.value);
  updateDoc(docRef, {
    title: "updated title",
  }).then(() => {
    updateForm.reset();
  });
});

//Firebase Auth-signup user
const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signupForm.email.value;
  const password = signupForm.password.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user created", cred.user);
      signupForm.reset();
    })
    .catch((e) => {
      console.log(e.message);
    });
});

//Logging Out
const LogOutButton = document.querySelector(".LogOut");
LogOutButton.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      console.log("User Logged Out");
    })
    .catch((e) => {
      console.log(e.message);
    });
});

const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("User Logged In", cred.user);
    })
    .catch((e) => {
      console.log(e.message);
    });
});

//subscribing on auth changes;
const unsubAuth = onAuthStateChanged(auth, (user) => {
  console.log("User Status Change:", user);
});

//Unsubscribing from changes
const unsubButton = document.querySelector(".unsub");
unsubButton.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("unsubscribing");
  unsubAuth();
  unsubDoc();
  unsubDoc();
});

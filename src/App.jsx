import {initializeApp} from "firebase/app";
import {doc, addDoc, collection, getDocs, getFirestore, deleteDoc} from "firebase/firestore";
import {useEffect, useState} from "react";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyA2Cat9JBkP266vfaGx7PvIsVbtAwdYLcg",
  authDomain: "estudos-f7b02.firebaseapp.com",
  projectId: "estudos-f7b02",
});


export const App = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [user,setUser] = useState([]);

    const db = getFirestore(firebaseApp);
    const userCollectionRef = collection(db, "user");

    async function criarUser(){
      const user = await addDoc(userCollectionRef, {
        name, 
        email,
      });
      console.log(user);
    }

    useEffect(() => {
      const getUser = async () => {
        const data = await getDocs(userCollectionRef);
        console.log(data.docs.map(doc => ((doc) => ({...doc.data(), id:doc.id}))));
      };
      getUser();
    },[]);

    async function deleteUser(id){
      const userDoc = doc(db, "user", id);
      await deleteDoc(userDoc);
    }

    return (
      <div>
        <input 
          type="text"
          placeholder="Nome..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text" 
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={criarUser}>Criar usuario</button>
        <ul>
          {user.map(user => {
            return(
              <div key={user.id}>
                <li>{user.name}</li>
                <li>{user.email}</li>
              </div>

            )
          })}
        </ul>
      </div>
    );
};

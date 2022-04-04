import { getAuth } from "firebase/auth";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { app, databaseApp } from "./services/firebaseConfig";
import { useState } from "react";
import "./global.css";

const auth = getAuth(app);

export const App = () => {
  const [user] = useAuthState(auth);
  return (
    <div>
      <header></header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
};

export const ChatRoom = () => {
  const messagesRef = collection(databaseApp, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(q, { idField: "id" });

  const [formValue, setFormValue] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    const { photoURL, uid } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
    });
  };

  return (
    <>
      <div>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
};

export const ChatMessage = (props) => {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "send" : "received";
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="" />
      <p>{text}</p>
    </div>
  );
};

export const SignIn = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return <button onClick={() => signInWithGoogle()}>logar com Google</button>;
};

export const SignOut = () => {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sair</button>
  );
};

import {
  addDoc,
  serverTimestamp,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
import Message from "../components/Message";

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);
  //mesaj gönderme fonk.
  const sendMessage = async (e) => {
    e.preventDefault();

    //kolleksiyon ref alma
    const messagesCol = collection(db, "messages");

    //koleksiyona yeni döküman ekleme
    await addDoc(messagesCol, {
      text: e.target[0].value.trim(),
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });
    // inputu temizle
    e.target.reset();
  };

  useEffect(() => {
    // abone olunucak kolleksiyonun referansını alma
    const messagesCol = collection(db, "messages");

    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    // onSnapshot anlık olarak kolleksiyondaki  değişimleri izler kolleksiyon her değiştiğinde veridğimmiz fonksiyon ile kolleksiyondaki güncel dökümanlara erişiriz
    const unsub = onSnapshot(q, (snapshot) => {
      // veirlerin geçici tutulduğu dizi
      const tempMsg = [];

      // dökümanları dönme , verilerine erişme
      snapshot.docs.forEach((doc) => tempMsg.push(doc.data()));

      // mesajları state'e aktar
      setMessages(tempMsg);
    });
    //kullanıcı sohbetten ayrılınca veri çekmeyi durdur
    return () => unsub();
  }, []);

  return (
    <div className="chat-page">
      <header>
        <p>kullanıcı ismi</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>

      <main>
        {messages.length > 0 ? (
          messages.map((data, i) => <Message data={data} key={i} />)
        ) : (
          <span className="warn">
            Henüz hiç mesaj gönderilmedi. İlk mesajı siz gönderin.
          </span>
        )}
      </main>

      <form onSubmit={sendMessage}>
        <input placeholder="mesajınızı yazınız..." type="text" required />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;

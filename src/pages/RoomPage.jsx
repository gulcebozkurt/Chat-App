const RoomPage = ({ setIsAuth, setRoom }) => {
  // çıkış yapma
  const logout = () => {
    // yetki state'ini false'a çekme
    setIsAuth(false);

    // localdeki kaydı kaldırma
    localStorage.removeItem("TOKEN");
  };

  // form gönderme
  const handleSubmit = (e) => {
    // sayfa yenilemeyi engelleme
    e.preventDefault();

    // inputtaki değeri alma
    const room = e.target[0].value.trim().toLowerCase();

    // oda ismini state'e aktarma
    setRoom(room);
  };

  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Odası</h1>
      <p>Hangi Odaya Gireceksiniz?</p>

      <input placeholder="ör:frontend" type="text" required />

      <button type="submit">Odaya Gir</button>
      <button onClick={logout} type="button">
        Çıkış Yap
      </button>
    </form>
  );
};

export default RoomPage;

import React, { useEffect, useState } from "react";

const AddUser = ({ onAdd, onUpdate, user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [website, setwebsite] = useState("");

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
      setPhone(user?.phone);
      setUsername(user?.username);
      setwebsite(user?.website);
    }
  }, [user]);


  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (user) {
      onUpdate(user.id, { name, email, phone, username, website });
      setName("");
      setEmail("");
      setPhone("");
      setUsername("");
      setwebsite("");
    } else onAdd(name, email, phone, username, website);
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <h3>{user ? "Edit" : "Add"} User</h3>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          placeholder="website"
          value={website}
          onChange={(e) => setwebsite(e.target.value)}
        />
        <button onSubmit={handleOnSubmit}>{user ? "Update" : "Add"}</button>
        <hr />
      </form>
    </div>
  );
};

export default AddUser;

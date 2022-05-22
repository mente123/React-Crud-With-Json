import React, { useEffect, useState } from "react";
import "./App.css";
import AddUser from "./components/AddUser";
import User from "./components/User";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(await response.json());
    } catch (err) {
      console.log(err);
    }
  };

  const onUpdate = (id, user) => {
    for (const [_, val] of Object.entries(user))
      if (!val) {
        setSelectedUser(null);
        return;
      }

    const idx = users.findIndex((u) => u.id === id);

    setUsers(users.map((u) => (u.id === id ? user : u)));
    setSelectedUser(null);
  };

  const onUserSelect = (user) => setSelectedUser(user);

  const onAdd = async (name, email, username, phone, website) => {
    if (!name || !email || !username || !phone || !website) return;

    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        username: username,
        phone: phone,
        website: website,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setUsers((users) => [...users, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    });
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="App">
      <h3>React Crud Using Jsonplaceholder</h3>

      <br />
      <AddUser onAdd={onAdd} user={selectedUser} onUpdate={onUpdate} />
      <div>
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            onDelete={onDelete}
            onUserSelect={onUserSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

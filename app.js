const express = require("express");
const fs = require("fs");
const app = express();

const data = require("./data.json");

app.use(express.static("client"));
app.get("/users", (req, res) => {
  const list_user = [];
  for (let i = 0; i < data.length; i++) {
    const user = data[i];
    list_user.push({ id: user.id, username: user.username });
  }
  res.json(list_user);
});

app.get("/users/:id", (req, res) => {
  const ID = parseInt(req.params.id);
  let user = null;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === ID) {
      user = data[i];
      break;
    }
  }
  if (user) {
    const userInfo = {
      id: user.id,
      username: user.username,
      date: user.account_created_date,
      photoCount: user.photos.length,
    };
    res.json(userInfo);
  } else {
    res.status(400).json({ error: "User not found" });
  }
});

app.use(express.json());
app.post("/users", (req, res) => {
  const ID = data.length + 1;
  const newUser = req.body;
  newUser.id = ID; 
  const newuser = {
    id: newUser.id,
    username: newUser.username,
    account_created_date: newUser.account_created_date,
    photos: [],
  };
  data.push(newuser);
  fs.writeFile("./data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log("JSON file updated successfully");
      res.status(200).json(newUser);
    }
  });
});
//-------------------------------------------------------
app.get("/photos", (req, res) => {
  const list_photos = [];
  for (let i = 0; i < data.length; i++) {
    const user = data[i];
    for (let j = 0; j < user.photos.length; j++) {
      const photo = user.photos[j];
      list_photos.push({
        id: photo.id,
        topic: photo.topic,
        username: user.username,
      });
    }
  }
  res.json(list_photos);
});

app.get("/photos/:id", (req, res) => {
  const ID = parseInt(req.params.id);
  let photo = null;
  for (let i = 0; i < data.length; i++) {
    const user = data[i];
    for (let j = 0; j < user.photos.length; j++) {
      if (String(user.photos[j].id) === String(ID)) {
        photo = user.photos[j];
        username = user.username;
        break;
      }
    }
  }
  if (photo) {
    const photoInfo = {
      id: photo.id,
      url: photo.url,
      username: username,
      date: photo.date,
      topic: photo.topic,
      comments: photo.comments,
    };
    res.json(photoInfo);
  } else {
    res.status(400).json({ error: "Photo not found" });
  }
});

app.use(express.json());
app.post("/photos", (req, res) => {
  let maxID = 0;
  data.forEach((user) => {
    user.photos.forEach((photo) => {
      if (photo.id > maxID) {
        maxID = photo.id;
      }
    });
  });
  const ID = maxID + 1;
  const newPhoto = req.body;
  const username = newPhoto.username;
  newPhoto.id = ID; 
  const newphoto = {
    id: newPhoto.id,
    url: newPhoto.url,
    date: newPhoto.date,
    topic: newPhoto.topic,
    comments: newPhoto.comments,
  };
  data.forEach((user) => {
    if (user.username === username) {
      console.log(newphoto)
      user.photos.push(newphoto);
    }
  });
  fs.writeFile("./data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log("JSON file updated successfully");
      res.status(200).json(newPhoto);
    }
  });
});
module.exports = app;
function load() {
  fetch("http://localhost:3000/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok :${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const hiddenCols = document.getElementsByClassName("hiddencol");
      for (let i = 0; i < hiddenCols.length; i++) {
        hiddenCols[i].style.display = "none";
      }
      var out = "";
      for (var i = 0; i < data.length; i++) {
        out +=
          '<tr><th scope="row">' +
          data[i].id +
          "</th><td>" +
          data[i].username +
          "</td></tr>";
      }
      document.getElementById("username_tb").innerHTML = out;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function load_id() {
  const userid = document.getElementById("username_input").value;
  const URL = `http://localhost:3000/users/${userid}`;
  fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok :${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const hiddenCols = document.getElementsByClassName("hiddencol");
      for (let i = 0; i < hiddenCols.length; i++) {
        hiddenCols[i].style.display = "table-cell";
      }
      var out =
        '<tr><th scope="row">' +
        data.id +
        "</th><td>" +
        data.username +
        "</td><td>" +
        data.date +
        "</td><td>" +
        data.photoCount +
        "</td></tr>";
      document.getElementById("username_tb").innerHTML = out;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      alert("User not found")
    });
}

function getCurrentDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  return dd + "/" + mm + "/" + yyyy;
}

function add_user() {
  const username = document.getElementById("add").value;
  const accountCreatedDate = getCurrentDate();
  const userData = {
    username: username,
    account_created_date: accountCreatedDate,
  };
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("New user added:", data);
      const table = document.getElementById("username_tb");
      const newUserRow = table.insertRow();
      newUserRow.innerHTML =
        '<tr><th scope="row">' + data.id + "</th><td>" + data.username + "</td></tr>";
    })
    .catch((error) => {
      console.error("Add user error:", error);
    });
}
//——--------------——————————————————————————————————————
function load_photos() {
  fetch("http://localhost:3000/photos")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok :${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("photo_list").style.display = "table";
      document.getElementById("details").style.display = "none";
      var out = "";
      for (var i = 0; i < data.length; i++) {
        out +=
          '<tr onclick="load_photos_id(' +
          data[i].id +
          ')"><th scope="row">' +
          data[i].id +
          "</th><td>" +
          data[i].username +
          "</td><td>" +
          data[i].topic +
          "</td></tr>";
      }
      document.getElementById("photo_tb").innerHTML = out;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function load_photos_id(id) {
  const URL = `http://localhost:3000/photos/${id}`;
  fetch(URL)
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          alert("The user did not upload any photo");
        } else {
          throw new Error(`Network response was not ok :${response.status}`);
        }
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("photo_list").style.display = "none";
      document.getElementById("details").style.display = "inline";
      var out =
        '<div class="col"><img src="' +
        data.url +
        '" alt="' +
        data.topic +
        '"></div><div class="col"><p class="fs-4">' +
        data.topic +
        '</p><p class="fs-5">' +
        data.username +
        '</p><p class="fs-5">' +
        data.date +
        '</p><p class="fs-6">' +
        data.comments +
        "</p></div>";
      document.getElementById("photo_row").innerHTML = out;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function add_photos() {
  const username = document.getElementById("add_username").value;
  const topic = document.getElementById("add_topic").value;
  const date = document.getElementById("add_date").value;
  const url = document.getElementById("add_url").value;
  const comments = document.getElementById("add_comments").value;
  console.log(username)
  if (username === "dropdown_value") {
    alert("Please choose a username.");
    return;
  }
  const photoInfo = {
    username: username,
    url: url,
    date: date,
    topic: topic,
    comments: comments,
  };
  console.log(photoInfo)
  fetch("http://localhost:3000/photos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(photoInfo),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("New photo added");
      alert("New photo added");
    })
    .catch((error) => {
      console.error("Add photo error:", error);
    });
}

function dropdown() {
  fetch("http://localhost:3000/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok :${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const menu = document.getElementsByClassName("dropdown-menu")[0];
      const button = document.getElementById("add_username");
      const currentuser = menu.textContent
      data.forEach((user) => {
        if (!currentuser.includes(user.username)) { 
        const out = '<li><a class="dropdown-item">' + user.username + "</a></li>";
        menu.innerHTML += out;
        }
      });
      
      const items = document.getElementsByClassName("dropdown-item");
      for (let i = 0; i < items.length; i++) {
        items[i].addEventListener("click", function(event) {
          const username = event.target.textContent;
          button.textContent = username;
          button.value = username;
          console.log(button.value)
        });
      }
    })
    .catch((error) => {
      console.error("Add photo error:", error);
    });
}


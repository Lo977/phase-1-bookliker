document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/books")
    .then((res) => res.json())
    .then((booksdata) =>
      booksdata.forEach((book) => {
        const li = document.createElement("li");
        li.textContent = book.title;
        document.querySelector("#list").appendChild(li);
        li.addEventListener("click", () => renderBooks(book));
      })
    );

  function renderBooks(book) {
    const panelDisplay = document.querySelector("#show-panel");
    panelDisplay.innerHTML = "";
    const card = document.createElement("ol");
    card.innerHTML = `
        <img src="${book.img_url}">
        <h4>${book.title}</h4>
        <h5>${book.subtitle}</h5>
        <h5>${book.author}</h5>
        <p>${book.description}</p>
        <ul></ul>
        <button></button>
        `;
    let btn = card.querySelector("button");
    let userList = card.querySelector("ul");
    book.users.forEach((user) => {
      const userLi = document.createElement("li");
      userLi.textContent = user.username;
      userList.appendChild(userLi);
    });

    let myObj = {
      id: 11,
      username: "buddha",
    };
    if (book.users.find((user) => user.id === myObj.id)) {
      btn.textContent = "UNLIKE 👎";

      btn.addEventListener("click", () => {
        book.users.pop(myObj);
        updateLikes(book);
      });
    } else {
      btn.textContent = "LIKE 👍";
      btn.addEventListener("click", () => {
        book.users.push(myObj);
        updateLikes(book);
      });
    }
    panelDisplay.append(card, userList, btn);
  }
  function updateLikes(book) {
    fetch(`http://localhost:3000/books/${book.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ users: book.users }),
    })
      .then((res) => res.json())
      .then((updateData) => renderBooks(updateData));
  }
});

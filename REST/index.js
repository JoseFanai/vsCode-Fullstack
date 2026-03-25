const express = require('express');
const fs = require('fs');
const app = express();
const users = require("./mockdata.json");
const port = 3000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/restapi')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
});
const userModel = mongoose.model('User', schema);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/html/users", (req, res) => {
    let html = `<ol>
     ${users.map(user => `<li> ${user.first_name} <br> ${user.ip_address} </li>`).join('')}
        </ol>`;
    return res.send(html);
});

app.get("/users", (req, res) => {
    return res.json(users);
});

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id === parseInt(id));
    if (user && user.id === parseInt(id)) {
        return res.json(user);
    }
    return res.json({ message: "user not found" });
});

app.post("/rest/users", (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("mockdata.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.log(err);
            return res.json({ message: "error saving user" });
        }
        return res.json({ message: "user created successfully" });
    });
});

app.patch("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const body = req.body;
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ message: "user not found" });
    }

    users[userIndex] = { ...users[userIndex], ...body };

    fs.writeFile("mockdata.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "error updating user" });
        }
        return res.json({ message: "user updated successfully", user: users[userIndex] });
    });
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
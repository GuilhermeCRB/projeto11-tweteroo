import express, { json } from "express";
import cors from "cors";

console.log("Aplicação está on");

const app = express();
app.listen(5000);
app.use(cors()); app.use(json());

let user = { username: "", avatar: "" };
let tweet = { username: "", avatar: "" };

const usersArray = [];
const tweetsArray = [];

app.post("/sign-up", (req, res) => {
    const body = req.body;
    user = { ...user, username: body.username, avatar: body.avatar };

    usersArray.unshift(user);
    console.log(usersArray);
    res.send("OK");
});

app.get("/tweets", (req, res) => {
    if (tweetsArray.length <= 10) {
        res.send(tweetsArray);
    } else {
        const tweetsToSend = tweetsArray.filter((tweet, index) => index <= 10);
        res.send(tweetsToSend);
    }
    console.log(tweetsToSend);
});


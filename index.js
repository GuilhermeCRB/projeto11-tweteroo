import express, { json } from "express";
import cors from "cors";

console.log("Aplicação está on");

const app = express();
app.listen(5000);
app.use(cors()); app.use(json());

let user = { username: "", avatar: "" };
let tweet = { username: "", avatar: "", tweet: "" };

const usersArray = [];
const tweetsArray = [];

app.post("/sign-up", (req, res) => {
    const body = req.body;
    user = { ...user, username: body.username, avatar: body.avatar };

    usersArray.unshift(user);
    console.log(usersArray);
    res.send("OK");
});

app.post("/tweets", (req, res) => {
    const body = req.body;
    const tweetUser = usersArray.filter(userFromArray => userFromArray.username === body.username);
    console.log(usersArray);
    console.log(tweetUser);
    tweet = { ...tweet, username: body.username, avatar: tweetUser[0].avatar, tweet: body.tweet };

    tweetsArray.unshift(tweet);
    console.log(tweetsArray);
    res.send("OK");
});

app.get("/tweets", (req, res) => {
    if (tweetsArray.length <= 10) {
        res.send(tweetsArray);
    } else {
        const tweetsToSend = tweetsArray.filter((tweet, index) => index <= 9);
        res.send(tweetsToSend);
        console.log(tweetsToSend);
    }
});


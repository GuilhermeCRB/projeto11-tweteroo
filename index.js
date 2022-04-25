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
    verifyBlank(Object.values(user),res);

    usersArray.unshift(user);
    res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
    const body = req.body;
    verifyBlank(Object.values(body),res);
    
    const tweetUser = usersArray.filter(userFromArray => userFromArray.username === req.headers.user);
    tweet = { ...tweet, username: req.headers.user, avatar: tweetUser[0].avatar, tweet: body.tweet };
    
    tweetsArray.unshift(tweet);
    res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
    if (tweetsArray.length <= 10) {
        res.status(200).send(tweetsArray);
    } else {
        const tweetsToSend = tweetsArray.filter((tweet, index) => index <= 9);
        res.status(200).send(tweetsToSend);
    }
});

function verifyBlank(array,res){
    array.forEach(isFilled => {
        if(isFilled === ""){
            res.status(400).send("Todos os campos são obrigatórios!");
        }
    });
}
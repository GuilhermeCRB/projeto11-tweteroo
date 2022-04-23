import express,{json} from "express";
import cors from "cors";

console.log("Aplicação está on");

const app = express();
app.listen(5000);
app.use(cors()); app.use(json());

let user = {username: "", avatar: ""};
let tweet = {	username: "", avatar: ""};

let usersArray = [];
let tweetsArray = [];

app.post("/sign-up", (req, res) =>{
    const body = req.body;
    user = {...user, username: body.username, avatar: body.avatar};

    usersArray.push(user);
    console.log(usersArray);
    res.send("OK");
});


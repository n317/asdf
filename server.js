const {MongoClient} = require("mongodb")
const express = require("express")
let db
//production
const path = require('path');

const PORT = process.env.PORT || 8080

const app = express();
app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//production


//const app = express()
app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.static("public"))

function passwordProtected(req, res, next) {
    res.set("WWW-Authenticate", "Basic realm = 'Our MERN App'")
    if (req.headers.authorization == "Basic YWRtaW46YWRtaW4=") {
        next()
    } else {
        console.log(req.headers.authorization)
        res.status(401).send("Try again")
    }

}

app.get("/", async (req, res) => {
    const allAnimals = await db.collection("animals").find().toArray()
    console.log(allAnimals)
    res.render("home", { allAnimals })
})

app.use(passwordProtected)

app.get("/admin", (req,res) => {
    //res.send("This is the top secret admin page")
    res.render("admin")
})

app.get("/api/animals", async (req, res) => {
    const allAnimals = await db.collection("animals").find().toArray()
    res.json(allAnimals)
})

async function start() {
    const client = new MongoClient("mongodb+srv://n31751740:7Iwgndprcd4JbOSG@cluster0.jbxun29.mongodb.net/AmazingMernApp?retryWrites=true&w=majority")
    await client.connect()
    db = client.db()
    //app.listen(3000)
    app.listen(PORT); //production

}
start()

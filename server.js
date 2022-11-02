const {MongoClient} = require("mongodb")
const express = require("express")
let db

const app = express()
app.set("view engine", "ejs")
app.set("views", "./views")

app.get("/", async (req, res) => {
    const allAnimals = await db.collection("animals").find().toArray()
    res.send(`<h1>Welcome to the homepage</h1> ${allAnimals.map(animal => `<p>${animal.name} - ${animal.species}</p>`).join('')}`)
})

app.get("/admin", (req,res) => {
    res.send("this is the admin")
})

async function start() {
    const client = new MongoClient("mongodb+srv://n31751740:1oK8a9PnWanyKIkO@cluster0.jbxun29.mongodb.net/AmazingMernApp?retryWrites=true&w=majority")
    await client.connect()
    db = client.db()
    app.listen(3000)
}
start()

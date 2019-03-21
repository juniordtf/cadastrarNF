const MongoClient = require("mongodb").MongoClient
const url = "mongodb://127.0.0.1:3001/meteor"
const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const ObjectId = require("mongodb").ObjectId

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

MongoClient.connect(url, (err, client) => {
    if(err){
        return console.log(err);
    }

    db = client.db("meteor")

    app.listen(4321, () => {
        console.log("escutando em localhost:4321")
    })

    app.get("/", (req, res) => {
        res.send("Hello Cotemig")
    })

    app.post("/notafiscal", (req,res) => {
        console.log(req.body)

        db.collection("notafiscal").save(req.body, (err, result) => {
            if(err){
                res.send(err)
            }

            res.send(req.body)
        })
    })

    app.get("/notafiscal", (req, res) => {
        db.collection("notafiscal").find().toArray((err, results) => {
            if(err){
                res.send(err)
            }

            res.send(results)
        })
    })

    app.get("/notafiscal/:id", (req, res) => {
        
        let id = new ObjecttId(req.params.id);

        db.collection("notafiscal").findOne({_id:id}, (err, result) => {

            if(err){
                res.send(err)
            }

            res.send(result)
        })
    })

    app.put("/notafiscal/:id", (req, res) => {
        
        let id = new ObjecttId(req.params.id);

        db.collection("notafiscal").updateOne({_id:id }, { 
            $set: {
                nome:req.body.nome
            }
        }, (err, result) => {

            if(err){
                res.send(err)
            }

            res.send(result)
        })

    })



})
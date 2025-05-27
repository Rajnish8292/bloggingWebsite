const express = require("express")
const path = require("path")
const app = express()
const multer = require("multer")
const { v4: uuidv4 } = require('uuid');
const mongodb = require("mongodb")
const PORT = 3000
const uri = "mongodb+srv://<username>:<password>@cluster0.jjilfpg.mongodb.net/?retryWrites=true&w=majority";
app.use("/public", express.static("app/public/"))
app.use(express.static("app/src/"))
app.use(express.json())
app.use(express.urlencoded({
    extended: true,
    limit: 1000000

}));


app.listen(PORT, (err) => {
    if(err)
    {
        console.log("can't able to listen at port", PORT)
    } else {
        console.log("listening at port", PORT)
    }
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname, "app/public/uploads/"))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) //Appending extension
    }
  });


  const upload = multer({ storage: storage });

app.get("/", (req, res) => {
    res.sendFile("home.html", {root: path.join(__dirname, "app/page/")})
})

app.get("/create", (req, res) => {
    res.sendFile("editior.html", {root: path.join(__dirname, "app/page/")})
})

app.get("/blog/:id", (req, res) => {
    res.sendFile("blog.html", {root: path.join(__dirname, "app/page/")})
})


app.post("/upload", upload.single("file"), async (req, res, next) => {

    const client = new mongodb.MongoClient(uri);


    try {
        const db = client.db("people");
        const collection = db.collection("blog");


        const result = await collection.insertOne({
            title: req.body.title,
            article: req.body.article,
            image_name: req.body.image_name,
            date: req.body.date
        })

        res.send({
            status: 200, 
            id: result.insertedId
        })
    } catch(err)
    {
        res.send({
            status: 404, 
            id: null
        })
    } finally {
        client.close()
    }
})


app.get('/get-blog', async (req, res) => {
   
    const client = new mongodb.MongoClient(uri);
    let data = []

    try {
        await client.connect()
        const db = client.db("people")
        const collection = db.collection("blog")
        const cursor = collection.find({})
        // console.log(1)
        for await(const doc of cursor)
        {
            data.push(doc)
        }
    } catch(err)
    {
        
    } finally {
        client.close()
    }
    // console.log(data)
    res.send(JSON.stringify({status: 200, data : data}))
})


app.post("/get-blog-data", async (req, res) => {
    const id = req.body.id
    const client = new mongodb.MongoClient(uri)

    try {
        const db = client.db('people')
        const collection = db.collection('blog')
        const objectId = new mongodb.ObjectId(id);
        const result = await collection.findOne({_id:objectId})
        console.log(result)
        res.send(JSON.stringify({status: 200, data: result}))
    } catch (err) {
        res.send(JSON.stringify({status: 404, data: null}))
    } finally {
        client.close()
    }
})
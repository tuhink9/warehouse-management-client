const express = require("express");
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.01i8p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    await client.connect();
    const booksCollection = client.db('himashraybb').collection('allBooks');
    try{
        app.get('/items', async(req, res)=>{
            const query = {};
            const cursor = booksCollection.find(query);
            const books = await cursor.toArray();
            res.send(books)
        })
        app.get('/items/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await serviceCollection.findOne(query);
            res.send(result);
        })
        app.post('/item', async(req, res)=>{
            const newItem = req.body;
            const books = await booksCollection.insertOne(newItem);
            res.send({books: req.body})
        })
    }
    finally{

    }
}
run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send('server is running and working in the right way!');
})

app.listen(port, ()=>{
    console.log('server is running', port);
})
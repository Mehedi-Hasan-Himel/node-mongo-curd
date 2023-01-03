const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require('mongodb').ObjectId
const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

// user: dbuser1
// pass: vigP8GwlydQWZVT5

const uri =
  "mongodb+srv://dbuser1:vigP8GwlydQWZVT5@cluster0.rky6sdd.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const userCollection = client.db("foodExpress").collection("user");

    // get users
    app.get('/user', async(req, res) => {
      const query = {}
      const cursor = userCollection.find(query)
      const users = await cursor.toArray()
      res.send(users)
    })

    // 
    app.get(`/user/:id`, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await userCollection.findOne(query)
      res.send(result)
    })

    // POST User : Add a new user.
    app.post("/user", async(req, res) => {
      const newUser = req.body;
      console.log("adding new user", newUser);
      const result =  await userCollection.insertOne(newUser)
      res.send(result);
    });

    // delete a user
    app.delete('/user/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query) 
      res.send(result)
    })

  } finally {
    // await client.close()
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("running my node curd server");
});

app.listen(port, () => {
  console.log("CURD Server is running");
});

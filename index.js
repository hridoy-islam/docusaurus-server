require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0krr4ca.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("doctorsportal");
    const userCollection = db.collection("users"); 

    app.post("/user", async (req, res) => {
      const user = req.body;

      const userData = await userCollection.findOne({email: user.email})

      if(!userData?.uid){
        const result = await userCollection.insertOne(user);
        res.send( {msg : 'Successfully Inserted To Database'});
      }
      else {
        res.send({msg: 'User Already Exits'})
      }

    });
 
  } finally {
  }
};


run().catch((err) => console.log(err));
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
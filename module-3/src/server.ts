import { MongoClient, ServerApiVersion } from "mongodb";
import app from "./app";
import { client } from "./config/mongoDB";

let server;
const port = 5000;



const bootstrap = async () => {
    await client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


    // console.log('collection', collection);
    server = app.listen(port, () => {
        console.log(`My server is running on ${port}`);
    });
};

bootstrap();

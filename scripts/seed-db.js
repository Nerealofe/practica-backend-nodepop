import "dotenv/config";
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import { connectToDB } from "../lib/connectMongoose.js";
import Product from "../models/product.js";

const products = [
  { name: "Samsung", price: 700, tags: ["mobile"] },
  { name: "Portátil", price: 500, tags: ["mobile", "work"] },
  { name: "Bicicleta", price: 300, tags: ["lifestyle"] },
  { name: "Coche", price: 3000, tags: ["motor"] },
];

const connection = await connectToDB();

await Product.deleteMany();

await Product.insertMany(products);

await connection.close();

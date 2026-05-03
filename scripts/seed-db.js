import "dotenv/config";
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import { connectToDB } from "../lib/connectMongoose.js";
import Product from "../models/product.js";
import User from "../models/user.js";

const USERS = [
  {
    name: "Silvia",
    email: "silvia@mail.com",
    password: "1234",
  },
  {
    name: "Mario",
    email: "mario@mail.com",
    password: "1234",
  },
  {
    name: "Olivia",
    email: "olivia@mail.com",
    password: "1234",
  },
];

const connection = await connectToDB();
// borrar usuarios y productos
await User.deleteMany();
await Product.deleteMany();

// crear usuario
const users = await User.insertMany(USERS);

const products = [
  { name: "Samsung", price: 700, tags: ["mobile"], owner: users[0]._id },
  {
    name: "Portátil",
    price: 500,
    tags: ["mobile", "work"],
    owner: users[1]._id,
  },
  { name: "Bicicleta", price: 300, tags: ["lifestyle"], owner: users[2]._id },
  { name: "Coche", price: 3000, tags: ["motor"], owner: users[0]._id },
];

// insertar productos
await Product.insertMany(products);

await connection.close();

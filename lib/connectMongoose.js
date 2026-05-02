// Se encarga de conectarse a la base de datos

// importamos mongose
import mongoose from "mongoose";

// conectamos a la base de datos usando la URL del .env si no usa MongoDB local
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

// funciona asincrona para conectar a la base de datos
export async function connectToDB() {
  // intenta conectar usando la URL
  const mongooseInstance = await mongoose.connect(MONGODB_URI, {
    //si no hay DBNAME (nombre de base de datos) en .env usa nodepop
    dbName: process.env.DB_NAME || "nodepop",
  });

  // Si llega aqui
  console.log("Conectado a MongoDB");
  // Devolvemos por si la queremos usar mas adelante
  return mongooseInstance.connection;
}

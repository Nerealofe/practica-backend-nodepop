import mongoose from "mongoose";

// estructura de cada usuario en MongoDB

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

//model = herramienta para crear, buscar, borrar usuarios...
const User = mongoose.model("User", userSchema);

// exportamos el modelo para usarlo en seed-lb, login...
export default User;

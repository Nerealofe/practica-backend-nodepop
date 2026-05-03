import mongoose from "mongoose";
import { type } from "os";
import User from "./user.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
      enum: ["work", "lifestyle", "motor", "mobile"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;

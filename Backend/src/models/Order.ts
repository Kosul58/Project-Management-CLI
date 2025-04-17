import mongoose from "mongoose";

const orderProducts = new mongoose.Schema(
  {
    productid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  items: [],
  total: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Confirmed",
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;

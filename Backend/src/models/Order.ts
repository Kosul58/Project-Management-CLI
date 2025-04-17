import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderid: {
    type: String,
    required: true,
    unique: true,
  },
  userid: {
    type: String,
    required: true,
  },
  items: [
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
    },
  ],
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

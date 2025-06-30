import mongoose from "mongoose"

const deliveryAddressSchema = new mongoose.Schema({
  street: String,
  area: String,
  city: String,
  zipCode: String,
  phone: String
})

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [
      {
        id: String,
        name: String,
        image: String,
        price: Number,
        quantity: Number
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    deliveryAddress: deliveryAddressSchema,
    paymentMethod: {
      type: String,
      enum: ["card", "cash", "wallet"],
      default: "wallet"
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    },
    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "delivered", "cancelled"],
      default: "pending"
    },
    deliveryDate: String,
    deliveryTime: String,
    notes: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
)

const Order = mongoose.model("Order", orderSchema)

export default Order

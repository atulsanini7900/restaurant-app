const { default: mongoose } = require("mongoose");

const ordersModel = new mongoose.Schema({
  user_Id: mongoose.Schema.Types.ObjectId,
  resto_id: mongoose.Schema.Types.ObjectId,
  deleveryBoy_Id: String,
  foodItemIds: String,
  status: String,
  amount: String,
});

export const ordersSchema =
  mongoose.models.orders || mongoose.model("orders", ordersModel);

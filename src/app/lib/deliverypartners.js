const { default: mongoose } = require("mongoose");

const deliveryPartnersModel = new mongoose.Schema({
  name: String,
  contactNo: Number,
  password: String,
  city: String,
  address: String,
});

export const deliveryPartnersSchema =
  mongoose.models.deliverypartners ||
  mongoose.model("deliverypartners", deliveryPartnersModel);

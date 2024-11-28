const { default: mongoose } = require("mongoose");

const userModel = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  city: String,
  address: String,
  contactNo: Number,
});

export const userSchema =
  mongoose.models.users || mongoose.model("users", userModel);

const { default: mongoose } = require("mongoose");

const foodsModel = new mongoose.Schema({
  name: String,
  price: Number,
  img_path: String,
  discription: String,
  resto_id: mongoose.Schema.Types.ObjectId,
});

export const foodSchema =
  mongoose.models.foods || mongoose.model("foods", foodsModel);

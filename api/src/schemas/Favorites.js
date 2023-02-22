const mongoose = require("mongoose");

const favorites = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  products: {
    type: mongoose.Types.ObjectId,
    ref: "Products",
  },
});

module.exports = mongoose.model("Favorites", favorites);

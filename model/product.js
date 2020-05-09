const mongoose = require("mongoose");
const _ = require("lodash");
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: false,
    },
    categoryId: { type: mongoose.ObjectId, ref: "Category", required: true }
    ,
    tags: [String],
    image: {
      type: String,
    },
    paymentType:{
      type:String,
      required:false
    },
    userId: { type: mongoose.ObjectId, ref: "User", required: true }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc) => {
        return _.pick(doc, [
          "name",
          "id",
          "price",
          "discount",
          "userId",
          "description",
          "categoryId",
          "tags",
          "image",
          "paymentType"
        ]);
      },
    },
  }
);

const Product = mongoose.model("Product", schema);

module.exports = Product
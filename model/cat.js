const mongoose = require("mongoose");
const _ = require("lodash");
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc) => {
            return _.pick(doc, [
                "id",
                "name"
                
            ]);
        },
    },
});

const Category = mongoose.model("Category", schema);

module.exports = Category
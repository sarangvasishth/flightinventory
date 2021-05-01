const slugify = require("slugify");
const moongose = require("mongoose");

const ProductSchema = new moongose.Schema(
  {
    name: {
      type: String,
      // trim: true,
    },
    slug: String,
    type: {
      type: String,
      // required: true,
      // enum: ["snack", "breakfast"],
    },
    cuisine: {
      type: String,
      // required: true,
      // enum: ["Indian", "Chinese", "Italian", "Mediterranean", "Continental"],
    },
    cost: {
      type: Number,
      // required: true,
    },
    inventory: {
      type: Number,
      // required: true,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

ProductSchema.pre("save", function (next) {
  console.log("Slugify ran!!", this.name);
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = moongose.model("product", ProductSchema);

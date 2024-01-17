const mongoose = require("mongoose");

// const uri = "mongodb://127.0.0.1/shop";

const uri =
  "mongodb+srv://manovmandal:qwerty123@cluster0.3d0rfcf.mongodb.net/shop?retryWrites=true&w=majority";

mongoose.connect(uri);

const productSchema = new mongoose.Schema({
  name: String,
  company: String,
  price: Number,
  colors: [String],
  image: String,
  category: String,
  isFeatured: Boolean,
});

const Product = new mongoose.model("Product", productSchema);

const productData = {
  name: "Acer Laptop",
  company: "64c23350e32f4a51b19b9231", // Assuming a valid company ID
  colors: ["#ff0000", "#0000ff", "#ffff00"], // Add your desired colors
  image: "/images/acer-product.png",
  category: "64c2342de32f4a51b19b924e", // Assuming a valid category ID
  isFeatured: false,
  price: 3000, // Set your desired price
};
const main = async () => {
  try {
    //reading data.
    //     const data = await Product.find({ price: { $eq: 999 } });
    //     console.log(data);

    // inserting data.
    //     await Product.insertMany(productData);
    //     const data = await Product.find({ price: { $eq: 3000 } });
    //     console.log(data);

    //updating data.
    //     await Product.findOneAndUpdate(
    //       { name: "Acer Laptop" },
    //       { $set: { price: 2499 } }
    //     );
    //     const data = await Product.find({ price: { $gt: 2000 } });
    //     console.log(data);

    //deleting data
    //     await Product.findOneAndDelete({ name: "Acer Laptop" });

  } catch (error) {
    console.log(error);
  } finally {
    mongoose.connection.close();
  }
};

main();

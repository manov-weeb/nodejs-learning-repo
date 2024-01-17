const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

const productData = {
  name: "New Product",
  company: "64c23350e32f4a51b19b9231", // Assuming a valid company ID
  colors: ["#ff0000", "#0000ff", "#ffff00"], // Add your desired colors
  image: "/images/new-product.png",
  category: "64c2342de32f4a51b19b924e", // Assuming a valid category ID
  isFeatured: false,
  price: 999, // Set your desired price
};

const main = async () => {
  try {
    await client.connect();

    const db = client.db("shop");
    const collection = db.collection("products");

    //inserting a new product. 
    await collection.insertOne(productData);

    //reading data. 
    const data = await collection.find({ price: { $eq: 999 } }).toArray();
    console.log(data);
    return "done!";
  } finally {
    await client.close();
  }
};

main()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });

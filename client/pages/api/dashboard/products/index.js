import { getToken } from "next-auth/jwt";
import Product from "../../../../models/ProductModel";
import db from "../../../../utils/db";

const handler = async (req, res) => {
  const user = await getToken({ req });
  console.log("CHECK", user);
  if (!user || !user.isAdmin) {
    return res.status(401).send("Admin sign in required");
  }
  if (req.method === "GET") {
    return getHandler(req, res);
  } else if (req.method === "POST") {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};
const postHandler = async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    name: "Nike 1",
    slug: "sample-name-" + Math.random(),
    image: "/product-1.webp",
    price: 100,
    category: "Running shoe",
    brand: "Nike",
    countInStock: 99,
    description: "description",
    rating: 0,
    numReviews: 0,
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: "Product created successfully", product });
};

const getHandler = async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
};

export default handler;

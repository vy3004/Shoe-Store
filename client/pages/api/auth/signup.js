import bcryptjs from "bcryptjs";
import User from "../../../models/UserModel";
import db from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const { name, email, password } = req.body;
  if (
    !name ||
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 8
  ) {
    return res.status(200).send({
      message: "Validation error",
    });
  }

  await db.connect();

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    await db.disconnect();
    return res.status(200).send({ message: "Email registered please login!" });
  }

  const newUser = new User({
    name,
    email,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
  });

  const user = await newUser.save();
  await db.disconnect();
  res.status(201).send({
    message: "Created user!",
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
}

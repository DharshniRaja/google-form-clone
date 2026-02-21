const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/googleFormClone")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  gender: String,
  department: String
});

const Form = mongoose.model("Form", formSchema);

// POST - Save form
app.post("/submit", async (req, res) => {
  const newForm = new Form(req.body);
  await newForm.save();
  res.json({ message: "Form Submitted Successfully" });
});

// GET - Get all responses
app.get("/responses", async (req, res) => {
  const data = await Form.find();
  res.json(data);
});

app.listen(5000, () => console.log("Server running on port 5000"));
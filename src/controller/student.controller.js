const express = require("express");
const Student = require("../models/student.model");
const transporter = require("../config/mail");
const router = express.Router();

router.get("", async (req, res) => {
  //console.log(req);
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;

  const offset = (page - 1) * limit;
  /* const query = { age: { $gt: 0 } }; */

  const students = await Student.find().skip(offset).limit(limit).lean().exec();

  /* await transporter.sendMail({
    from: '"Fred Foo2 👻" <foo2@example.com>', // sender address
    to: "bar2@example.com, baz2@example.com", // list of receivers
    subject: "Hello2 ✔", // Subject line
    text: "Hello Sudhir2!", // plain text body
    html: "<b>Hello Sudhir1!</b>", // html body
    attachments: [
      {
        filename: "demo2.txt",
        content: "hello world2!",
      },
    ],
  });
 */
  const totalDocuments = await Student.find().countDocuments();

  const totalPages = Math.ceil(totalDocuments / limit);
  return res.status(200).json({ students, totalPages });
});

router.post("", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ student });
  } catch (err) {
    console.log("Something went wrong");
  }
});
router.get("/gender/:category", async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;

  const offset = (page - 1) * limit;
  const totalDocuments = await Student.find({
    gender: { $eq: req.params.category },
  }).countDocuments();

  const totalPages = Math.ceil(totalDocuments / limit);
  const student = await Student.find({
    gender: { $eq: req.params.category },
  }).sort({ age: 1 });
  console.log(student, totalPages);
  return res.status(201).json({ student, totalPages });
});
router.get("/age/:value", async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;

  const offset = (page - 1) * limit;
  const totalDocuments = await Student.find().countDocuments();

  const totalPages = Math.ceil(totalDocuments / limit);
  const student = await Student.find().sort({ age: req.params.value });
  // console.log(student, totalPages);
  return res.status(201).json({ student, totalPages });
});
router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);

  return res.status(201).json({ student });
});

router.patch("/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.status(201).json({ student });
});
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id)
      .lean()
      .exec();
    res.status(200).json({ student });
  } catch (err) {
    console.log("Something went wrong");
  }
});

module.exports = router;

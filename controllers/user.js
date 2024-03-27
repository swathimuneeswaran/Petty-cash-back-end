const mongoose = require('mongoose')
const bcrypt=require( "bcrypt");
const {User}=require("../models/UserModel")

// const { User}  =require("../models/UserModel.");


const jwt =require("jsonwebtoken");

const nodemailer = require("nodemailer");

// router.use(bodyParser,urlencoded({extended:true}))

exports.addUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(firstname, lastname, email, password)
  if (user) {
    return res.json({ message: "User already exist" });
  }
  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstname,
    lastname,
    email,
    password: hashpassword,
  });
  await newUser.save();
  return res.json({
    status: true,
    message: "Record registered Successfully",
  });
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  let user = await User.findOne({ email });
  console.log(user)
  // res.localStorage.setItem(user)
  if (!user) {
    return res.status(400).send({
      message: "User Does Not Exists",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send({
      message: "Incorrect Password",
    });
  }

  const token = jwt.sign({ firstname: user.firstname }, process.env.KEY, {
    expiresIn: "5hr",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.json({
    _id:user?._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    token: token,
  })
};

exports.forgotPassword =  async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "User does not exist.Please create an Account!!",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "10m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "swathirajan255@gmail.com",
        pass: "ibcz vplj hwqw urvc",
      },
    });

    var mailOptions = {
      from: "swathirajan255@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `https://pettycash-managing-app.netlify.app/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        return res.json({ status: true, message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.resetPassword =  async (req, res) => {
  const token = req.params.token;
  const { password } = req.body;

  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashpassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashpassword });
    return res.json({ status: true, message: "Password Updated Successfully" });
  } catch (error) {
    return res.json("Invalid Token");
  }
};

exports.getAllUsers =  async (req, res) => {
  
  const {id}=req.params
   
    try {
       const fetch=await User.find()
       res.status(200).json(fetch)
      
    } catch (error) {
      return res.json("Unable to fetch users");
    }
  };



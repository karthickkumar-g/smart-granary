const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { z } = require('zod');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

app.post('/api/login', async (req, res) => {
  const { emailOrUsername, password } = req.body;
  console.log("Login attempt:", emailOrUsername);

  try {
    const user = await User.findOne({
      $or: [
        { email: emailOrUsername },
        { username: emailOrUsername }
      ]
    });

    if (!user) {
      return res.status(400).json({ message: 'No user present in this account' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = generateToken(user._id);
    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



app.post('/api/register', async (req, res) => {
  const schema = z.object({
    email: z.string().min(1, "Enter email.").email("Invalid email format."),
    pass: z.string().min(1, "Enter password.").min(4, "Password must be at least 4 characters long."),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 characters long."),
    firstName: z.string().min(3, "First name must be at least 3 characters long."),
    lastName: z.string().optional(),
    device: z.string().min(1,"Enter valid device id.")
  });

  try {
    const data = schema.parse(req.body);
    // console.log(data);
    

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ message: "This email is already taken." });
    }

    const hashedPassword = await bcrypt.hash(data.pass, 10);
    
    const newUser = new User({
      email: data.email,
      password: hashedPassword,
      phoneNumber: data.phoneNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      deviceId:data.device
    });
    // console.log(newUser);
    

    await newUser.save();
    
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.errors || "Registration failed." });
  }
});

app.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending OTP' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'OTP sent successfully', otp });
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

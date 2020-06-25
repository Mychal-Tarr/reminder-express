//calling packages
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const reminderRouter = require("./routes/reminderRoute");
const userRouter = require("./routes/userRoute");
const cors = require("cors");

//variable reassignment
const app = express();
// to connect to the sever command 'npm start'
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  mongo();
  console.log(`Listening on port ${PORT}...`);
});
//middlewear (run before every request hits the route)
app.use(express.json());
app.use(cors());
//routes
app.use("/reminders", reminderRouter);
app.use("/users", userRouter);

app.use(cors());

//connect to the database
const mongo = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_CREDENTIALS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected!");
  } catch (error) {
    console.log(error.message);
  }
};

// Reminder App
// -Build an API using Express
// -Hold our data in MongoDB
//     Reminders
//      - Name
//      - isDone
//     Users
//      - Firstname
//      - Lastname
//      - Email
//       - Password
//        1. Encrypted

// -Create/Read/Update/Delete Reminders
// -Login System/Multiple Users collab on one reminder list

// Packages
// - Express
// - Mongoose
// - Dotenv
// - Bcrypt
// - Nodemon

const User = require("./../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authController = require("./authController");
const { decode } = authController;
const nodemailer = require("nodemailer");

/*******************************
Get all users
*******************************/

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error.message);
  }
};

/*******************************
create new users
*******************************/

exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    //check if user in the database
    const match = await User.exists({ email: email });
    //if already exisits send back 'email already exists
    if (match) {
      res.send("Email already exists");
    } else {
      //else add them to the database
      //encrpyting the password
      const hash = await bcrypt.hash(password, 10);
      //creating new user
      const newUser = await User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hash,
      });
      //create "payload"
      const payload = {
        email: email,
      };
      //sign the token (create)
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      //send back the token to the client

      // //send welcome email
      // "use strict";
      // const nodemailer = require("nodemailer");

      // // async..await is not allowed in global scope, must use a wrapper
      // async function main() {
      //   // Generate test SMTP service account from ethereal.email
      //   // Only needed if you don't have a real mail account for testing
      //   let testAccount = await nodemailer.createTestAccount();

      //   // create reusable transporter object using the default SMTP transport
      //   let transporter = nodemailer.createTransport({
      //     host: "smtp.webfaction.com",
      //     port: 587,
      //     secure: false, // true for 465, false for other ports
      //     auth: {
      //       user: testAccount.user, // generated ethereal user
      //       pass: testAccount.pass, // generated ethereal password
      //     },
      //   });

      //   // send mail with defined transport object
      //   let info = await transporter.sendMail({
      //     from: '"WELCOME 👻" <myketarr@gmail.com>', // sender address
      //     to: "mychaltarr@gmail.com", // list of receivers
      //     subject: "Hello ✔", // Subject line
      //     text: "Hello world?", // plain text body
      //     html: "<b>Hello world?</b>", // html body
      //   });

      //   console.log("Message sent: %s", info.messageId);
      //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      //   // Preview only available when sending through an Ethereal account
      //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      //   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      // }

      main().catch(console.error);
      res.status(200).send({
        sucess: true,
        message: "New User Created",
        data: {
          token: token,
        },
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

/*******************************
login user
*******************************/
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user exists in the database
    const doesExist = await User.exists({ email: email });
    // if they do exist
    if (doesExist) {
      //grab them from the database
      const user = await User.find({ email: email });
      //compare the passwords
      const match = await bcrypt.compare(password, user[0].password);
      //if the pw match, send back 'logged in'. else send back 'credentials do not match'
      if (match) {
        const payload = {
          email: email,
        };
        //sign the token (create)
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(200).send({
          success: true,
          login: true,
          data: {
            token: token,
          },
        });
      } else {
        res.send("Credentials do not match");
      }
    } else {
      res.send("Please create an account");
    }
  } catch (error) {
    console.log(error.message);
  }
};

/*******************************
update user
*******************************/
exports.updateUser = async (req, res) => {
  try {
    const email = await decode(req.headers);
    const { firstname, lastname } = req.body;
    const user = await User.updateOne(
      { email: email },
      { lastname: lastname, firstname: firstname }
    );
    res.status(200).send({
      success: true,
      message: "Account updated",
    });
  } catch (error) {
    console.log(error.message);
  }
}; /*******************************
update email
*******************************/
exports.updateUserEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.updateOne({ email: email }, { email: email });
    res.status(200).send({
      success: true,
      message: "Email updated",
    });
  } catch (error) {
    console.log(error.message);
  }
};
/*******************************
Create new password
*******************************/

/*******************************
delete user
*******************************/
exports.deleteUser = async (req, res) => {
  try {
    const email = await decode(req.headers);
    const user = await User.deleteOne({ email: email }, { email: email });
    res.status(200).send({
      success: true,
      message: "account deleted",
    });
  } catch (error) {
    console.log(error.message);
  }
};

/*******************************
Get one User
*******************************/
exports.oneUser = async (req, res) => {
  try {
    const email = await decode(req.headers);

    const user = await User.find({ email: email });
    res.status(200).send({
      sucess: true,
      user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

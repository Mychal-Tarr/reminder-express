const Reminder = require("./../models/reminderModel");
const jwt = require('jsonwebtoken')
const authController = require('./authController')
const {decode} = authController

//read
exports.getReminders = async (req, res) => {
  try {
    console.log(req.headers.authorization)
    // const {authorization} = req.headers
    // const token = authorization.split(' ')[1]
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const email = await decode(req.headers)
    const reminders = await Reminder.find({isDone: false, email: email});
    res.status(200).send({
        success: true,
        data: reminders
    })

  } catch (error) {
    console.log(error.message);
  }
};

//Create a new reminder (create)
exports.createReminder = async (req, res) => {
  try {
    const email = await decode(req.headers)
    const {title} =req.body
    const newReminder = await Reminder.create({
      title: title,
      isDone: false,
      email: email
    });
    res.status(200).send({
        success: true,
        message: 'New Reminder Created'
    })
  } catch (error) {
    console.log(error.message);
  }
};

//update a reminder (UPDATE)
exports.updateReminder = async (req, res) => {
  try {
    const reminder = await Reminder.updateOne(
      { _id: req.body.id },
      { isDone: req.body.isDone }
    );
    res.status(200).send({
      success: true
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.deleteOne({ _id: req.body.id });
    res.status(200).send({
      success: true
    });
  } catch (error) {
    console.log(error.message);
  }
};


//get completed reminders

exports.getCompletedReminders = async (req,res) => {
  try {
    const email = await decode(req.headers)
    const data = await Reminder.find({isDone: true, email})
    res.status(200).send({
      sucess:true,
      data
    })
  } catch (error) {
    console.log(error)
  }
}
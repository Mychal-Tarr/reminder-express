const express = require('express')
const reminderController = require('./../controllers/reminderController')


const router = express.Router()
const { getReminders, createReminder, updateReminder, deleteReminder, getCompletedReminders } = reminderController


// router.get('/', getReminders)

// router.post('/', createReminder)

// router.patch('/',updateReminder)

// router.delete('/',deleteReminder)

//Refactoring 

router.route('/completedReminders').get(getCompletedReminders)
router.route('/').get(getReminders).post(createReminder).patch(updateReminder).delete(deleteReminder)


module.exports = router
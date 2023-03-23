import dbConnect from '../../../../lib/dbConnect'
import Questions from '../../../../models/questionModel'
import Story from '../../../../models/storyModel'
import { sendMailFnx } from '../sendMailFnx'

const getFirstQuestion = async (req, res) => {
  try {
    await dbConnect()
    const { _id, planType, bookReceiver } = req.body
    const questions = await Questions.find({
      published: true,
      QuestionType: { $in: [planType.toLowerCase(), 'both'] },
    })
    const currentStories = await Story.find({ user_id: _id })
    let i = 0
    i = Math.floor(Math.random() * questions.length)
    if (currentStories.length === 0) {
      await Story.create({
        user_id: _id,
        question_id: questions[i]._id,
      })

      //send onboarding email
      if (bookReceiver === 'gift') {
        await sendGiftScheduleEmail(req.body, questions[i].question)
      } else {
        await sendOnboardingEmail(req.body, questions[i].question)
      }
      return res.status(200).json({ message: 'Email successfully sent!' })
    } else {
      return res.status(500).json({ message: 'First question already added' })
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error'
    return res.status(500).json({ message: errorMessage, err })
  }
}

const sendOnboardingEmail = async (user, question) => {
  //Email Parameters
  //params { subject, template, param, to }
  const subject = 'Ready to get started, ' + user.firstname + '?'
  const params = {
    name: user.firstname.ToCapitalize(),
    totalQuestions: user.planType === 'Classic' ? 100 : 500,
  }
  const template = user.planType + '/onboarding-1.html'

  const emailConfig = {
    subject: subject,
    template: template,
    param: params,
    to: user.email,
  }
  // Send the email
  sendMailFnx(emailConfig)
  sendFirstQuestion(user, question)
}
//Note by Jonah: need to test this function
const sendGiftScheduleEmail = async (user, question) => {
  // Set the date and time you want the email to be sent
  const scheduledDate = new Date(user.giftDate)
  // Calculate the number of milliseconds until the scheduled date and time
  const timeUntilScheduled = scheduledDate.getTime() - Date.now()
  //params { subject, template, param, to }
  const subject = user.firstname + ", Here's your gift!"
  const params = {
    name: capitalizeFirstLetter(user.firstname),
    totalQuestions: user.planType === 'Classic' ? 100 : 500,
    occasion: user.giftOccasion,
    salutation: user.giftSalutation,
    token: user.token,
    sender: user.giftSender,
    message: user.giftMessage,
  }

  const template = 'Both/onboarding-1-gift.html'

  const emailConfig = {
    subject: subject,
    template: template,
    param: params,
    to: user.email,
  }
  // Delay the email sending until the scheduled date and time
  setTimeout(() => {
    // Send the email
    sendMailFnx(emailConfig)
    sendFirstQuestion(user, question)
  }, timeUntilScheduled)
}

const sendFirstQuestion = async (user, question) => {
  //params { subject, template, param, to }
  const subject = user.firstname + ", Here's your first question!"
  const params = {
    name: capitalizeFirstLetter(user.firstname),
    question: question,
  }

  const template = 'Both/onboarding-2.html'

  const emailConfig = {
    subject: subject,
    template: template,
    param: params,
    to: user.email,
  }
  // Send the email
  sendMailFnx(emailConfig)
}

// program to convert first letter of a string to uppercase
const capitalizeFirstLetter = (str) => {
  // converting first letter to uppercase
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1)

  return capitalized
}
export default getFirstQuestion

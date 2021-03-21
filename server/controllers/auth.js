import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// export const signup = (req, res) => {
//   const {name, email, password} = req.body
//   User.findOne({email}).exec((error, user) => {
//     if (user) {
//       return res.status(400).json({
//         error: 'Email уже существует'
//       })
//     }
//   })
//   const newUser = new User({name, email, password})
//   newUser.save((error, success) => {
//      if (error){
//        return res.status(400).json({error})
//      }
//      return res.json({message: 'Регистрация успешна'})
//   })
// }

export const signup = (req, res) => {
  const {name, email, password} = req.body
  User.findOne({email}).exac((err, user) => {
    if (user){
      return res.status(400).json({
        error: 'Email уже существует'
      })
    }
    const token = jwt.sign({name, email, password}, process.env.JWT_ACCOUNT_ACTIVATION, {expiresIn: '10m'})
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Ссылка активации аккаунта`,
      html: `<h1>Перейдите по ссылке для активации аккаунта</h1>
             <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>`
    }
    sgMail.send(emailData).then((sent) => {
      console.log('EMAIL SENT')
      return res.json({
        message: `Письмо отправлено на почту ${email}. Следуйте инструкциям.`
      })
    }).catch((error) => {
      return res.json({
        message: error.message
      })
    })
  })
}












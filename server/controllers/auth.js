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
  User.findOne({email}).exec((err, user) => {
    if (user){
      console.log('Уже существует')
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
      console.log('Письмо отправлено')
      return res.json({
        message: `Письмо отправлено на почту ${email}. Следуйте инструкциям.`
      })
    }).catch((error) => {
      console.log('Ошибка отправки письма', {token})
      return res.json({
        message: error.message
      })
    })
  })
}

export const accountActivation = (req, res) => {
  const {token} = req.body
  if (token){
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (error, decode) => {
      if (error){
        console.log('Ссылка устарела')
        return res.json('401').json({
          error: 'Ссылка устарела.'
        })
      }
      const {name,email,password} = decode
      const user = new User({name, email, password})
      user.save((err, user)=> {
        if (error){
          console.log('Ошибка сохранения')
          return res.status(401).json({
            error: 'Ошибка сохранения пользователя в базе данных'
          })
        }
        console.log('Регистрация успешна')
        return res.json({
          message: 'Регистрация завершена. Пожалуйста, войдите.'
        })
      })
    })
  } else {
    return res.json({
      message: 'Что-то пошло не так, попробуйте снова.'
    })
  }
}

export const signin = (req, res) => {
  const {email, password} = req.body
  User.findOne({email}).exec((error, user) => {
    if(error || !user){
      return res.status(401).json({
        error: 'Пользователя не существует, пожалуйста зарегистрируйтесь.'
      })
    }
    if(!user.authenticate(password)){
      return res.status(401).json({
        error: 'Неверные логин или пароль'
      })
    }
    const {_id, name, email, role } = user
    const token = jwt.sign({_id: user._id, email, name, role}, process.env.JWT_SECRET, {expiresIn: '7d'})
    return res.json({
      token,
      user: {_id, email, name, role}
    })
  })
}












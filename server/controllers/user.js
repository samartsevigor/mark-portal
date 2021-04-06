import User from '../models/user.js'
import dotenv from 'dotenv'
dotenv.config()

export const userInfo = (req, res) => {
  console.log(req.user)
  const id = req.params.id
  User.findById({_id: id}).exec((error, user) => {
    if (error || !user) {
      res.status(400).json({
        error: "user not found"
      })
    }
    user.salt = undefined
    user.hashed_password = undefined
    res.json(user)
  })
}

export const updateUser = (req, res) => {
  const {name, password} = req.body
  User.findById({_id: req.user._id}).exec((error, user) => {
    if (error || !user){
      return res.status(400).json({
        error: 'User не найден'
      })
    }
    if (!name){
      return res.status(400).json({
        error: 'Имя пользователя обязательно'
      })
    } else {user.name = name}
   if (password){
     if (password.length < 6){
       return res.status(400).json({
         error: 'Пароль должен быть не менее 6 символов.'
       })
     }else {user.password = password}
   }
    user.save((error, updatedUser) => {
      if (error){
        return res.status(400).json({
          error: 'Ошибка обновления пользователя'
        })
      }
      updatedUser.salt = undefined
      updatedUser.hashed_password = undefined
      res.json(updatedUser)
    })
  })
}









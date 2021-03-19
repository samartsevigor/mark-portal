import User from '../models/user.js'

export const signup = (req, res) => {
  const {name, email, password} = req.body
  User.findOne({email}).exec((error, user) => {
    if (user) {
      return res.status(400).json({
        error: 'Email уже существует'
      })
    }
  })
  const newUser = new User({name, email, password})
  newUser.save((error, success) => {
     if (error){
       return res.status(400).json({error})
     }
     return res.json({message: 'Регистрация успешна'})
  })
}
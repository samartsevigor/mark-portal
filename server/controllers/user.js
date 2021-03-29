import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const userInfo = (req, res) => {
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
  console.log(req.user)
    res.json({ok: "ok"})
}









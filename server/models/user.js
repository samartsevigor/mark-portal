import mongoose from 'mongoose'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    max: 32
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: {
    type: String
  },
  role: {
    type: String,
    default: 'subscriber'
  },
  resetPasswordLink: {
    data: String,
    default: ''
  },

}, {timestamps: true})

userSchema.virtual('password')
  .set(function (password){
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })


userSchema.methods = {
  authenticate: function (password){
    return this.encryptPassword(password) === this.hashed_password
  },

  encryptPassword: function (password) {
    if(!password) return ''
    try{
      return crypto.createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err){
      return ''
    }
  },

  makeSalt: function (){
    return Math.round(+new Date() * Math.random()) + ''
  }
}

export default mongoose.model('Users', userSchema)
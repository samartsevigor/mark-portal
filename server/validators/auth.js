import validator from 'express-validator'
const { check } = validator

const userSignUpValidator = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
  check('email')
    .isEmail()
    .withMessage('Must be a valid email'),
  check('password')
    .isLength({min: 6})
    .withMessage('password min 6 characters long')
]
export default userSignUpValidator
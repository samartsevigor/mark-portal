import express from 'express'
import {userInfo, updateUser} from "../controllers/user.js"
import {requireAuth} from "../controllers/auth.js"

const router = express.Router()

router.get('/user/:id', requireAuth, userInfo)
router.put('/user/update/:id', requireAuth, updateUser)

export default router
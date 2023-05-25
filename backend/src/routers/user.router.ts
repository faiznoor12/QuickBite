import { Router } from "express"
import { sample_users } from "../data"
import jwt from "jsonwebtoken"
import asynchandler  from "express-async-handler"
import { UserModel } from "../models/user.model"



const router = Router()

router.get('/seed', asynchandler(
    async (req ,res)=>{
     const userCount = await UserModel.countDocuments()
     if (userCount>0){
         res.send("already done")
         return
     }
     await UserModel.create(sample_users)
     res.send('done')
      }
 ) )
 


router.post('/login',asynchandler(
  async  (req,res)=>{
        const {email , password}= req.body
        const user = await UserModel.findOne({email,password})
    
        if(user) {
            res.send(generateTokenResponce(user))
        }else{
            res.status(400).send("User name or password is not valid!")
        }
    }
))

const generateTokenResponce = (user:any)=>{
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin
    },"someRandomText",{
        expiresIn:"30d"
    })
    user.token = token 
    return user
}

export default router
import { Router } from "express"
import { sample_users } from "../data"
import jwt from "jsonwebtoken"
import asynchandler  from "express-async-handler"
import { User, UserModel } from "../models/user.model"
import { HTTP_BAD_REQUEST } from "../constants/http_status"
import bcrypt from 'bcryptjs'



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
  async (req,res:any)=>{
        const {email , password}= req.body
        const user= await UserModel.findOne({email: email})        
        if(!user)return res.status(400).json('user not found')
        const realPass = await bcrypt.compare(password,user.password)
        if(!realPass) return res.status(400).json('password not valid')
        res.send(generateTokenResponce(user))
        
            //    const encryptedPassword = await bcrypt.hash(password,10)
    //     res.send([email,encryptedPassword])
        // const user = await UserModel.findOne({email,password})
        // if(user) {
        //     res.send(generateTokenResponce(user))
        // }else{
        //     res.status(HTTP_BAD_REQUEST).send("User name or password is not valid!")
        // }
    }
))


router.post('/register',asynchandler(
    async  (req,res)=>{
          const {name, email , password ,address}= req.body
          const user = await UserModel.findOne({email})
          if(user) {
              res.status(HTTP_BAD_REQUEST).send("User already exists, please login!")
              return
          }
          const encryptedPassword = await bcrypt.hash(password,10)
          const token = jwt.sign({
            email:email, password:encryptedPassword
        },"someRandomText",{
            expiresIn:"30d"
        })
          const newUser:User={
            id:'',
            name:name,
            email:email.toLowerCase(),
            password:encryptedPassword,
            address:address,
            isAdmin:false,
            token:token
          }
          res.send(newUser)
          const dbUser = await UserModel.create(newUser)
          console.log('newUser,dbUser');
          res.send(generateTokenResponce(dbUser))
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
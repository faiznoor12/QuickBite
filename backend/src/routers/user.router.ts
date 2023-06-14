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
 

// ----------------------idid---------------------
// router.post('/login',asynchandler(
//   async (req,res:any)=>{
//         const {email , password}= req.body
//         const user= await UserModel.findOne({email: email})        
//         if(!user)return res.status(400).json('user not found')
//         const realPass = await bcrypt.compare(password,user.password)
//         if(!realPass) return res.status(400).json('password not valid')
//         res.send(generateTokenResponce(user))
//     }
// ))
// --------------------------------------------------------



router.post("/login", asynchandler(
    async (req, res) => {
      const {email, password} = req.body;
      const user = await UserModel.findOne({email});
    
       if(user && (await bcrypt.compare(password,user.password))) {
        res.send(generateTokenResponce(user));
       }
       else{
         res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
       }
    
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
          const newUser:User={
            id:'',
            name,
            email:email.toLowerCase(),
            password:encryptedPassword,
            address,
            isAdmin:false
          }
        //   res.send(newUser)
          const dbUser = await UserModel.create(newUser)
        //   console.log('newUser,dbUser');
          res.send(generateTokenResponce(dbUser))
      }
  ))

const generateTokenResponce = (user:any)=>{
    const token = jwt.sign({
       id:user.id , email:user.email, isAdmin:user.isAdmin
    },process.env.JWT_SECRET!,{
        expiresIn:"30d"
    })
    
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    }
}

export default router
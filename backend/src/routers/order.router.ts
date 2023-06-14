import { Router, request } from "express";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constants/Order_status";
import auth from "../middlewares/auth.mid"

const router = Router();
router.use(auth)
router.post(
  "/create",
  asyncHandler(async (req:any, res:any) => {
  
    const requestOrder = req.body
    if(requestOrder.items.length<=0){
        res.status(HTTP_BAD_REQUEST).send('Cart is empty');
        return
    }
    await OrderModel.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW
    })
    const newOreder = new OrderModel({...requestOrder,user: req.user.id})
    await newOreder.save()
    res.send(newOreder)
  })
);

export default router
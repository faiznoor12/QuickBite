import { Router } from "express";
import { sampleFood, sample_tags } from "../data";
import asynchandler from "express-async-handler"
import { FoodModel } from "../models/food.model";
const router = Router()

router.get('/seed', asynchandler(
   async (req ,res)=>{
    const foodCount = await FoodModel.countDocuments()
    if (foodCount>0){
        res.send("already done")
        return
    }
    await FoodModel.create(sampleFood)
    res.send('done')
     }
) )

router.get("/",asynchandler(
    async (req, res) => {
      const foods = await FoodModel.find();
        res.send(foods);
    }
  ))

router.get('/search/:searchTerm', asynchandler(
    async (req ,res)=>{
        const searchRegx = new RegExp( req.params.searchTerm,'i')
        const foods = await FoodModel.find({name:{$regex : searchRegx}})
        res.send(foods)
    }
))
router.get('/tags',asynchandler(
    async (req ,res)=>{
        const tags = await FoodModel.aggregate([
            {
                $unwind:'$tags'
            },
            {
                $group:{
                    _id:'$tags',
                    count:{$sum : 1}
                }
            },
            {
                $project:{
                    _id : 0,
                    name: '$_id',
                    count:'$count'
                }
            }
        ]).sort({count : -1})


        const all = {
            name:"All",
            count: await FoodModel.countDocuments()
        }

        tags.unshift(all)
        res.send(tags);
     }
))
router.get('/tag/:tagName',asynchandler(
    async (req ,res)=>{
        const foods = await FoodModel.find({tags:req.params.tagName})
        res.send(foods)
    }
))
router.get('/:foodId',asynchandler(
    async (req ,res)=>{
        const food = await FoodModel.findById(req.params.foodId)
         res.send(food)
     }
))

export default router
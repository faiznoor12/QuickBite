import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  foods!:food[]
   constructor(private foodService:FoodService,private activatedRoute : ActivatedRoute){
    activatedRoute.params.subscribe((params)=>{
      let key = params['searchTerm'];
      if(key)this.foods=this.foodService.getAllFoodBySearchTerm(key)


      else if(params['tags']){
        this.foods=this.foodService.getAllFoodByTags(params['tags'])
        console.log(params['tags'])
      }


      
      else this.foods=this.foodService.getAll()
    })

   }
}

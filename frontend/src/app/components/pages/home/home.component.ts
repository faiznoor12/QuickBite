import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
    let foodObservable:Observable<food[]>
    activatedRoute.params.subscribe((params)=>{
      let key = params['searchTerm'];
      if(key)foodObservable=this.foodService.getAllFoodBySearchTerm(key)


      else if(params['tags']){
        foodObservable=this.foodService.getAllFoodByTags(params['tags'])
        console.log(params['tags'])
      }



      else foodObservable=this.foodService.getAll()


      foodObservable.subscribe(serverFood=>this.foods=serverFood)
    })

   }
}

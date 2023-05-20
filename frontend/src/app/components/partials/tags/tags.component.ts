import { Component } from '@angular/core';
import { Tag } from 'src/app/shared/models/Tag';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  tags?:Tag[]
  constructor(private foodService:FoodService){
    this.foodService.getAllTags().subscribe(serverTags=>this.tags=serverTags )
  }

}

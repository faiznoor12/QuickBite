import { Injectable } from '@angular/core';
import { food } from '../shared/models/food';
import { sampleFood, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}

  getAll(): food[] {
    return sampleFood;
  }
  getAllFoodBySearchTerm(searchTerm: string) {
    return this.getAll().filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  getAllTags(): Tag[] {
    return sample_tags;
  }
  getAllFoodByTags(tag: string): food[] {
    if (tag === 'All') return this.getAll();
    else return this.getAll().filter((food) => food.tags?.includes(tag));
  }
  getFoodById(foodId:string):food{
    return this.getAll().find(food => food.id==foodId) ?? new food()
  }
}

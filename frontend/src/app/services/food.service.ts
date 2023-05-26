import { Injectable } from '@angular/core';
import { food } from '../shared/models/food';
import { sampleFood, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  FOODS_BY_ID_URL,
  FOODS_BY_SEARCH_URL,
  FOODS_BY_TAGS_URL,
  FOODS_TAGS_URL,
  FOODS_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<food[]> {
    console.log(FOODS_URL);

    return this.http.get<food[]>(FOODS_URL)

  }
  getAllFoodBySearchTerm(searchTerm: string) {
    return this.http.get<food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }
  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }
  getAllFoodByTags(tag: string): Observable<food[]> {
    if (tag === 'All') return this.getAll();
    else return this.http.get<food[]>(FOODS_BY_TAGS_URL + tag);
  }
  getFoodById(foodId: string): Observable<food> {
    return this.http.get<food>(FOODS_BY_ID_URL + foodId);
  }
}

import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class VideoApi {
  constructor (
    private http: Http
  ) {}

  all(skip: Number, limit: Number) {
    return this.http.get('/api/v1/companies.json')
      .map((res:Response) => res.json());
  }

  one(id: String) {
  }

  rate(id: String, rating: Number) {
  }
}

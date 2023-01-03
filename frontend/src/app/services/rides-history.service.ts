import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Ride} from "../model/Ride";
import {AuthService} from "./auth.service";

export interface Page {
  content: Ride[];
  totalPages: number;
  size: number;
  totalElements: number;
}

@Injectable({
  providedIn: 'root'
})
export class RidesHistoryService {

  private readonly ridesUrl: string;

  constructor(private http: HttpClient) {
    this.ridesUrl = 'http://localhost:8000/ridesHistory/getRides';
  }

  public getRides(driverEmail = '', customerEmail = '', sortKind = 'start', sortOrder = 'desc', pageNumber = 0, pageSize = 10): Observable<Page> {
    let body = {
      'sortKind': sortKind,
      'sortOrder': sortOrder,
      'driverEmail': driverEmail,
      'customerEmail': customerEmail,
      'pageNumber': pageNumber,
      'pageSize': pageSize
    }
    return this.http.post<Page>(this.ridesUrl, body, AuthService.getHttpOptions());
  }

}
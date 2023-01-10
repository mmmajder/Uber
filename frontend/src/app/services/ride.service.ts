import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {RideCreate} from "../model/RideCreate";
import {Ride} from "../model/Ride";

@Injectable({
  providedIn: 'root'
})
export class RideService {

  private readonly rideUrl: string;

  constructor(private http: HttpClient) {
    this.rideUrl = 'http://localhost:8000/ride';
  }

  public createRide(ride: RideCreate): Observable<Ride> {
    return this.http.post<Ride>(this.rideUrl + "/create", ride, RideService.getHttpOptions());
  }

  public createRouteForSelectedCar(ride: RideCreate, carId: number): Observable<void> {
    return this.http.post<void>(this.rideUrl + "/update-car-route/" + carId, ride, RideService.getHttpOptions());
  }

  public static getHttpOptions() {
    console.log(localStorage.getItem('token'))
    return {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': localStorage.getItem('token') || 'authkey',
      })
    };
  }
}
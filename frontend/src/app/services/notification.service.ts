import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {Car} from "../model/Car";
import {ActiveCarResponse} from "../model/ActiveCarResponse";
import {NotificationDTO} from "../model/NotificationDTO";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly notificationUrl: string;

  constructor(private http: HttpClient) {
    this.notificationUrl = 'http://localhost:8000/notification';
  }

  public getNotifications(customerEmail: string): Observable<NotificationDTO[]> {
    return this.http.get<NotificationDTO[]>(this.notificationUrl + "/" + customerEmail, AuthService.getHttpOptions());
  }

  public getNotificationById(id: number): Observable<NotificationDTO> {
    return this.http.get<NotificationDTO>(this.notificationUrl + "/by-id/" + id, AuthService.getHttpOptions());
  }

  public areNotificationSeen(email: string): Observable<boolean> {
    return this.http.get<boolean>(this.notificationUrl + "/is-opened/" + email, AuthService.getHttpOptions());
  }

  public openNotificationForCustomer(email: string): Observable<void> {
    return this.http.put<void>(this.notificationUrl + "/open/" + email, AuthService.getHttpOptions());
  }
}

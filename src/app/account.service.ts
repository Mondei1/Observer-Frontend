import { Injectable } from '@angular/core';
import * as jwt from 'jsonwebtoken';
import { HttpClient } from '@angular/common/http';
import { SocketService } from './socket.service';

@Injectable()
export class AccountService {

  // Local storage
  public isLoggedIn: boolean;
  public token: string;
  public decodedToken: any;

  // Server settings
  private url: string = "http://localhost:1337";

  constructor(private http: HttpClient) { }

  async requestToken(username: string, password: string): Promise<boolean> {
    try {
      let res: any = await this.http.post(this.url + "/auth", {
        username: username,
        password: password
      }).toPromise();

      this.token = res.token;
      this.isLoggedIn = true;
      this.decodedToken = jwt.decode(this.token);
      return true;
    } catch(err) {
      return false;
    }
    
  }

}

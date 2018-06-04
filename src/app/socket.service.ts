import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { AccountService } from './account.service';

@Injectable()
export class SocketService {

  // Sockets
  private socket: any;

  // Server settings
  private url: string = "http://localhost:1337";

  public data = {
    online_players: [],
    offline_players: [],
    total_players: [],
    sockets: []
  }

  constructor(private account: AccountService) {
    
  }

  setupSocket() {
    this.socket = io(this.url, {
      query: {
        token: this.account.token
      }
    });
    this.socket.on('player join', (data) => {
      this.data.online_players.push(data.user)
      if(this.data.total_players.indexOf(data.user) == -1) this.data.total_players.push(data.user)
    }).on('player leave', (data) => {
      this.data.offline_players.push(data.user)
      this.data.online_players.splice(this.data.online_players.indexOf(data.user), 1)
    }).on('new socket', (data) => {
      this.data.sockets.push(data.socket)
    }).on('data', (data) => this.setData(data))
  }

  setData(data: any) {    
    if(this.account.isLoggedIn) {
      this.data.online_players = data.online_players
      this.data.offline_players = data.offline_players
      this.data.total_players = data.total_players
      this.data.sockets = data.sockets
    }
  }

  sendEmit(event: string, data: any) {
    if(data == null) data = {}
    data.token = this.account.token;

    this.socket.emit(event, data);
  }

  sendBroadcast(message: string) {
    this.sendEmit("broadcast-msg", {
      message: message
    })
  }

  sendShutdown() {
    this.sendEmit("shutdown", null)
  }

  fetchData() {
    this.sendEmit("fetchAll", null)
  }

}

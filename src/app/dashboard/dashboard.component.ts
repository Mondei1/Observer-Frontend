import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  started: number = 0;
  message: string;
  public socket: SocketService;

  constructor(private socketService: SocketService, private account: AccountService) {
    this.socket = socketService;
  }

  ngOnInit() {
    if(this.account.isLoggedIn) {
      this.socket.setupSocket()
      this.socket.fetchData()
    }
  }

  initShutdown() {
    this.socket.sendShutdown()
    this.started = Date.now()
  }

  sendMessage() {
    this.socket.sendBroadcast(this.message);
  }

}

import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';
import { AccountService } from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private socket: SocketService, private account: AccountService) {}
  title = 'app';

  ngOnInit() {
  }
}

import { Component } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { CommonService } from './_services/common.service';
import { SocketService } from './_services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private config:CommonService,
              private socketService:SocketService) { }

  title = 'RedisMonitor';

  ngOnInit(){
    this.socketService.setupSocketConnection();
    this.socketService.socket.on('redis-list', (data:any)=>{
      console.log(data)
    });
  }
  
  ngOnDestroy(){
    this.socketService.disconnect();
  }
}

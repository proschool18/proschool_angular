import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class VirtualboardService {

  private url = 'http://localhost:4005';
  private socket;  

  constructor() { 
    this.socket = io(this.url);
  }

  sendDrawing(data) {
    console.log(data)
    this.socket.emit('drawing', data);
  }

  getDrawing = () => {
    return Observable.create((observer) => {
      this.socket.on('drawing', (data) => {
          observer.next(data);
      });
    });
  }

}

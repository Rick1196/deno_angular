import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../modules/auth/services/auth.service'
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  sessionStatus:any;
  constructor(private _auth:AuthService) { }

  ngOnInit(): void {
    this._auth.$session.subscribe({
      next: (v: any) => {
        this.sessionStatus = v;        
      },
    });
  }

  logout():void{
    this._auth.logout();
  }

}

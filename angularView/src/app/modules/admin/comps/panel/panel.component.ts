import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from '@angular/router'
@Component({
  selector: "app-panel",
  templateUrl: "./panel.component.html",
  styleUrls: ["./panel.component.scss"],
})
export class PanelComponent implements OnInit {
  active:string = 'Dashboard'

  constructor(private _router:ActivatedRoute) {}

  ngOnInit(): void {
    this._router.queryParams.subscribe((params) => {
      this.active = params.active;
    });
  }
}

import { Component, OnInit, Input } from "@angular/core";
import { Person } from "../../entities/person";

@Component({
  selector: "app-person-card",
  templateUrl: "./person-card.component.html",
  styleUrls: ["./person-card.component.scss"],
})
export class PersonCardComponent implements OnInit {
  @Input()
  person: Person; 
  personToBeUpdate:Person;
  constructor() {}

  ngOnInit(): void {
  }
}

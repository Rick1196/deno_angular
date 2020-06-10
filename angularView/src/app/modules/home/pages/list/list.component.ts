import { Component, OnInit } from "@angular/core";
import { Person } from "../../entities/person";
import { PersonService } from "../../services/person.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  persons: Person[] = [];
  persons$: Observable<Person[]>;
  constructor(private _person: PersonService) {
    _person.getAllPersons().catch((error) => console.error(error));
  }

  ngOnInit(): void {
    this._person.$persons.subscribe({
      next: (v: any) => {
        this.persons = v;
        console.log(v);
        
      },
    });
  }
}

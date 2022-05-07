import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-managent-user',
  templateUrl: './managent-user.component.html',
  styleUrls: ['./managent-user.component.scss']
})
export class ManagentUserComponent implements OnInit {

  listDemo = [];
  demo;
  constructor() { }

  ngOnInit(): void {
  }

}

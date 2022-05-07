import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private matDilog: MatDialog
    ) { }

  ngOnInit() {
  }

  openTest(){
    this.matDilog.open(LoginComponent, {
      width: '450px'
    })
  }
}

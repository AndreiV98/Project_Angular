import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service';
import {User} from '../User';


@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {
  users: any ;

  constructor(private _usersService: UsersService) { }

  getUsers() {
    this._usersService.getUsers().subscribe(
      users => this.users = users
    );
  }

  ngOnInit(): void {
    this.getUsers();
  }

}

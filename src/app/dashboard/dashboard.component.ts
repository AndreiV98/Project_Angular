import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userForm!: FormGroup;
  listData: any;

  constructor(private fb:FormBuilder) {
      this.listData = [];

      this.userForm = this.fb.group ({
        name: ['', Validators.required],
        email: ['', Validators.required],
        organization: ['', Validators.required],
      })
   }

  public addPerson() : void {
    this.listData.push(this.userForm.value);
    this.userForm.reset();
  }

  reset() {
    this.userForm.reset();
  }

  remove(element: any) {
    this.listData.forEach((value: any, index: any)=> {
      if (value == element) {
        this.listData.splice(index, 1);
      }
    });
  }

  ngOnInit(): void {
  }

}

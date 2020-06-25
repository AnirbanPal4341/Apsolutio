import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  model = {
    email: ''
  }
  serverErrorMessages: String;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    this.userService.forgot(form.value).subscribe(
      res => {
        this.router.navigateByUrl('/forgot');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    )
  }

}

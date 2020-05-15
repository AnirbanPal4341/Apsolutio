import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  token: String;
  successMessage: boolean;
  serverErrorMessages = "";
  allowSubmit: boolean;

  model = {
    newPassword: '',
    confirmPassword: ''
  }

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');

    this.userService.checkToken(this.token).subscribe(
      res => {
        this.allowSubmit = true;
        console.log('WORKING')
      },
      err => {
        if(err.status == 404)
          this.serverErrorMessages = err.error.join('</br>');
      }
    )
  }

  onSubmit(form: NgForm){
    this.userService.resetPassword(form.value, this.token).subscribe(
      res => {
        console.log("no error");
        this.successMessage = true;
        this.router.navigateByUrl('/login');
      },
      err => {
        if(err.status == 404 || err.status == 400)
          this.serverErrorMessages = err.error.join('</br>');
        else
          this.serverErrorMessages = 'Something went wrong. Please contact ADMIN';
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationServiceService } from '../_services/authentication-service.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationServiceService,
    private alertService: AlertService) { }

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  loading = false;
  returnUrl: string;

  ngOnInit() {
    this.authenticationService.logout();
  }

  isRememberMe: boolean = true;
    
  login() {
    this.loading = true;
    this.authenticationService.login(this.loginForm.value)
      .subscribe(
        data => {
          if(data.token) {
            if(data.role === 'admin') {
              this.router.navigate(['/main']);
            } else if(data.role === 'teacher') {
              this.router.navigate(['/main'])
            } else if(data.role === 'parent') {
              this.router.navigate(['/main/dashboard/parentdashboard'])
            }
          } else {
            this.router.navigate(['/'])
          }
        }
      )
  }

  RegistrationPage() {
    this.router.navigate(['/registration'])
  }

}

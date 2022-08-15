import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomvalidationService } from 'src/app/share/UserServices/customvalidation.service';
import { UserService } from 'src/app/share/UserServices/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm!: FormGroup;
  islogin!:boolean
  submitted = false;
  constructor(private fb: FormBuilder, private router: Router,
    private service:UserService,private customValidator:CustomvalidationService) {

  }
 
  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      username: ["",
        Validators.compose([
          Validators.required,
        ]),
      ],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
    })
    // this.service.current_accounter.subscribe(res=>{
    //   console.log("from login",res)
    // })
  }
  onSubmit(): void {
    if(this.LoginForm){
      this.service.Signin(this.LoginForm.value)
    }


  }
  get LoginFormControl() {
    return this.LoginForm.controls
  }

}

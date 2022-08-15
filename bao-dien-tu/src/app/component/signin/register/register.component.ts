import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomvalidationService } from 'src/app/share/UserServices/customvalidation.service';
import { UserService } from 'src/app/share/UserServices/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterForm: FormGroup = new FormGroup({})
  submitted = false;
  constructor(private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private customValidator: CustomvalidationService) {

  }
  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      username: [
        "",
        Validators.compose([
          Validators.required,
          this.customValidator.patternValidatorUN()
        ]),
      ],

      email: ["", [Validators.required, Validators.email]],

      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmpassword: ['', [Validators.required]]
    },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmpassword')
      }
    )
  }
  get registerFormControl() {
    return this.RegisterForm.controls
  }
  onSubmit() {
    this.submitted = true
    if (this.RegisterForm.valid) {
      this.service.Register(this.RegisterForm.value).subscribe(res => {
        alert('REGISTER SUCCESSFUL');
        this.RegisterForm.reset()
        this.router.navigate(["login"])


      }
      )
      console.log(this.RegisterForm.value)
    }
  }
}

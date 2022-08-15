import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/share/interface/user';
import { CustomvalidationService } from 'src/app/share/UserServices/customvalidation.service';
import { UserService } from 'src/app/share/UserServices/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  ResetForm: FormGroup = new FormGroup({})
  submitted = false;

  accounter: User = {
    id: "0",
    username: "",
    email: "",
    password: ""
  }
  constructor(private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private customValidator: CustomvalidationService) {

  }
  ngOnInit(): void {
    this.ResetForm = this.fb.group({

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

    this.service.current_accounter.subscribe(res => {
      this.accounter = res
      console.log("account type from reset", typeof this.accounter)
      console.log("account from reset", this.accounter)
    })
  }
  get resetFormControl() {
    return this.ResetForm.controls
  }
  onSubmit() {
    this.submitted = true
    console.log("resetFormControl",this.resetFormControl['password'].value)
    this.accounter.password = this.resetFormControl['password'].value
    console.log("accounter from rest",this.accounter.password)
    if (this.ResetForm) {
      this.service.updatepassword(this.accounter.id, this.accounter).subscribe(res => {
        this.ResetForm.reset()
        this.router.navigate(["login"])
      })

      console.log(this.ResetForm.value)
    }
  }


}

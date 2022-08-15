import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/share/interface/user';
import { CustomvalidationService } from 'src/app/share/UserServices/customvalidation.service';
import { UserService } from 'src/app/share/UserServices/user.service';

@Component({
  selector: 'app-forget-pw',
  templateUrl: './forget-pw.component.html',
  styleUrls: ['./forget-pw.component.css']
})
export class ForgetPWComponent implements OnInit {

  Form!: FormGroup;
  islogin!: boolean
  submitted = false;
  accounter: User = {
    id: "0",
    username: "",
    email: "",
    password: ""
  }
  constructor(private fb: FormBuilder, private router: Router,
    private service: UserService, private customValidator: CustomvalidationService) {

  }

  ngOnInit(): void {
    this.Form = this.fb.group({
      username: ["",
        Validators.compose([
          Validators.required,
        ]),
      ],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
    })
    this.service.current_accounter.subscribe(res => {
      this.accounter = res
      console.log("account type from forget", typeof this.accounter)
      console.log("account from forget", this.accounter)
      if (typeof res == "string") {

        console.log("from  Forget", typeof res)
      }
    })
  }
  onSubmit(): void {
    //  this.accounter.username = this.FormControl['username'].value;
    //  this.accounter.password = this.FormControl['password'].value;
    if (this.Form) {
      this.service.usernameCheck(this.Form.value)
      console.log("account from forget submit", this.Form.value)
    }


  }
  get FormControl() {
    return this.Form.controls
  }

}

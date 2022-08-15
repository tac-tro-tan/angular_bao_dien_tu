import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/share/interface/user';
import { CustomvalidationService } from 'src/app/share/UserServices/customvalidation.service';
import { UserService } from 'src/app/share/UserServices/user.service';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.css']
})
export class AccountInformationComponent implements OnInit {

  submitted = false;

  accounter:User = {
    id:"0",
    username:"",
    email:"",
    password:""
  }
  accounterForm: FormGroup = new FormGroup({})
  
  constructor(private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private customValidator: CustomvalidationService) {

  }
  ngOnInit(): void {
    this.service.current_accounter.subscribe(res => {
      this.accounter = res
      console.log("account type from nav",typeof this.accounter)
      if(typeof res=="string"){
          this.accounter=JSON.parse(res)
      }
      else{
        return
      }
      // console.log("current_accounter",typeof res)
    })
    this.accounterForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]]
    })
    this.accounterFormControl['email'].setValue(this.accounter.email);
  }

  get accounterFormControl() {
    return this.accounterForm.controls
  }
  onSubmit() {
    this.submitted = true;
    this.accounter.email = this.accounterFormControl['email'].value;
    if (this.accounterForm.valid) {
      this.service.putUser(this.accounter,this.accounter.id).subscribe(res => {
        alert('CHANGE EMAIL SUCCESSFUL');
        this.accounterForm.reset()
        this.router.navigate(["category"])
      }
      )
      console.log(this.accounter)
    }
  }
}

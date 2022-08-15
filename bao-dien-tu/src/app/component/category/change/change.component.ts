import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from 'src/app/share/News/news.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {

  form!: FormGroup
  submitted = false;
  chuyenmucByID:any={}

  chuyenmuc!:any
  id = this.actRoute.snapshot.params['id'];
  constructor(private fb: FormBuilder,private api:NewsService,
     public actRoute: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      tenChuyenMuc:["",
        Validators.compose([
          Validators.required,
        ])
      ],
      maChuyenMuc:['',
        Validators.compose([
          Validators.required
        ])
    
      ],
      ngayKhoiTao:[''],
      moTa:[''],

   })
    this.getCMByID()
    this.getCM()
  }
  onSubmit():void{
    

  }
  get FormControl(){
    return this.form.controls
  }
  getCMByID(){
      this.api.getChuyenmucById(this.id).subscribe((data:{})=>{
        this.chuyenmucByID=data
        console.log(this.chuyenmucByID)
      })
  }
  getCM(){
    this.api.getChuyenmuc().subscribe(res=>{
      this.chuyenmuc=res
    })
  }
  UpdateCM(){
      this.api.updateChuyenmuc(this.id,this.form.value).subscribe(res=>{
        alert("Cập Nhật Thành Công")
        this.router.navigate(['/category'])

      }
      )
    
  }

}

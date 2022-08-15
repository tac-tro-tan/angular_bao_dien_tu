import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from 'src/app/share/News/news.service';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/share/tinBai/article.service';
import { INewPost } from 'src/app/share/interface/newpost';
import { UserService } from 'src/app/share/UserServices/user.service';
import { User } from 'src/app/share/interface/user';

import { v4 as uuidv4 } from 'uuid';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  form!: FormGroup
  submitted = false;

  tinbai: INewPost = {
    id: "1",
    tieuDe: "",
    nguoiDang: "",
    ngayDang: "",
    luotXem: 0,
    anh: "",
    noiDung: "",
    chuyenMuc: [
      {
        id: "0",
        tenChuyenMuc: "0",
        maChuyenMuc: "0"
      },
      {
        id: "0",
        tenChuyenMuc: "0",
        maChuyenMuc: "0"
      }
    ]
  }
  chuyenMuc!: any;
  chuyenMucDuocChon:any = [];

  accounter: User = {
    id: "0",
    username: "",
    email: "",
    password: ""
  }

  // multi select
  dropdownList: any = [];
  dropdownSettings: IDropdownSettings = {};


  constructor(private fb: FormBuilder, private api: ArticleService, public router: Router,
    private cmuc: NewsService, private Check: UserService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      tieuDe: ["",
        Validators.compose([
          Validators.required,
        ])
      ],
      anh: ['',
        Validators.compose([
          Validators.required
        ])
      ],
      ngayKhoiTao: [''],
      noiDung: [''],
      chuyenMuc: ['']
    });

    this.getCM();

    this.Check.current_accounter.subscribe(res => {
      this.accounter = res
      if (typeof res == "string") {
        this.accounter = JSON.parse(res)
      }
      else {
        return
      }
    })
    this.tinbai.nguoiDang = this.accounter.username;
    var today = new Date();
    this.tinbai.ngayDang = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
  }
  onItemSelect(item: any) {
    this.chuyenMucDuocChon.push(this.chuyenMuc.find((a:any)=> a.id == item.id));
  }
  onSelectAll(items: any) {
    this.chuyenMucDuocChon.push(items);
  }
  get FormControl() {
    return this.form.controls
  }
  getCM() {
    this.cmuc.getChuyenmuc().subscribe(res => {
      this.chuyenMuc = res;
      this.dropdownList = this.chuyenMuc;
    })
    // multi select
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'tenChuyenMuc',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }


  createCM() {
    if (this.form.valid) {
      this.tinbai.id = uuidv4();
      this.tinbai.tieuDe = this.FormControl['tieuDe'].value;
      //this.tinbai.nguoiDang = this.FormControl['anh'].value;
      //this.tinbai.ngayDang = this.FormControl['anh'].value;
      //this.tinbai.luotXem = this.FormControl['anh'].value;
      this.tinbai.chuyenMuc = this.chuyenMucDuocChon;
      this.tinbai.noiDung = this.FormControl['noiDung'].value;
      this.tinbai.anh = this.FormControl['anh'].value;
      this.api.createtinbai(this.tinbai).subscribe(res => {
        alert('Tạo Bài Viết Thành Công');
        this.form.reset()
        this.router.navigate(["article"])
      })
    }
  }

}

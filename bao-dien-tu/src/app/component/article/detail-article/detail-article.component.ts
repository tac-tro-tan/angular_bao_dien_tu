import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from 'src/app/share/News/news.service';
import { ArticleService } from 'src/app/share/tinBai/article.service';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserService } from 'src/app/share/UserServices/user.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {

  form!: FormGroup
  submitted = false;
  tinbaiByID: any = {}

  tinbai!: any
  id = this.actRoute.snapshot.params['id'];

  // multi select
  dropdownList: any = [];
  dropdownSettings: IDropdownSettings = {};
  selectedItems: any = [];
  chuyenMuc!: any;
  chuyenMucDuocChon: any = [];

  constructor(private fb: FormBuilder, private api: ArticleService, public router: Router,
    private cmuc: NewsService, private Check: UserService, public actRoute: ActivatedRoute) { }

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

    })



    this.getCMByID()
    this.getCM()
  }
  onSubmit(): void {


  }
  onItemSelect(item: any) {
    this.chuyenMucDuocChon.push(this.chuyenMuc.find((a: any) => a.id == item.id));
  }
  onSelectAll(items: any) {
    this.chuyenMucDuocChon.push(items);
  }
  get FormControl() {
    return this.form.controls
  }
  getCMByID() {
    this.api.gettinbaiById(this.id).subscribe((data: {}) => {
      this.tinbaiByID = data
      console.log(this.tinbaiByID);
      this.selectedItems = this.tinbaiByID.chuyenMuc;
      this.chuyenMucDuocChon = this.tinbaiByID.chuyenMuc;
    })
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
  
  DeleteCM(ID: any) {

    if (window.confirm("“Bạn có chắc chắn muốn xoá tin bài này?")) {
      alert("Đã xoá thành công tin bài")
      this.api.deletearticle(ID).subscribe(res => {
        this.getCM()
      })
      this.router.navigate(["article"])
    }

  }

}
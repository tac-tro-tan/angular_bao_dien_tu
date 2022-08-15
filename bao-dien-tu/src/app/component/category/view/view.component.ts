import { ApiService } from './../../../share/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  onCategory = {
    id: "0",
    tenChuyenMuc: "",
    maChuyenMuc: "",
    ngayKhoiTao: ""
  };

  searchCategory = {
    tenChuyenMuc: "",
    maChuyenMuc: "",
    tuNgayKhoiTao: "",
    denNgayKhoiTao: ""
  };

  categoryData!: any;
  searchCategoryData!: any;

  // page
  p: number = 1;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getCategoryDetail();
  }
  getCategoryDetail() {
    this.api.getCategory()
      .subscribe(res => {
        this.categoryData = res;
        this.searchCategoryData = res;
      })
  }
  deleteCategoryDetail(idCategory: string) {
    this.api.deleteCategory(idCategory)
      .subscribe(res => {
        this.getCategoryDetail();
      })
  }

  searchh4() {
    console.log(this.searchCategory.tuNgayKhoiTao)
    let searchTen: any[] = [];
    let searchTuNgay: any[] = [];
    let searchDenNgay: any[] = [];

    this.categoryData.forEach((post: any) => {
      if (this.searchCategory.tenChuyenMuc === '' ||
        post.tenChuyenMuc.toLowerCase().includes(this.searchCategory.tenChuyenMuc.toLowerCase())) {
        searchTen.push(post);
      }

      let date1 = new Date(post.ngayKhoiTao);
      let date2 = new Date(this.searchCategory.tuNgayKhoiTao);
      if (!Number.isFinite(date2.getTime()) || date1.getTime() > date2.getTime()) {
        searchTuNgay.push(post);
      }

      let date3 = new Date(this.searchCategory.denNgayKhoiTao);
      if (!Number.isFinite(date3.getTime()) || date1.getTime() < date3.getTime()) {
        searchDenNgay.push(post);
      }
    })
    let arr = this.unique([...searchTen, ...searchTuNgay])
    this.searchCategoryData = this.unique([...arr, ...searchDenNgay]);
  }
  unique(arr: any[]) {
    var formArr = arr.sort((a: { id: number; }, b: { id: number; }) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
    var idArr: any[] = [];
    var resultArr = [];
    for (let i = 1; i < formArr.length; i++) {
      if (formArr[i].id == formArr[i - 1].id
        && !idArr.includes(formArr[i].id)) {
        idArr.push(formArr[i].id);
        resultArr.push(formArr[i])
      }
    }
    return resultArr
  }
}
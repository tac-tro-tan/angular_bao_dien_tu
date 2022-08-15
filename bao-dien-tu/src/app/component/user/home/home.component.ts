import { ApiService } from './../../../share/api.service';
import { Component, OnInit } from '@angular/core';
import { INewPost } from 'src/app/share/interface/newpost';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // dữ liệu toàn bộ các bài viết
  postsData!: any;
  // dữ liệu 3 bài mới nhất
  newPostsData!: any;
  // 3 bài của chuyên mục bất kì
  postsFromCategory!: any;
  // chuyên mục bất kỳ đó
  randCategory: INewPost = {
    id: "0",
    tieuDe: "",
    nguoiDang: "",
    ngayDang: "",
    luotXem: 0,
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
    ],
    noiDung: "",
    anh: ""
  };
  // 3 bài viết nhiều lượt xem
  eyesPosts: any[] = []
  // danh sách chuyên mục
  category!: any;
  // test
  test!: any;
  test2: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getPostsDetail();
  }

  getPostsDetail() {
    this.api.getPosts()
      .subscribe(res => {
        this.postsData = res;

        this.test = this.postsData.map((a: any) => a.chuyenMuc);
        this.test.forEach((e: any) => {
          this.test2 = [...this.test2, ...e];
        });
        this.category = [...new Set(this.test2.map((a: any) => a.tenChuyenMuc))];

        this.newPostsData = this.postsData.slice(-3);
        this.randCategory = this.postsData[Math.floor(Math.random() * this.postsData.length)];
        this.postsFromCategory = this.postsData.filter((a: any) => 
        a.chuyenMuc[0].tenChuyenMuc == this.randCategory.chuyenMuc[0].tenChuyenMuc
        )
        .slice(-3);
        this.eyesPosts = this.postsData.sort((a: any, b: any) => a.luotXem - b.luotXem);
        this.eyesPosts = this.eyesPosts.slice(-3);
      })
  }
  authorPost(nguoiDang: any) {
    this.api.authorPost.next(nguoiDang);
  }
  postByCategory(tenChuyenMuc: any) {
    this.api.postByCategory.next(tenChuyenMuc);
  }
  idContent(idContent: any) {
    this.api.idContent.next(idContent);
  }
}

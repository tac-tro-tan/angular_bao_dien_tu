import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/share/api.service';
import { INewPost } from 'src/app/share/interface/newpost';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  // dữ liệu toàn bộ các bài viết
  postsData!: any;
  // dữ liệu 3 bài mới nhất
  newPostsData!: any;
  // 3 bài của chuyên mục bất kì
  postsFromCategory!: any;
  // chuyên mục bất kỳ đó
  randCategory!: any;
  // 3 bài viết nhiều lượt xem
  eyesPosts: any[] = []
  // danh sách chuyên mục
  category!: any;
  // test
  test!: any;
  test2: any[] = [];

  // id bài viết
  idcon:number = 0;
  // bài viết
  conten: INewPost = {
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

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.idContent.subscribe((val:any) =>{
      this.idcon  = val;
    })
    this.getPostsDetail();
    
  }

  getPostsDetail() {
    this.api.getPosts()
      .subscribe(res => {
        this.postsData = res;

        this.conten = this.postsData.find(
          (a: any) =>a.id == this.idcon
        );
        console.log(this.conten);
        this.test = this.postsData.map((a: any) => a.chuyenMuc);
        this.test.forEach((e: any) => {
          this.test2 = [...this.test2, ...e];
        });
        this.category = [...new Set(this.test2.map((a: any) => a.tenChuyenMuc))];

        this.newPostsData = this.postsData.slice(-3);
        this.randCategory = this.postsData[Math.floor(Math.random() * this.postsData.length)];
        this.postsFromCategory = this.postsData.filter(
          (a: any) => a.chuyenMuc[0].tenChuyenMuc == this.randCategory.chuyenMuc[0].tenChuyenMuc).slice(-3);
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

}

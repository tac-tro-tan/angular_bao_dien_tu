import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/share/api.service';

@Component({
  selector: 'app-posts-by-category',
  templateUrl: './posts-by-category.component.html',
  styleUrls: ['./posts-by-category.component.css']
})
export class PostsByCategoryComponent implements OnInit {

  // dữ liệu toàn bộ các bài viết
  postsData!: any;
  // dữ liệu 5 bài mới nhất của tác giả
  newPostsData!: any;
  // 3 bài viết nhiều lượt xem
  eyesPosts:any[]=[]
  // danh sách chuyên mục
  category!: any;
  // test
  test!:any;
  test2:any[]=[];
  // tên chuyên mục
  categoryName!: any;
  // xem bài viết
  idcon:number = 0;
  p:number= 0;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.idContent.subscribe((val:any) =>{
      this.idcon  = val;
    })
    this.getPostsDetail();
    this.api.postByCategory.subscribe((val:any) =>{
      this.categoryName  = val;
    })
  }

  getPostsDetail() {
    this.api.getPosts()
      .subscribe(res => {
        this.postsData = res;

        this.test = this.postsData.map((a:any)=>a.chuyenMuc);
        this.test.forEach((e:any) => {
          this.test2 =[...this.test2,...e];
        });
        this.category = [...new Set(this.test2.map((a:any)=>a.tenChuyenMuc))];
        this.newPostsData = this.postsData.filter((a:any)=>a.chuyenMuc[0].tenChuyenMuc == this.categoryName)
        this.eyesPosts = this.postsData.sort((a:any,b:any)=>a.luotXem-b.luotXem);
        this.eyesPosts = this.eyesPosts.slice(-3);
      })
    
  }
  

  authorPost(nguoiDang:any){
    this.api.authorPost.next(nguoiDang);
  }
  postByCategory(tenChuyenMuc:any){
    this.api.postByCategory.next(tenChuyenMuc);
  }
}

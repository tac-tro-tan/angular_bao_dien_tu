import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/share/api.service';

@Component({
  selector: 'app-author-post',
  templateUrl: './author-post.component.html',
  styleUrls: ['./author-post.component.css']
})
export class AuthorPostComponent implements OnInit {

  // dữ liệu toàn bộ các bài viết
  postsData!: any;
  // dữ liệu 5 bài mới nhất của tác giả
  newPostsData!: any;
  // 3 bài viết nhiều lượt xem
  eyesPosts:any[]=[]
  // 3 chuyên mục mới nhất
  randomCategory!:any;
  // tên tác giả
  authorName!: any;
  p:number= 0;
  idcon:number = 0;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.idContent.subscribe((val:any) =>{
      this.idcon  = val;
    })
    this.getPostsDetail();
    this.getCategoryDetail();
    this.api.authorPost.subscribe((val:any) =>{
      this.authorName  = val;
    })
  }

  getPostsDetail() {
    this.api.getPosts()
      .subscribe(res => {
        this.postsData = res;
        this.newPostsData = this.postsData.filter((a:any)=>a.nguoiDang == this.authorName)
        this.eyesPosts = this.postsData.sort((a:any,b:any)=>a.luotXem-b.luotXem);
        this.eyesPosts = this.eyesPosts.slice(-3);
      })
    
  }
  getCategoryDetail() {
    this.api.getCategory()
      .subscribe(res => {
        this.randomCategory = res.map((x:any)=>x.tenChuyenMuc).slice(-3);
      })
  }

  authorPost(nguoiDang:any){
    this.api.authorPost.next(nguoiDang);
  }
}

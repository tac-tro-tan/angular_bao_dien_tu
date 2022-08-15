import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/share/api.service';
import { INewPost } from 'src/app/share/interface/newpost';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {

  onPost: INewPost ={
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

  searchPost = {
    tieuDe: "",
    maChuyenMuc: "",
    tungayDang: "",
    denngayDang: ""
  };

  PostData!: any;
  searchPostData!: any;

  // page
  p: number = 1;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getPostDetail();
  }
  getPostDetail() {
    this.api.getPosts()
      .subscribe(res => {
        this.PostData = res;
        this.searchPostData = res;
      })
  }
  deletePostDetail(idPost: string) {
    this.api.deletePosts(idPost)
      .subscribe(res => {
        this.getPostDetail();
      })
  }

  searchh4() {
    let searchTen: any[] = [];
    let searchTuNgay: any[] = [];
    let searchDenNgay: any[] = [];

    this.PostData.forEach((post: any) => {
      if (this.searchPost.tieuDe === '' ||
        post.tieuDe.toLowerCase().includes(this.searchPost.tieuDe.toLowerCase())) {
        searchTen.push(post);
      }

      let date1 = new Date(post.ngayDang);
      let date2 = new Date(this.searchPost.tungayDang);
      if (!Number.isFinite(date2.getTime()) || date1.getTime() > date2.getTime()) {
        searchTuNgay.push(post);
      }

      let date3 = new Date(this.searchPost.denngayDang);
      if (!Number.isFinite(date3.getTime()) || date1.getTime() < date3.getTime()) {
        searchDenNgay.push(post);
      }
    })
    let arr = this.unique([...searchTen, ...searchTuNgay])
    this.searchPostData = this.unique([...arr, ...searchDenNgay]);
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

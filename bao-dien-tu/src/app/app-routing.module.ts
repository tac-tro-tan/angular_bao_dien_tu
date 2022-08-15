import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddArticleComponent } from './component/article/add-article/add-article.component';
import { ChangeArticleComponent } from './component/article/change-article/change-article.component';
import { DetailArticleComponent } from './component/article/detail-article/detail-article.component';
import { ViewArticleComponent } from './component/article/view-article/view-article.component';
import { AddComponent } from './component/category/add/add.component';
import { ChangeComponent } from './component/category/change/change.component';
import { DetailComponent } from './component/category/detail/detail.component';
import { ViewComponent } from './component/category/view/view.component';
import { AccountInformationComponent } from './component/signin/account-information/account-information.component';
import { LoginComponent } from './component/signin/login/login.component';
import { RegisterComponent } from './component/signin/register/register.component';
import { ResetpasswordComponent } from './component/signin/password/resetpassword/resetpassword.component';
import { AllPostComponent } from './component/user/all-post/all-post.component';
import { AuthorPostComponent } from './component/user/author-post/author-post.component';
import { ContentComponent } from './component/user/content/content.component';
import { HomeComponent } from './component/user/home/home.component';
import { PostsByCategoryComponent } from './component/user/posts-by-category/posts-by-category.component';
import { ForgetPWComponent } from './component/signin/password/forget-pw/forget-pw.component';
import { ConfirmOTPComponent } from './component/signin/password/confirm-otp/confirm-otp.component';

const routes: Routes = [
  // phần khách hàng
  {path:'', redirectTo:'home', pathMatch:'full'},
  // trang chủ
  {path:'home', component: HomeComponent},
  // bài viết tác giả
  {path:'authorpost', component: AuthorPostComponent},
  // trang nội dung bài viết
  {path:'content', component: ContentComponent},
  // trang tất cả bài viết
  {path:'allpost', component: AllPostComponent},
  // bài viết theo chuyên mục
  {path:'postsbycategory', component: PostsByCategoryComponent},
  // phần quản trị
  // trang danh sách chuyên mục
  {path:'category', component: ViewComponent},
  // trang thêm chuyên mục
  {path:'category/add', component: AddComponent},
  // trang sửa chuyên mục
  {path:'category/change/:id', component: ChangeComponent},
  // trang chi tiết chuyên mục
  {path:'category/detail/:id', component: DetailComponent},
  // trang danh sách tin bài
  {path:'article', component: ViewArticleComponent},
  // trang thêm tin bài
  {path:'article/add', component: AddArticleComponent},
  // trang sửa tin bài
  {path:'article/change/:id', component: ChangeArticleComponent},
  // trang chi tiết tin bài
  {path:'article/detail/:id', component: DetailArticleComponent},
  
  // phần tài khoản quản trị
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'login/forget', component: ForgetPWComponent
  },
  {
    path:'login/forget/confirmOTP',component:ConfirmOTPComponent
  }
  ,
  {
    path:'login/forget/confirmOTP/reset',component:ResetpasswordComponent
  },
  {
    path: 'reset', component: ResetpasswordComponent
  },
  {
    path: 'accountinformation', component: AccountInformationComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

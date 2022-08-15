import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './component/template/nav/nav.component';
import { FooterComponent } from './component/template/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewComponent } from './component/category/view/view.component';
import { HomeComponent } from './component/user/home/home.component';
import { AddComponent } from './component/category/add/add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorPostComponent } from './component/user/author-post/author-post.component';
import { PostsByCategoryComponent } from './component/user/posts-by-category/posts-by-category.component';
import { ContentComponent } from './component/user/content/content.component';
import { AllPostComponent } from './component/user/all-post/all-post.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { LoginComponent } from './component/signin/login/login.component';
import { RegisterComponent } from './component/signin/register/register.component';
import { ResetpasswordComponent } from './component/signin/password/resetpassword/resetpassword.component';
import { AccountInformationComponent } from './component/signin/account-information/account-information.component';
import { ViewArticleComponent } from './component/article/view-article/view-article.component';
import { AddArticleComponent } from './component/article/add-article/add-article.component';
import { ChangeArticleComponent } from './component/article/change-article/change-article.component';
import { DetailArticleComponent } from './component/article/detail-article/detail-article.component';
import { ChangeComponent } from './component/category/change/change.component';
import { DetailComponent } from './component/category/detail/detail.component';
import { ConfirmOTPComponent } from './component/signin/password/confirm-otp/confirm-otp.component';
import { ForgetPWComponent } from './component/signin/password/forget-pw/forget-pw.component';

import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    ViewComponent,
    HomeComponent,
    AddComponent,
    AuthorPostComponent,
    PostsByCategoryComponent,
    ContentComponent,
    AllPostComponent,
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent,
    AccountInformationComponent,
    ViewArticleComponent,
    AddArticleComponent,
    ChangeArticleComponent,
    DetailArticleComponent,
    ChangeComponent,
    DetailComponent,
    ConfirmOTPComponent,
    ForgetPWComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

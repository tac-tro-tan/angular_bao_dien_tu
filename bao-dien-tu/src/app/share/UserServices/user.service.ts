import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../interface/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public loggedIn = new BehaviorSubject<boolean>(true);
  currentLoggedIn = this.loggedIn.asObservable()
  public loggedOut = new BehaviorSubject<boolean>(false);
  currentLoggedOut = this.loggedOut.asObservable()
  public dropdown = new BehaviorSubject<boolean>(false);
  currentdropdown = this.dropdown.asObservable()


  // retrievedObject= JSON.parse(localStorage.getItem('account')!)
  _accounter = new BehaviorSubject<any>(localStorage.getItem('account')!);
  current_accounter = this._accounter.asObservable();

  currentRoute: string;

  constructor(private http: HttpClient, private router: Router) {
    this.currentRoute = "";

  }

  Register(Regis: any) {
    return this.http.post<any>("http://localhost:3003/Users", Regis)
  }
  Signin(USER: User) {
    this.http.get<any>("http://localhost:3003/Users").subscribe(res => {
      const user = res.find((a: any) => {
        return a.username === USER.username && a.password === USER.password
      })
      if (user) {
        alert('Login Successful')
        this._accounter.next(user)
        localStorage.setItem("account", JSON.stringify(user))
        // console.log("asdasd", localStorage.getItem("account"))

        // this.signInForm.reset()
        this.router.navigate(["category"])
        // console.log("router", this.router.navigate)

        return;
      } else {
        alert("user not found or Incorrect password")
      }
    })

  }
  RoutingCheck() {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
        // console.log('Route change detected');
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.currentRoute = event.url;
        if (this.currentRoute.includes("login") || this.currentRoute.includes("/category")
          || this.currentRoute.includes("/article") || this.currentRoute.includes("/accountinformation")) {

          this.loggedIn.next(false)
        } else {
          this.loggedIn.next(true)
        }
        if (this.currentRoute.includes("/category") || this.currentRoute.includes("/article")
          || this.currentRoute.includes("/accountinformation")) {

          this.loggedOut.next(true)
          this.dropdown.next(true)

        }
        // console.log("currentRoute", this.currentRoute)
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        return event.error
        // console.log(event.error);
      }
    });
  }
  usernameCheck(USER: User) {
    this.http.get<any>("http://localhost:3003/Users").subscribe(res => {
      const user = res.find((a: any) => {
        return a.username === USER.username
      })
      if (user) {
        this._accounter.next(user)
        localStorage.setItem("account", user)
        this.router.navigate(["login/forget/confirmOTP"])
        return;
      } else {
        alert("Tài khoản này không tồn tại")
      }
    })
  }

  updatepassword(id: string, data: any) {
    return this.http.put("http://localhost:3003/Users/" + id, data)

  }
  // newww
  putUser(data: any, id: string) {
    return this.http.put<any>("http://localhost:3003/Users/" + id, data)
      .pipe(map((res: any) => res))
  }
}

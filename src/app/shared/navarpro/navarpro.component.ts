import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../../auth/services/auth.service';

@Component({
  selector: 'app-navarpro',
  templateUrl: './navarpro.component.html',
  styleUrls: ['./navarpro.component.scss'],
  providers: [AuthService]
})
export class NavarproComponent implements OnInit {

  public user$: Observable<any>=this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onLogout(){
    try{ 
    await this.authSvc.logout();
    this.router.navigate(['/login']);
    }catch(error){console.log(error);}
  }

}

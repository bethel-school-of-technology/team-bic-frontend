import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutineServiceService } from 'src/app/services/routine-service.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentUser: Object = {};
  // this.currentUser.listRoutines

  bic: any[];
  selectedCard = null;
  

  constructor(private http: HttpClient, private routineService: RoutineServiceService ){//public authService: AuthService,
  //   private actRoute: ActivatedRoute
  // ) {
    this.http.get('assets/bic.json').subscribe(res => {
      this.bic = res['routines'];
    });
  //   let id = this.actRoute.snapshot.paramMap.get('id');
  //   this.authService.getUserProfile(id).subscribe(res => {
  //     this.currentUser = res.msg;
  //   })
  // }
}
  ngOnInit() {
  }

  onClickCard(ind){
    this.selectedCard = ind
    }
}

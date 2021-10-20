import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentUser: Object = {};
  // this.currentUser.listRoutines

  selectedCard = null;

  constructor( )//public authService: AuthService,
  //   private actRoute: ActivatedRoute
  // ) {
  //   let id = this.actRoute.snapshot.paramMap.get('id');
  //   this.authService.getUserProfile(id).subscribe(res => {
  //     this.currentUser = res.msg;
  //   })
  // }
{}
  ngOnInit() {
  }

  onClickCard(ind){
    this.selectedCard = ind
    }
}

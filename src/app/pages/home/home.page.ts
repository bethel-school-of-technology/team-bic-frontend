import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Routine } from 'src/app/models/routine';
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

  routineList: Routine[] = [];
  selectedCard = null;
  
  

  constructor(private http: HttpClient, private routineService: RoutineServiceService, public alertController: AlertController, public router: Router){//public authService: AuthService,
  //   private actRoute: ActivatedRoute
  // ) {
  //   let id = this.actRoute.snapshot.paramMap.get('id');
  //   this.authService.getUserProfile(id).subscribe(res => {
  //     this.currentUser = res.msg;
  //   })
  // }
}
  ngOnInit() {
  }
  ionViewWillEnter(){
    this.routineService.getRoutineList().subscribe(routineList => {
      this.routineList = routineList;
      console.log(this.routineList);
  })
}


  onClickCard(id){
    this.selectedCard = id;
    this.router.navigate(["/v-routine/" + id])
    };

    async deleteAlert(id:number) {
      return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        cssClass: 'alert-class',
        header: 'Delete?',
        message: 'Are you sure you want to delete this routine.',
        buttons: [
          {
            text:'Cancel',
            role: 'cancel',
            handler:() => {
              return resolve(false);
              },
            },
            {
              text: 'Delete',
              handler:() => {
                this.routineService.deleteRoutine(id).subscribe((res)=> {
                  window.location.reload();
                });
                this.routineService.getRoutineList().subscribe(routineList => {
                  
                })
              },
            }]
            
      });
      
      await alert.present();
    });
    
  }
}

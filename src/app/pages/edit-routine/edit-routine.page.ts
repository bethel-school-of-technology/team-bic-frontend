import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Routine } from 'src/app/models/routine';
import { RoutineServiceService } from 'src/app/services/routine-service.service';

@Component({
  selector: 'app-edit-routine',
  templateUrl: './edit-routine.page.html',
  styleUrls: ['./edit-routine.page.scss'],
})
export class EditRoutinePage implements OnInit {

  currentRoutine: Routine = new Routine();
  routineId: number;

  constructor(private actRoute: ActivatedRoute, private routineService: RoutineServiceService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.routineId = parseInt(this.actRoute.snapshot.paramMap.get("routineId"));
    this.routineService.getRoutine(this.routineId).subscribe(response =>{
      this.currentRoutine = response;
    })
  }
}

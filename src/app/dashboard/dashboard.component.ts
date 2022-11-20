import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'moment';

import { Store } from '../models/store';
import { ServiceModel } from '../models/serviceModel';
import { Turn } from '../models/turn';
import { TurnService } from '../rest/turn.service';
import { StoreService } from '../rest/store.service';
import { ServiceService } from '../rest/service.service';

import { ELEMENT_DATA } from '../../assets/samples'

import { Router } from "@angular/router"




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dasboardData: any;
  mybreakpoint: number;

  displayedColumns: string[] = ['storeColumn', 'serviceColumn', 'turnDateColumn', 'initHourColumn', 'endHourColumn'];
  dataSource = ELEMENT_DATA;

  public storeName: string = '';
  public service: string = '';
  public initDate: any;
  public endDate: any;

  stores: Store[] = [];

  services: ServiceModel[] = [];

  constructor(
    public turnService: TurnService,
    public storeService: StoreService,
    public serviceService: ServiceService,
    private router: Router,
  ) {
    this.mybreakpoint = 3
  }

  ngOnInit(): void {
    this.dasboardData = new FormGroup({
      storeName: new FormControl("", [Validators.required]),
      service: new FormControl("", [Validators.required]),
      initDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
    });
    this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 3;
    this.getAllTurns();
    this.getAllStores();
  }

  onClickSubmit() {

    if (this.dasboardData.valid) {
      console.log(this.dasboardData.value);
      console.log(this.dasboardData.value.initDate);

      var req: Turn = {

        turnDate: '',
        initHour: '',
        endHour: '',
        status: '',
        service: {
          idService: 0,
          serviceName: '',
          openingHour: '',
          closingHour: '',
          duration: '',
          store: {
            idStore: 0,
            storeName: '',
            maxCapacity: 0
          }
        }
      };

      req.status = 'Active'
      req.initHour = this.formatHours(this.dasboardData.value.initDate);
      req.endHour = this.formatHours(this.dasboardData.value.endDate);
      req.turnDate = this.formatDate(this.dasboardData.value.initDate);
      req.service.idService = this.dasboardData.value.service.idService

      this.saveTurns(req);
      window.location.reload();
      

    } else {
      return;
    }

  }

  formatDate(date: any): string {
    var dateTmp: any = new Date(date);
    return dateTmp.getFullYear() + '-' + (dateTmp.getMonth() + 1) + '-' + dateTmp.getDate();

  }

  formatHours(date: any): string {
    var dateTmp: any = new Date(date)
    return dateTmp.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  }

  getAllTurns(): void {
    this.turnService.getAllTurns().subscribe((resp: any) => {

      this.dataSource = resp;

    });
  }

  saveTurns(req: any): void {
    this.turnService.saveTurn(req).subscribe((resp: any) => {
      
    });
  }

  getAllStores(): void {
    this.storeService.getAllStores().subscribe((resp: any) => {

      this.stores = resp;

    });
  }

  getServicesByStore(store: any): void {

    this.dasboardData.get('service').setValue('');
    this.dasboardData.get('initDate').setValue(null);
    this.dasboardData.get('endDate').setValue(null);

    this.serviceService.getServicesByStore(store.idStore).subscribe((resp: any) => {

      this.services = resp;

    });
  }

  myFilter = (m: Date | null): boolean => {
    const day = (m)?.getDay();
    return day !== 0 && day !== 6;
  }

  handleSize(event: any) {
    this.mybreakpoint = (event.target.innerWidth <= 600) ? 1 : 3;
  }

}

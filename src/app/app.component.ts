import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Total } from './component/total/total.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  allRecords: MyData[] = [];
  data: MyData = new MyData()

  constructor(public dialog: MatDialog){}

  submit(inputRef1 : HTMLInputElement, inputRef2: HTMLInputElement, inputRef3: HTMLInputElement) {

    if (this.isNotValid(this.data.minutes) && this.isNotValid(this.data.seconds) || this.isNotValid(this.data.times)) {
      alert("Please enter minute or seconds and times")
      return
    }
    this.allRecords.push(this.data);
    this.data = new MyData()

    inputRef1.value = '0';
    inputRef2.value = '0';
    inputRef3.value = '0';
  }

  triggerUpdate() {
    this.data.totalSeconds = ((this.data.minutes * 60) + this.data.seconds) * this.data.times;
    
    this.data.approxMinutes = this.data.totalSeconds / 60;
    this.data.approxHours = this.data.totalSeconds / 3600;

    let hours =  Math.floor(this.data.totalSeconds / 3600);
    let remainingSeconds = this.data.totalSeconds % 3600;
    let minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds % 60;
    this.data.exact = `${hours} hours , ${minutes} minutes, ${seconds} seconds`
  }

  onMinuteChange(target: any){
    if(this.isNotValid(target.value)){
      return
    }
    this.data.minutes = Number(target.value)
    this.triggerUpdate()
  }

  onSecondChange(target: any){
    if(this.isNotValid(target.value)){
      return
    }
    this.data.seconds = Number(target.value)
    this.triggerUpdate()
  }

  onTimesChange(target: any){
    if(this.isNotValid(target.value)){
      return
    }
    this.data.times = Number(target.value)
    this.triggerUpdate()
  }

  reset(){
    let result = confirm('Sure? clear all data?')

    if(result){
      this.allRecords = []
    }
  }

  showGrandTotal() {

    let totalSeconds = 0;
    let approxMinutes = 0;
    let approxHours = 0;
    this.allRecords.map((item) => {
      totalSeconds += item.totalSeconds;
      approxMinutes += item.approxMinutes;
      approxHours += item.approxHours;
    })

    //exact 
    let hours = Math.floor(totalSeconds / 3600);
    let remainingSeconds = totalSeconds % 3600;
    let minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds % 60;

    let exact = `${hours} hours , ${minutes} minutes, ${seconds} seconds`

    let data = {
      records: this.allRecords.length,
      seconds: totalSeconds,
      minutes: approxMinutes,
      hours: approxHours,
      exact: exact
    }

    this.dialog.open(Total, {data})


  }

  isNotValid(value: Number) {
    return value == 0 || value == null
  }

  delete(value: Number){
    console.log(value);
    
    this.allRecords = this.allRecords.filter((_item, index) => {      
      return index != value
    })    
  }
}

export class MyData {
  seconds: number = 0;
  minutes: number = 0;

  totalSeconds: number = 0;

  approxMinutes: number = 0;
  approxHours: number = 0;

  exact : String = "";

  times: number = 0;
}

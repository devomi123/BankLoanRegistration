import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  formdata: any;
  data: any;
  city: string = "";
  panNumber: string = "";
  fullname: string = "";
  email: string = "";
  mobile: string = "";
  otp: string = "";
  name: any;
  isread: boolean = true;
  isresend = false;
  otpcount: any=0;


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.formdata = new FormGroup(
      {
        city: new FormControl("", Validators.compose([Validators.required])),
        email: new FormControl("", Validators.compose([Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])),
        panNumber: new FormControl("", Validators.compose([Validators.required, Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")])),
        fullname: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(140)])),
        mobile: new FormControl("", Validators.compose([Validators.required, Validators.pattern("[6-9]\\d{9}"), Validators.maxLength(10)])),
        otp: new FormControl("", Validators.compose([Validators.maxLength(4), Validators.minLength(4), Validators.required])),

      }

    );






  }

  submitdata(data: any) {
    // console.log(data);

    let obj = { mobile: data.mobile, otp: data.otp };
    console.log(obj);

    this.api.post("/verifyOTP.php", obj).subscribe((result: any) => {
      // console.log(result.status);
      // console.log(result.statusCode);
      console.log(result);
      if (result == "Success") {
        alert("success")
      }


    })

    alert("click")


  }
  resendotp() {
    this.isresend = true;
    setTimeout(() => {
      this.isresend = false;

    }, 10000);

    this.otpcount += 1;
    console.log(this.otpcount);
    if(this.otpcount == 3){
      this.isresend = true;

      setTimeout(() => {
        this.isresend = false;

      }, 10000);

    }
    // this.isresend = false;


  }





  otpmobile(event: Event) {
    let ctrl = <HTMLInputElement>event.target
    let otpdata = ctrl.value
    console.log(otpdata);
    if (otpdata.match("[6-9]\\d{9}")) {
      let obj = {
        panNumber: this.panNumber,
        city: this.city,
        fullname: this.fullname,
        email: this.email,
        mobile: this.mobile
      }
      console.log(obj);

      this.api.getotp("/getOTP.php", obj).subscribe((result: any) => {
        console.log(result);
        // console.log(result.statusCode);
      })
      alert("match")

    }
  }
}

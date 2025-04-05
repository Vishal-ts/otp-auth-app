import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private mockOtp: string = '';  // You can modify this to make it dynamic if needed

  constructor() {}

  // Simulate sending OTP (Generate mock OTP)
  sendOtp(mobileNumber: string): Observable<any> {
    this.mockOtp = '123456';  // For now, we use a fixed mock OTP
    console.log(`Mock OTP sent: ${this.mockOtp}`);
    return of({ success: true });  // Simulate successful OTP send
  }

  // Simulate OTP verification
  verifyOtp(enteredOtp: string): Observable<any> {
    if (enteredOtp === this.mockOtp) {
      return of({ success: true });  // Simulate OTP verification success
    } else {
      return throwError('Invalid OTP');  // Simulate OTP verification failure
    }
  }
}

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private mockOtp: string = '';
  public mobileNumber: string = ''; // <-- Add this

  sendOtp(mobileNumber: string): Observable<any> {
    this.mockOtp = '123456';
    this.mobileNumber = mobileNumber; // <-- Store here
    console.log(`Mock OTP sent: ${this.mockOtp}`);
    return of({ success: true });
  }

  getMobileNumber(): string {
    return this.mobileNumber;
  }

  verifyOtp(enteredOtp: string): Observable<any> {
    if (enteredOtp === this.mockOtp) {
      return of({ success: true });
    } else {
      return throwError('Invalid OTP');
    }
  }
}

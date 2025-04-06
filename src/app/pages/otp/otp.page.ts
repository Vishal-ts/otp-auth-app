import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OtpService } from 'src/app/services/otp.service';
import { ToastController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class OtpPage implements OnInit {
  otp: string = '';  // OTP entered by user
  errorMessage: string = '';  // Error message for invalid OTP

  constructor(
    private otpService: OtpService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const mobile = this.otpService.getMobileNumber();
    console.log('Mobile Number:', mobile); // Just to check
  }
  
  onOtpInput(event: any) {
    this.otp = this.otp.replace(/[^0-9]/g, '');  // Filter out non-numeric characters
  }

  verifyOtp() {
    if (this.otp.length !== 6) {
      this.showToast('Please enter a 6-digit OTP.');
      return;
    }

    this.otpService.verifyOtp(this.otp).subscribe({
      next: (response) => {
        if (response.success) {
          // OTP is correct, navigate to Dashboard
          this.router.navigate(['/dashboard']);
        } else {
          // Invalid OTP
          this.errorMessage = 'Invalid OTP. Please try again.';
        }
      },
      error: () => {
        // Handle error from OTP service (if any)
        this.errorMessage = 'Error verifying OTP. Please try again.';
      }
    });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger',
      position: 'top',
    });
    await toast.present();
  }
}

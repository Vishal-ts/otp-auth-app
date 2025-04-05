import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { OtpService } from 'src/app/services/otp.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
})
export class RegisterPage implements OnInit {
  countryCode = '+91';
  mobileNumber = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private otpService: OtpService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  validateMobileNumber(): boolean {
    const patterns: { [key: string]: RegExp } = {
      '+91': /^[6-9]\d{9}$/,      // India
      '+1': /^\d{10}$/,           // US
      '+44': /^\d{10}$/,          // UK
      '+61': /^\d{9}$/,           // Australia
      '+81': /^\d{10}$/,          // Japan
    };

    const pattern = patterns[this.countryCode];
    return pattern ? pattern.test(this.mobileNumber) : false;
  }

  validateInput(event: KeyboardEvent) {
    const charCode = event.charCode || event.keyCode;
  
    // Allow numeric keys (0-9) from the top row or number pad (keyCode 96-105 for number pad)
    if (
      (charCode >= 48 && charCode <= 57) ||  // 0-9 (top-row numbers)
      (charCode >= 96 && charCode <= 105) || // 0-9 (number pad)
      charCode === 8 // Backspace
    ) {
      return;
    }
  
    // Prevent any other character from being entered
    event.preventDefault();
  }

  async showToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,  // Dynamically set the color
      position: 'top',
    });
    await toast.present();
  }

  sendOtp() {
    this.errorMessage = '';

    if (!this.mobileNumber) {
      this.errorMessage = 'Please enter your mobile number.';
      return;
    }

    if (!this.validateMobileNumber()) {
      this.errorMessage = 'Please enter a valid mobile number.';
      return;
    }

    const fullNumber = this.countryCode + this.mobileNumber;
    this.otpService.sendOtp(fullNumber).subscribe({
      next: () => {
        // Show success toast before navigating to OTP page
        this.showToast('OTP sent successfully!', 'success').then(() => {
          setTimeout(() => {
            this.router.navigate(['/otp'], { state: { mobile: fullNumber } });
          }, 2000); // Delay navigation for 2 seconds
        });
      },
      error: () => {
        this.showToast('Failed to send OTP. Please try again.');
      },
    });
  }
}

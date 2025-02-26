import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.scss'],
})
export class AuthComponentComponent implements OnInit {
  screen: string = 'signin';
  formData: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.formData = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]], // Telefon sadece rakam içerebilir
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  change(event: string) {
    this.screen = event;
  }

  login() {
    if (this.formData.valid) {
      this.isLoading = true;
      console.log("📌 Kullanıcı Girişi Yapılıyor...");
      console.log("Email:", this.formData.get('email')?.value);
      console.log("Şifre:", this.formData.get('password')?.value);

      const formData = new FormData();
      formData.append('email', this.formData.get('email')?.value);
      formData.append('password', this.formData.get('password')?.value);

      this.auth.userLogin(formData).subscribe((data: any) => {
        console.log("✅ Giriş Başarılı:", data);
      });
    } else {
      console.log("❌ Hata: Form eksik veya hatalı.");
    }
  }

  restrictInput(event: any) {
    let input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, ''); // Sadece rakamları kabul eder
  }

  kontrol() {
    console.log("🔍 Kontrol fonksiyonu çalıştı!");
  }

  register() {
    if (this.formData.valid) {
      this.isLoading = true;
      console.log("📌 Kullanıcı Kayıt Oluyor...");
      console.log("İsim:", this.formData.get('name')?.value);
      console.log("Email:", this.formData.get('email')?.value);
      console.log("Telefon:", this.formData.get('phone')?.value);
      console.log("Şifre:", this.formData.get('password')?.value);

      const formData = new FormData();
      formData.append('name', this.formData.get('name')?.value);
      formData.append('email', this.formData.get('email')?.value);
      formData.append('phone', this.formData.get('phone')?.value);
      formData.append('password', this.formData.get('password')?.value);

      this.auth.userRegister(formData).subscribe((data: any) => {
        console.log("✅ Kayıt Başarılı:", data);
      });
    } else {
      console.log("❌ Hata: Form eksik veya hatalı.");
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../class/user';
@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.scss'],
})
export class AuthComponentComponent implements OnInit {
  screen: string = 'signin';
  formData: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService,private http:HttpClient,private toastController: ToastController) {
    this.formData = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]], // Telefon sadece rakam içerebilir
      password: ['', [Validators.required]],
    });
  }
yenikullanici:User=new User();
sifret:string="";
kontrol(){
  console.log("KONTROL" ,this.yenikullanici)
  if(this.sifret==this.yenikullanici.sifre){

    this.http.post("http://localhost:5000/signUp",{
      userName:this.yenikullanici.userName,
      userEmail:this.yenikullanici.userEmail,
      userPhone:this.yenikullanici.userTel,
      userPass:this.yenikullanici.sifre
    }).subscribe(r=>{
      console.log(r);
      this.presentToast("KAYIT BAŞARILI",'middle');
    })

  }else{
      this.presentToast("ŞİFRENİZ EŞLEŞMİYOR",'middle')
  }
}

async presentToast(message :string,position: 'top' | 'middle' | 'bottom') {
  const toast = await this.toastController.create({
    message: message,
    duration: 1500,
    position: position,
  });

  await toast.present();
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

  kontrol2() {
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

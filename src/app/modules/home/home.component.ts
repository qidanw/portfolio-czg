import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormArray } from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  emailSent: boolean;
  contactForm: UntypedFormGroup;
  
  constructor(private meta: Meta, public fb: UntypedFormBuilder, private http: HttpClient) {
  }

  ngOnInit(): void {

    this.contactForm = this.fb.group({
      fullName: [null, Validators.required],
      mobile: [null, Validators.required],
      email: [null, Validators.required],
    }); 
    
    this.meta.updateTag(
      {
        name: 'description',
        content: 'This application was developed with Angular version 14.0.1 and bootstrap 5.1.3' +
          ' It applies Routing, Lazy loading, Server side rendering and Progressive Web App (PWA)'
      });

  }

  async sendEmail(): Promise<string | undefined>
  {
    this.emailSent = true;
    return this.http.get<string>(
      `${environment.restApi}/sendEmail`, {
        params: {
          fullName: this.contactForm.getRawValue().fullName,
          mobile: this.contactForm.getRawValue().mobile,
          email: this.contactForm.getRawValue().email,
        }
      }
    )
    .toPromise()
    .then(data =>
    {
      return Promise.resolve(data);
    })
    .catch(error =>
    {
      return Promise.reject(error);
    });
    
  }

  onSubmit()
  {
    if(!this.contactForm.invalid)
    {
      this.sendEmail();
      this.contactForm.reset();
    }
  }

}

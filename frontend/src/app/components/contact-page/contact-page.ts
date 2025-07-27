import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  SeoHeadComponent,
  FooterSectionComponent,
  ThemeToggleComponent,
  LanguageToggleComponent
} from '../index';

@Component({
  selector: 'app-contact-page',
  imports: [
    CommonModule,
    TranslatePipe,
    ReactiveFormsModule,
    SeoHeadComponent,
    FooterSectionComponent,
    ThemeToggleComponent,
    LanguageToggleComponent
  ],
  templateUrl: './contact-page.html'
})
export class ContactPage {
  contactForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  submitError = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      company: ['', [Validators.maxLength(100)]],
      subject: ['general', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
      honeypot: [''] // Hidden field for bot detection
    });
  }

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get company() { return this.contactForm.get('company'); }
  get subject() { return this.contactForm.get('subject'); }
  get message() { return this.contactForm.get('message'); }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    // Check honeypot for bots
    if (this.contactForm.get('honeypot')?.value) {
      console.warn('Bot detected');
      return;
    }

    this.isSubmitting = true;
    this.submitError = '';

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.isSubmitted = true;
      console.log('Form submitted securely:', this.contactForm.value);
      // TODO: Implement actual API call with CSRF protection
    }, 2000);
  }

  private markFormGroupTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} est requis`;
      if (field.errors['email']) return 'Email invalide';
      if (field.errors['minlength']) return `${fieldName} trop court`;
      if (field.errors['maxlength']) return `${fieldName} trop long`;
    }
    return '';
  }
}
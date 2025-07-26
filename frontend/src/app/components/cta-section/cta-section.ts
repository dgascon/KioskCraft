import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cta-section',
  imports: [TranslatePipe],
  templateUrl: './cta-section.html'
})
export class CtaSectionComponent { }
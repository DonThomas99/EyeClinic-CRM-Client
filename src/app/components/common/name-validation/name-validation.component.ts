import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-name-validation',
  imports: [CommonModule],
  templateUrl: './name-validation.component.html',
  styleUrl: './name-validation.component.css'
})
export class NameValidationComponent {
@Input() nameControl:AbstractControl | null = null
@Input() isSubmitted:boolean = false
}

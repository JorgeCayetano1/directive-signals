import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {
  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input()
  set color(val: string) {
    this._color = val;
    this.setStyle();
  }

  @Input()
  set errors(val: ValidationErrors | null | undefined) {
    this._errors = val;
    // this.setStyle();
    this.setErrorMessage();
  }

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
  }
  ngOnInit(): void {
    console.log('this.htmlElement', this.htmlElement);
  }

  setStyle(): void {
    if (!this.htmlElement) {
      return;
    }
    this.htmlElement.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if (!this.htmlElement) {
      return;
    }
    if (!this._errors) {
      this.htmlElement.nativeElement.innerHTML = 'No errors';
      return;
    }

    const errors = Object.keys(this._errors);
    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerHTML = 'This field is required';
    } else if (errors.includes('minlength')) {
      // console.log('minlength', this._errors['minlength'].requiredLength);
      const { requiredLength, actualLength } = this._errors['minlength'];
      this.htmlElement.nativeElement.innerHTML = `This field must have at least ${requiredLength} characters. Current length: ${actualLength}`;
    } else if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerHTML = 'This field is not an email';
    }
  }
}

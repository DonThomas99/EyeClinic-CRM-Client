import { FormBuilder,type AbstractControl, type ValidationErrors, type ValidatorFn } from "@angular/forms";
import { repeat } from "rxjs";
import  moment from 'moment'

const formBuilder = new FormBuilder();

export function validateByTrimming(validators: ValidatorFn[]): ValidatorFn {
    return (control: AbstractControl) => {
        // Ensure control.value is a string before calling trim
        const trimmedValue = typeof control.value === 'string' ? control.value.trim() : control.value;

        // Create a new control with the trimmed value
        const formBuilder = new FormBuilder();
        const trimmedControl = formBuilder.control(trimmedValue);

        // Apply the provided validators to the trimmed value
        return validators.reduce<ValidationErrors | null>(
            (error: ValidationErrors | null, validator) => error ?? validator(trimmedControl),
            null
        );
    };
}

export const passwordMatchValidator: ValidatorFn = (control:AbstractControl): ValidationErrors | null => {
    const password = control.get('password')
    const cpassword = control.get('confirmPassword')
    if(password != null && cpassword != null){
        if(cpassword.value === ''){
            cpassword.setErrors({ required: true})
            return {required:true}
        }
        if(password.value != cpassword.value){
            cpassword.setErrors({passwordMismatch:true})
            return {passwordMismatch:true}
        }
    }
    cpassword?.setErrors(null)
    return null

}


export const validatePdf: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;
    console.log(file, 'heee');

    if (file) {
        const filePathParts = file.split('\\'); // Split the path string by backslashes
        const fileName = filePathParts[filePathParts.length - 1]; // Get the last part, which should be the file name

        if (!fileName.toLowerCase().endsWith('.pdf')) {
            return { 'invalidPdf': true };
        }
    }
    return null;
};

export function futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
       const selectedDate = moment(control.value);
       const currentDate = moment();
       
       
       if (selectedDate.isBefore(currentDate)) {
         
        return { 'futureDate': true };
       }
       return null;
    };
   }


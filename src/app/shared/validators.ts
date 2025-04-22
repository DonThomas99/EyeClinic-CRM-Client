import { Validators,AbstractControl } from "@angular/forms";
import { userNameMaxLength,userNameMinLength,nameRegex,emailRegex,OTPRegex,passwordLength,ZipRegex,passwordRegex,mobileRegex, productNameRegex, productMinLength, productMaxLength, stockMin, stockMax } from "./constants";

export const nameValidators =[
    Validators.required,
    Validators.minLength(userNameMinLength),
    Validators.maxLength(userNameMaxLength),
    Validators.pattern(nameRegex)
]

export const productNameValidators =[
    Validators.required,
    Validators.minLength(productMinLength),
    Validators.maxLength(productMaxLength),
    Validators.pattern(productNameRegex)
]


export const amountValidators =[
    Validators.required,
    Validators.min(200)    
]

export const stockValidators = [
    Validators.required,
    Validators.min(stockMin),
    Validators.max(stockMax)
]

export const emailValidators = [
    Validators.required,
    Validators.pattern(emailRegex)
]

export const passwordValidators =[
    Validators.required,
    Validators.minLength(passwordLength),
    Validators.pattern(passwordRegex)
]

export const otpValidators = [
    Validators.required,
    Validators.pattern(OTPRegex)
]

export const zipValidators =[
    Validators.required,
    Validators.pattern(ZipRegex)
]

export const cityValidators =[
    Validators.required,
    Validators.pattern(nameRegex)
]

export const mobileValidators = [
    Validators.required,
    Validators.pattern(mobileRegex)
]

export const stateValidators = [
    Validators.required,
    Validators.pattern(nameRegex)
]

export const addressValidators =[
    Validators.required,
    Validators.pattern(nameRegex)
]

export const requiredValidators = [Validators.required]


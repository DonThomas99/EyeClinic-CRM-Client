// import {environments} from 'src/environments/environment'
export const OTP_TIMER = 60 * 1// 1 min in seconds
export const OTP_RESEND_MAX_TIME = 1000 * 60 * 10// 10 min in milliseconds
export const MAX_OTP_LIMIT = 3

export const userNameMinLength = 3
export const userNameMaxLength = 20
export const stockMax = 100
export const stockMin = 10
export const productMaxLength =20
export const productMinLength = 5
export const productNameRegex = `^[a-zA-Z0-9]{${productMinLength},${productMaxLength}}$`
export const passwordLength = 8
export const emailRegex ='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
export const OTPRegex = '^[1-9][0-9]{3}$'
export const ZipRegex = '^[1-9][0-9]{5}$'
export const nameRegex = `^[a-zA-Z ]{${userNameMinLength},${userNameMaxLength}}$`
export const passwordRegex = `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{${passwordLength},}$`
export const charRegex = /^[A-Z]$/
export const mobileRegex = '^[1-9][0-9]{9}$'


export const signUp={
message:String,
resendOtp:String,
formattedTime:String,
otpResendCount:Number,
showOtpResend:Boolean
}
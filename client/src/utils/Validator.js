export const validate = (object, requirements = []) => {
    const {
        email,
        password
    } = object;
    let message = "";
    if(!validateEmail(email) || (requirements.includes("email") && email == "")) {
        message = "email is invalid"
        return {
            valid: false,
            message
        }
    }
    if(!validatePassword(email) || (requirements.includes("password") && password == "")) {
        message = "password is invalid"
        return {
            valid: false,
            message
        }
    }
    return {
        valid: true,
        message
    }
}

const validateEmail = (email)=>{
    return true
}
const validatePassword = (password)=>{
    return true
}
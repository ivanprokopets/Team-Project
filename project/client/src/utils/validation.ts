export const required = (value:string) => {
    if (value) return undefined;
    return 'Field is required';
  };
  
//   export const maxLengthCreator = maxLength => {
//     return value => {
//       if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
//       return undefined;
//     };
//   };
  
//   export const email = value => {
//     return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
//       ? 'Invalid email address'
//       : undefined;
//   };
  
//   export const minLengthCreator = minLength => {
//     return value => {
//       if (value.length < minLength) return `Min length is ${minLength} symbols`;
//       return undefined;
//     };
//   };
  
  
//   export const isLoginCreator = isLogin => {
//     return (value) => {
//       if (value && isLogin) return undefined;
//       return 'login already exists';
//     };
//   };
  
//   export const validationLevelPasswordCreator = levelPassword => {
//     return (value) => {
//       if (value && levelPassword) return "level of your password is "+levelPassword;
//       return undefined;
//     };
//   };
  
//   export const isConfirmCreator = (pass1, pass2) => {
//     return (value) => {
//       if (value && pass1 !== pass2) {
//         return 'wrong password';
//       } else {
//         return undefined;
//       }
//     };
//   };
  
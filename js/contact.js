export class Contact {
  constructor(){
    this.runValidations();
    this.runSection();
  }
  // ! ====  HIDE OTHER SECTIONS AND SHOW THIS  ==== ! \\
  runSection(){
    $("#contactUs").siblings().fadeOut(100);
    $("#contactUs").fadeIn(400);
  }
  // ! ====  RUNNING VALIDATION ON INPUTS VALUE  ==== ! \\
  runValidations(){

   $("#nameInp").on("input",()=>{
    this.validateName($("#nameInp").val());
   });
   $("#phoneInp").on("input",()=>{
    this.validatePhoneNumber($("#phoneInp").val());
   });
   $("#passwordInp").on("input",()=>{
    this.validatePass($("#passwordInp").val());
   });
   $("#emailInp").on("input",()=>{
    this.validateEmail();
   });
   $("#ageInp").on("input",()=>{
    this.validateAge();
   });
  }
  // ! ====  VALIDATION ON NAME VALUE  ==== ! \\
  validateName() { 
      let nameInp = document.getElementById('nameInp');
      let regex = /^[A-Z][a-z]{3,8}$/;
      if (regex.test(nameInp.value)== true  ) 
      {
          nameInp.style.border='none';
          $('#invalidName').addClass('d-none');
          return true;
      } else 
      {
          nameInp.style.border='3px solid red';
          $('#invalidName').removeClass('d-none');
          return false;
      }
  } 
  // ! ====  VALIDATION ON EMAIL VALUE  ==== ! \\
  validateEmail() { 
      let emailInp = document.getElementById('emailInp');
      let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (regex.test(emailInp.value)== true  ) 
      {
          emailInp.style.border='none';
          $('#invalidEmail').addClass('d-none');
          return true;
      } else 
      {
          emailInp.style.border='3px solid red';
          $('#invalidEmail').removeClass('d-none');
          return false;
      }
  } 
  // ! ====  VALIDATION PHONE NUMBER VALUE  ==== ! \\
  validatePhoneNumber() { 
      let phoneInp = document.getElementById('phoneInp');
      let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      if (regex.test(phoneInp.value)== true  ) {
          phoneInp.style.border='none';
          $('#invalidPN').addClass('d-none');
          return true;
      } else 
      {
          phoneInp.style.border='3px solid red';
          $('#invalidPN').removeClass('d-none');
          return false;
      }
  } 
  // ! ====  VALIDATION ON AGE VALUE  ==== ! \\
  validateAge() { 
    let ageInp = document.getElementById('ageInp');
    let regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    if (regex.test(ageInp.value)== true  ) {
        ageInp.style.border='none';
        $('#invalidAge').addClass('d-none');
        return true;
    } else 
    {
        ageInp.style.border='3px solid red';
        $('#invalidAge').removeClass('d-none');
        return false;
    }
  } 
  // ! ====  VALIDATION ON PASSWORD VALUES  ==== ! \\
  validatePass() { 
    let passwordInp = document.getElementById('passwordInp');
    let regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    if (regex.test(passwordInp.value)== true  ) {
        passwordInp.style.border='none'
        $('#invalidPass').addClass('d-none');
        return true;
    } else 
    {
        passwordInp.style.border='3px solid red'
        $('#invalidPass').removeClass('d-none');
        return false;
    };
    
  } 
  
}
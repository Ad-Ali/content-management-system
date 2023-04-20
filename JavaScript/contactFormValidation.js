function validateForm() {
  let x = document.forms["form"]["message"].value;
  if (x.length < 10) {
    alert("Your message must be longer than 10 characters.");
    return false;
  }
}

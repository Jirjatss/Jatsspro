function errorHandler(err, req, res, next) {
  console.log(err);
  let name = err.name;
  let code = 500;
  let message = "Internal Server Error";

  if (name == "SequelizeValidationError" || name == "SequelizeUniqueConstraintError") {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name === "login_empty_field") {
    code = 400;
    message = "Email/password required";
  } else if (err.name === "invalid_password") {
    code = 401;
    message = "Invalid Password";
  } else if (err.name === "email_is_not_registered") {
    code = 401;
    message = "Email is not registered yet";
  } else if (name === "invalid_otp") {
    code = 401;
    message = "Invalid OTP";
  } else if (name === "No_files_were_uploaded.") {
    code = 400;
    message = "No files were uploaded";
  } else if (name === "unauthenticated") {
    code = 401;
    message = "Invalid token";
  } else if (name === "profile_not_found") {
    code = 404;
    message = "Profile not found";
  } else if (name === "unauthorized") {
    code = 403;
    message = "You're not authorized";
  } else if (name === "course_not_found") {
    code = 404;
    message = "Course not found";
  } else if (name === "meeting_not_found") {
    code = 404;
    message = "Meeting not found";
  } else if (name === "already_pay") {
    code = 400;
    message = "Already Paid";
  }
  res.status(code).json({ message });
}

module.exports = errorHandler;

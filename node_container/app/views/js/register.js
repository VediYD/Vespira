function toggleUsernameValidity() {
  var _temp = document.getElementById("user-id");
  if (_temp.classList.contains("invalid")) {
    // do nothing
  } else {
    _temp.classList.toggle("invalid");
  }
}

function toggleUseremailValidity() {
  var _temp = document.getElementById("user-email");
  if (_temp.classList.contains("invalid")) {
    // do nothing
  } else {
    _temp.classList.toggle("invalid");
  }
}

function checkUsername(data) {
  var _temp = document.getElementById("user-id");
  // prettier-ignore
  $.ajax({
      method: "POST",
      url: "/registerCheck",
      contentType: "application/json",
      data: JSON.stringify({ "username": _temp.value }),
      success: function (result) {
      //   console.log("ajax result", result["msg"]);
        if (result["msg"]==null) {
          _temp.style.color = "black";
          document.body.removeEventListener("click", toggleUsernameValidity, true)
        } else if (result["msg"]) {
          // if userid already exists, then highlight in red
          _temp.style.color = "red";

          // add an event listener until its resolved
          document.body.addEventListener("click", toggleUsernameValidity, true)
        } else {
          _temp.style.color = "black";
          document.body.removeEventListener("click", toggleUsernameValidity, true)
        }
      },
    });
}

function checkUsermail(data) {
  var _temp = document.getElementById("user-email");
  // prettier-ignore
  $.ajax({
    method: "POST",
    url: "/registerCheck",
    contentType: "application/json",
    data: JSON.stringify({ "email": _temp.value }),
    success: function (result) {
    //   console.log("ajax result", result["msg"]);
      if (result["msg"]==null) {
        _temp.style.color = "black";
        document.body.removeEventListener("click", toggleUseremailValidity, true)
      } else if (result["msg"]) {
        // if userid already exists, then highlight in red
        _temp.style.color = "red";
        document.body.addEventListener("click", toggleUseremailValidity, true)
      } else {
        _temp.style.color = "black";
        document.body.removeEventListener("click", toggleUseremailValidity, true)
      }
    },
  });
}

document.getElementById("user-id").addEventListener("keyup", checkUsername);
document.getElementById("user-email").addEventListener("keyup", checkUsermail);

function submitForm() {
  // prevent multiple clicks
  document.getElementById("register-continue").disabled = true;

  var username = $("#user-id").val();
  var email = $("#user-email").val();
  var password = $("password").val();

  // if values are empty alert user
  if (username == "") {
    alert("please enter username");
    document.getElementById("register-continue").disabled = false;
  } else if (email == "") {
    alert("please enter email");
    document.getElementById("register-continue").disabled = false;
  } else if (password == null) {
    alert("please enter password");
    document.getElementById("register-continue").disabled = false;
  } else {
    // prettier-ignore
    var emailData = JSON.stringify({ "email": email })
    // console.log(emailData);

    // prettier-ignore
    var usernameData = JSON.stringify({ "username": username })
    // console.log(usernameData);

    // check if the user email is taken
    $.ajax({
      method: "POST",
      url: "/registerCheck",
      contentType: "application/json",
      data: emailData,
      success: function (result) {
        // console.log(result);
        if (result["msg"] == null) {
          // do nothing
        } else if (result["msg"]) {
          alert("Email Already Taken");
          document.getElementById("register-continue").disabled = false;
        } else {
          // do nothing
        }
      },
    });

    // check if the user id is taken
    $.ajax({
      method: "POST",
      url: "/registerCheck",
      contentType: "application/json",
      data: usernameData,
      success: function (result) {
        // console.log(result);
        if (result["msg"] == null) {
          // do nothing - this should never get triggered
        } else if (result["msg"]) {
          alert("Username Already Taken");
          document.getElementById("register-continue").disabled = false;
        } else {
          // do nothing -- empty server response doesnt exist yet
        }
      },
    });

    // prettier-ignore
    var data = JSON.stringify({
      "username": username,
      "email": email,
      "password": password,
    });
    console.log(data);

    // finally send data for adding new user to appropriate endpoint
    $.ajax({
      method: "POST",
      url: "/register",
      data: data,
      success: function (result) {
        // console.log(result);
        alert(result["msg"]);
        // window.location.href = "/login";
      },
    });
  }
}

$(document).ready(function () {
  $("#register-continue").click(() => {
    submitForm();
  });
});

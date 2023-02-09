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
  var password = $("#user-pwd").val();

  // if values are empty alert user
  if (username == "") {
    alert("please enter username");
    document.getElementById("register-continue").disabled = false;
  } else if (email == "") {
    alert("please enter email");
    document.getElementById("register-continue").disabled = false;
  } else if (password == "") {
    alert("please enter password");
    document.getElementById("register-continue").disabled = false;
  } else {
    // prettier-ignore
    var data = {}
    data.username = username;
    data.email = email;
    data.password = password;

    // finally send data for adding new user to appropriate endpoint
    $.ajax({
      method: "POST",
      url: "/register",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (result) {
        var msg = result["msg"];
        alert(msg);
        if (msg == "User Already Exists") {
          window.location.href = "/register";
        } else if (msg == "Email Already Taken") {
          window.location.href = "/register";
        } else {
          window.location.href = "/login";
        }
      },
    });
  }
}

$(document).ready(function () {
  $("#register-continue").click(() => {
    submitForm();
  });
});

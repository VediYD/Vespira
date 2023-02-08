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

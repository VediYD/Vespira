const video_feed = document.getElementById("video-feed");
const photo = document.getElementById("image-box");

const ImageCapture = window.ImageCapture;

function randomINT(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const constraints = {
  video: true,
  //   video: { width: video_feed.width, height: video_feed.height },
};

function assessPain() {
  setTimeout(() => {
    document.getElementById(
      "pain-score"
    ).innerHTML = `PAIN SCORE<br>${randomINT(0, 5)}.0/10.0`;
  }, 5000);
}

async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (err) {
    alert(err);
  }
}

function handleSuccess(stream) {
  window.stream = stream;
  video_feed.srcObject = stream;
}

init();

video_feed.addEventListener("click", async () => {
  // extract video track
  const videoDevice = stream.getVideoTracks()[0];

  // create image capture device
  const captureDevice = new ImageCapture(videoDevice);

  // take photo
  let img = await captureDevice.takePhoto();
  photo.src = window.URL.createObjectURL(img);
  photo.width = photo.style.display = "block";

  // turn off the video feed
  videoDevice.stop();

  // stop showing the video feed box
  video_feed.style.display = "none";
  assessPain();
});

photo.addEventListener("click", () => {
  init();
  setTimeout(() => {
    photo.style.display = "none";
    video_feed.style.display = "block";
  }, 1000);
});

const dragNDropBox = document.getElementById("drag-n-drop-box");
const dragNDropOptions = document.getElementById("drag-n-drop-options");
const dropOptions = document.getElementById("drop-options");

dragNDropOptions.addEventListener("click", () => {
  $("#img-file").trigger("click");
});

dragNDropBox.addEventListener("mouseover", () => {
  document.getElementById("drag-n-drop-options").style.display = "block";
  document.getElementById("drag-n-drop-box").style.display = "none";
});
dragNDropOptions.addEventListener("mouseleave", () => {
  document.getElementById("drag-n-drop-options").style.display = "none";
  document.getElementById("drag-n-drop-box").style.display = "block";
});
dragNDropBox.addEventListener("dragover", () => {
  document.getElementById("drag-n-drop-box").style.display = "none";
  document.getElementById("drop-options").style.display = "block";
});
dropOptions.addEventListener("dragleave", () => {
  document.getElementById("drag-n-drop-box").style.display = "block";
  document.getElementById("drop-options").style.display = "none";
});
dropOptions.addEventListener("drop", (event) => {
  document.getElementById("drag-n-drop-box").style.display = "block";
  document.getElementById("drop-options").style.display = "none";
  photo.src = URL.createObjectURL(event.target.files[0]);
  photo.width = photo.style.display = "block";
  const videoDevice = window.stream.getVideoTracks()[0];
  videoDevice.stop();
  video_feed.style.display = "none";
});

document.getElementById("img-file").addEventListener("change", function () {
  changeImage(this);
});

function changeImage(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      photo.src = e.target.result;
      video_feed.style.display = "none";
    };
    reader.readAsDataURL(input.files[0]);
    setTimeout(() => {
      const videoDevice = window.stream.getVideoTracks()[0];
      videoDevice.stop();
      video_feed.style.display = "none";
    }, 1000);
    photo.width = photo.style.display = "block";
    assessPain();
  }
}

document
  .getElementById("request-prescription")
  .addEventListener("click", () => {
    alert("prescription request recieved, check back in a few hours :)");
  });

document
  .getElementById("request-preapp-prescription")
  .addEventListener("click", () => {
    alert("preapproved prescriptions have been emailed to test@gmail.com");
  });

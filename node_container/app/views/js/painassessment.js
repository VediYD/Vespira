const video_feed = document.getElementById("video-feed");
const photo = document.getElementById("image-box");

const ImageCapture = window.ImageCapture;

const constraints = {
  video: true,
  //   video: { width: video_feed.width, height: video_feed.height },
};

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
dragNDropBox.addEventListener("drop", () => {
  alert("transferFile()");
  document.getElementById("drag-n-drop-box").style.display = "block";
  document.getElementById("drop-options").style.display = "none";
});

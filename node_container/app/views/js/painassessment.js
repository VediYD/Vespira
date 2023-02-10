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

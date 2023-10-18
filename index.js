let t1= gsap.timeline()
t1.from('.nav',{
    opacity:0,
    y:15,
    duration:1,
})
t1.from('.left',{
    opacity:0,
    x:-15,
    duration:0.5,
    stagger:true,
})
t1.from('.right>h1',{
    opacity:0,
    x:15,
    duration:0.5,
    stagger:true,
})
t1.from('.right>p',{
    opacity:0,
    x:15,
    duration:0.5,
    stagger:true,
})
t1.from('.right .btn1',{
    opacity:0,
    x:-15,
    duration:0.5,
    stagger:true,
})
t1.from('.right .btn2',{
    opacity:0,
    x:15,
    duration:0.5,
    stagger:true,
})
t1.from('.right .btn3',{
    opacity:0,
    y:15,
    duration:0.5,
    stagger:true,
})

t1.from('.sencondpage h1',{
    opacity:0,
    duration:0.5,
    y:-15,
    scrollTrigger:{
        trigger:".sencondpage h1",
        scrub:true,
        start:"top 75%",
        end:"top 25%",
    }
})

const startRecordingButton = document.getElementById("startRecording");
const stopRecordingButton = document.getElementById("stopRecording");
const downloadBtn = document.getElementById("downloadLink");

let mediaRecorder;
let recordedChunks = [];

startRecordingButton.addEventListener("click", async () => {
  const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
  mediaRecorder = new MediaRecorder(stream);
  recordedChunks = [];

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };
  stopRecordingButton.classList.remove('hidden');
  startRecordingButton.classList.add('hidden');

  mediaRecorder.onstop = () => {
    const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
    const recordedUrl = URL.createObjectURL(recordedBlob);
    console.log(recordedUrl)
    downloadBtn.setAttribute('href',recordedUrl)
    stopRecordingButton.classList.add('hidden');
    downloadBtn.classList.remove('hidden')   
  };

  mediaRecorder.start();
  startRecordingButton.disabled = true;
  stopRecordingButton.disabled = false;
});

stopRecordingButton.addEventListener("click", () => {
  mediaRecorder.stop();
  startRecordingButton.disabled = false;
  stopRecordingButton.disabled = true;
});

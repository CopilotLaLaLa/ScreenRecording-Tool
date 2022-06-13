import ScreenRecord from "./js/screen-record";
import {recordStart,recordEnd} from "./js/btn-func";


let videoDom = document.getElementById("video");//视频dom
let recordBtn = document.getElementById("record-btn");//开始录制按钮dom
let p = new ScreenRecord(videoDom,recordStart,recordEnd);



recordBtn.addEventListener("click", async function(){
    await p.record().catch((e)=>console.log(e));
});
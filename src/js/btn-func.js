// let videoDom = document.getElementById("video");//视频dom

let recordBtn = document.getElementById("record-btn");//开始录制按钮dom
let endBtn = document.getElementById("end-btn");//结束录制按钮dom

let clearBtn = document.getElementById("clear-btn");//清除录制按钮dom
let downloadBtn = document.getElementById("download-btn");//下载录制按钮dom

let pauseBtn = document.getElementById("pause-btn");//暂停录制按钮dom
let resumeBtn = document.getElementById("resume-btn");//继续录制按钮dom

let recordingSta = document.getElementById("recording-sta");//正在录制状态dom
let pauseSta = document.getElementById("pause-sta");//录制暂停状态dom

let btnBarStr = ".btn-bar";

//清除按钮
function clearAllBtn(ident){
    let btnBar = document.querySelector(ident).childNodes;
    for(let domItem of btnBar) {
        if(domItem.nodeType == 1){
            domItem.classList.remove('showBtn');
        }  
    }
}

//录制开始回调
function recordStart(){
    let __ = this;
    recordBtn.classList.remove('showBtn');
    recordingSta.classList.add('showBtn');
    pauseBtn.classList.add('showBtn');
    endBtn.classList.add('showBtn');
    pauseBtn.addEventListener("click",__.pause.bind(__,()=>{
        //状态更新
        recordingSta.classList.remove('showBtn');
        pauseSta.classList.add('showBtn');
        //按钮更新
        pauseBtn.classList.remove('showBtn');
        resumeBtn.classList.add('showBtn');
    }));
    resumeBtn.addEventListener("click",__.resume.bind(__,()=>{
        //状态更新
        recordingSta.classList.add('showBtn');
        pauseSta.classList.remove('showBtn');
        //按钮更新
        pauseBtn.classList.add('showBtn');
        resumeBtn.classList.remove('showBtn');
    }));
    endBtn.addEventListener("click",__.stop.bind(__));
}

//录制结束回调
function recordEnd(){
    let __ = this;
    clearAllBtn(btnBarStr);//清除按钮
    clearBtn.classList.add('showBtn');//显示清除按钮
    downloadBtn.classList.add('showBtn');//显示下载按钮
   
    function downloadClick(){
         //创建a标签赋值url自动点击
         let a = document.createElement('a');
         a.href = __.url;
         a.download = 'video.webm';
         a.click()
    }

    clearBtn.addEventListener("click", ()=>{//清除按钮事件监听
        //清除视频内容
        this.reset();
        this.videoDom.src = null;
        this.videoDom.controls = false;
        this.videoDom.removeAttribute("src");

        //按钮显示调整
        recordBtn.classList.add('showBtn');
        clearBtn.classList.remove('showBtn');
        downloadBtn.classList.remove('showBtn');
        downloadBtn.removeEventListener("click", downloadClick);
    });

    downloadBtn.addEventListener("click", downloadClick);
}

export {recordStart,recordEnd};
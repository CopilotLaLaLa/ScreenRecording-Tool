import countDownTimer from "./count-down-class";//导入倒计时器
export default class ScreenRecord {
    constructor(videoDom,startFn,endFn) {
        this.startFn = startFn;//录制开始回调
        this.endFn = endFn;//录制结束回调
        this.url = null;//录制流连结
        this.tracks = []; // 媒体数据
        this.blob = null;//录制流二进制
        this.stream = null;//视频流
        this.audioTracks = [];//音频轨
        this.audioStream = null;//音频流
        this.mediaRecorder = null;//录制接口
        this.videoDom = videoDom || null;//视频dom
        this.displayConstraints = { video: true,audio: {
            echoCancellation: true,
            noiseSuppression: true,
            channelCount:true,
            sampleRate: 44100
        }};//视频录制参数
        // this.displayConstraints = { video: true};//视频录制参数
        this.userConstraints = { video: false, audio: {
            autoGainControl: true,
            channelCount:true,
            echoCancellation: true, //消除回音
            googAutoGainControl: true,
            noiseSuppression: true  //消除噪音
        }};//音频录制参数
        this.options = {
            mimeType: "video/webm; codecs = vp8", // 媒体格式
        }
    }
    
    mixer(at1, at2) {
        let ac = new AudioContext,
            n = ac.createMediaStreamDestination();
        at1.getAudioTracks().length > 0 && ac.createMediaStreamSource(at1).connect(n), at2.getAudioTracks().length > 0 && ac.createMediaStreamSource(at2).connect(n);
        let auS = n.stream.getTracks();
        return new MediaStream(auS)
    }

    async record(){
        let sc = new countDownTimer();//实例化倒计时器
        let counttime = 3;//倒计时秒数
        return new Promise((resolve , reject)=>{

            function userStopCount(){
                sc.stopCount();
                reject();
            }

            navigator.mediaDevices.getDisplayMedia(this.displayConstraints).then((stream) => {//选择屏幕轨道
                this.stream = stream;

                navigator.mediaDevices.getUserMedia(this.userConstraints).then(audioStream => {//选择音频轨道
                     //倒计时中停止录制
                    this.stream.getVideoTracks()[0].addEventListener('ended', userStopCount);
                    //倒计时
                    sc.countDown(counttime).then(()=>{
                        //倒计时中停止录制退出事件移除
                        this.stream.getVideoTracks()[0].removeEventListener('ended', userStopCount);
                        //添加提示栏停止事件
                        this.stream.getVideoTracks()[0].addEventListener('ended', () => {
                            this.stop();
                        });
                        // 屏幕共享和麦克风进行混流
                        this.audioStream = audioStream;
                        //双声道混合
                        if(this.stream.getAudioTracks().length != 0){
                            let mixAudioStrack = this.mixer(this.stream, audioStream);
                            this.audioTracks.push(this.stream.getAudioTracks()[0]);
                            this.audioTracks.push(audioStream.getAudioTracks()[0]);
                            this.stream.removeTrack(this.stream.getAudioTracks()[0])
                            this.stream.addTrack(mixAudioStrack.getTracks()[0]);
                        }else{//仅麦克风声道
                            this.stream.addTrack(audioStream.getTracks()[0]);
                        }
                        //录制开始
                        this.start();
                        resolve(this); 
                        //传入videoDom则在videoDom上同步显示
                        this.videoDom && this.live();
                        this.startFn && this.startFn();
                    }).catch((e)=>(console.log(e)));
                }).catch(()=>{//用户取消录音权限
                    //倒计时中停止录制
                    this.stream.getVideoTracks()[0].addEventListener('ended', userStopCount);
                    //倒计时
                    sc.countDown(counttime).then(()=>{
                        //倒计时中停止录制退出事件移除
                        this.stream.getVideoTracks()[0].removeEventListener('ended', userStopCount);
                        //添加提示栏停止事件
                        this.stream.getVideoTracks()[0].addEventListener('ended', () => {
                            this.stop();
                        });
                        this.start();
                        resolve(this); 
                        //传入videoDom则在videoDom上同步显示
                        // if(this.videoDom){
                        //     this.live();
                        // }
                        this.videoDom && this.live();
                        this.startFn && this.startFn();
                    }).catch((e)=>(console.log(e)));
                });
            }).catch(()=>{//用户取消分享屏幕
                reject("用户取消分享屏幕"); 
            });
        })
    }

    start() {
        // 创建 MediaRecorder 的实例对象，对指定的媒体流进行录制
        this.mediaRecorder = new MediaRecorder(this.stream, this.options);

        // 当生成媒体流数据时触发该事件，回调传参 event 指本次生成处理的媒体数据
        this.mediaRecorder.ondataavailable = (event) => {
            if (event.data && event.data.size && event.data.size > 0) {
                this.tracks.push(event.data); // 存储媒体数据
            }
        };

        let __ = this;
        //媒体流录制结束监听，在音频轨道强制结束后触发
        this.mediaRecorder.addEventListener('stop', ()=>{
            //把录制的流数据转换成Blob对象
            __.blob = new Blob(__.tracks,{
                type: __.tracks[0].type
            });
            //录制流Blob对象转换成url
            __.url = URL.createObjectURL(__.blob);
            //如果传入videoDom则把录制的视频展示
            __.videoDom && __.replay();
            //传入回调执行
            __.endFn && __.endFn();
        })
        //MediaRecorder实例对象开始录制
        this.mediaRecorder.start();
        
    }

    live() {//录制同步直播
        //传入直播流
        this.videoDom.srcObject = this.stream;
        //显示进度条
        // this.videoDom.controls = true;
        //静音
        this.videoDom.muted = true;
        //播放
        this.videoDom.play();
    }

    stop() {//手动结束录制，强制关闭屏幕流和音频流
        this.audioTracks && this.audioTracks.forEach(track => track.stop());
        this.stream.getTracks().forEach(track => track.stop());
        // console.log("************录制结束************");
    }

    replay() {//录制结束后内容回放
        //传入录制后的媒体链接
        this.videoDom.src = this.url;
        //清空直播用的流
        this.videoDom.srcObject = null;
        //显示进度条
        this.videoDom.controls = true;
        //静音解除
        this.videoDom.muted = false;
        //播放
        this.videoDom.play();
    }

    pause(fn){
        this.mediaRecorder.pause();
        this.videoDom.pause();
        // console.log("录制已暂停");
        if(fn)fn();
    }

    resume(fn){
        this.mediaRecorder.resume();
        this.videoDom.play();
        // console.log("录制继续");
        if(fn)fn();
    }
    
    reset(){
        this.url = null;
        this.tracks = []; 
        this.blob = null;
        this.stream = null;
        this.audioStream = null;
        this.audioTracks = [];
        this.mediaRecorder = null;
    }
}
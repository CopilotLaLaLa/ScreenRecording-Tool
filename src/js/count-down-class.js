export default class countDownTimer {
    constructor() {
        this.counter = null;
        this.parentDom = document.querySelector("html");
        this.countNum = document.createElement("div");
        this.mask = document.createElement("mask");
        // this.sta = 0;
        this.init();
    }

    init(){
        this.mask.style.position = "fixed";
        this.mask.style.left = "0";
        this.mask.style.top = "0";
        this.mask.style.width = "100vw";
        this.mask.style.height = "100vh";
        this.mask.style.background = "rgba(0,0,0,0.48)";
        this.mask.style.zIndex = "2147483640";
        // mask.style.filter = "blur(10px)";
    
        // countNum.style.position = "absolute";
        this.countNum.style.position = "fixed";
        this.countNum.style.left = "calc(50% - 19rem)";
        this.countNum.style.top = "calc(50% - 19rem)";
        this.countNum.style.width = "38rem";
        this.countNum.style.height = "38rem";
        this.countNum.style.lineHeight = "38rem";
        this.countNum.style.background = "red";
        this.countNum.style.borderRadius = "50%";
        this.countNum.style.color = "white";
        this.countNum.style.fontSize = "20rem";
        this.countNum.style.textAlign = "center";
        this.countNum.style.zIndex = "2147483650";
        this.countNum.style.userSelect = "none";
    }

    async countDown(milisecond){
        this.domShow(milisecond);
        // this.sta = 1;
        return new Promise((resolve)=>{
            this.counter = setInterval(()=>{
                    milisecond -= 1;
                    if(milisecond == 0){
                        this.stopCount();
                        resolve();
                    }else{
                        this.countNum.innerText = milisecond;
                    }
            },1000)
        })
    }
    
    stopCount(){
        // this.sta = 0;
        this.counter && clearInterval(this.counter);
        this.parentDom.removeChild(this.countNum.parentNode);
    }

    domShow(milisecond){
        this.countNum.innerText = milisecond;
        this.mask.appendChild(this.countNum);
        // countNum.appendChild(mask);
        this.parentDom.appendChild(this.mask);
        // parentDom.appendChild(countNum);
    }


}


// async function countDown(milisecond){
//     let {countNum,parentDom} = countDownDom(milisecond);
//     return new Promise((resolve)=>{
//         let counter = setInterval(()=>{
//             milisecond -= 1;
//             if(milisecond == 0){
//                 clearInterval(counter);
//                 parentDom.removeChild(countNum.parentNode);
//                 resolve();
//             }else{
//                 countNum.innerText = milisecond;
//             }
//         },1000)
//     })
    
// }

// function countDownDom(milisecond){
//     let parentDom = document.querySelector("html");
//     let mask = document.createElement("mask");
//     mask.style.position = "fixed";
//     mask.style.left = "0";
//     mask.style.top = "0";
//     mask.style.width = "100vw";
//     mask.style.height = "100vh";
//     mask.style.background = "rgba(0,0,0,0.48)";
//     mask.style.zIndex = "2147483640";
//     // mask.style.filter = "blur(10px)";

//     let countNum = document.createElement("div");
//     // countNum.style.position = "absolute";
//     countNum.style.position = "fixed";
//     countNum.style.left = "calc(50% - 19rem)";
//     countNum.style.top = "calc(50% - 19rem)";
//     countNum.style.width = "38rem";
//     countNum.style.height = "38rem";
//     countNum.style.lineHeight = "38rem";
//     countNum.style.background = "red";
//     countNum.style.borderRadius = "50%";
//     countNum.style.color = "white";
//     countNum.style.fontSize = "20rem";
//     countNum.style.textAlign = "center";
//     countNum.style.zIndex = "2147483650";
//     countNum.style.userSelect = "none";
//     countNum.innerText = milisecond;
//     mask.appendChild(countNum);

//     // countNum.appendChild(mask);


//     parentDom.appendChild(mask);
//     // parentDom.appendChild(countNum);

//     return {countNum,parentDom};
// }


// position: fixed;
// top: 0;
// right: 0;
// top: 0;
// left: 0;
// width: 100%;
// height: 100%;
// z-index: 2147483640;
// background-color: rgba(0,0,0,0.48);
// filter: blur(10px);
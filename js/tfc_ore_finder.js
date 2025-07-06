//Ore Finder

class OreFinder{

    showFinderResultXYZ(el){
        let box = el;
        let boxIdNum = box.id.match(/\d$/);
        let boxType = box.id.match(/_([xyz])_/)[1];
        let otherBoxIdNum = (boxIdNum == 1) ? 2 : 1
        let otherBox = document.getElementById(box.id.replace(/\d$/, otherBoxIdNum));
        let resultId = box.id.replace(/_\d+$/, "_result");
        let resultSpan = document.getElementById(resultId);
        let num1 = (box.value == "") ? NaN : Number(box.value);
        let num2 = (otherBox.value == "") ? NaN : Number(otherBox.value);

        if (boxType == "y"){
            resultSpan.textContent = (isNaN(num1) && isNaN(num2)) ? "----"
                                    : (isNaN(num2)) ? (num1 - 12)
                                     : (isNaN(num1)) ? (num2 - 12)
                                      : Math.round((num1 + num2) / 2);
        }
        else{
            resultSpan.textContent = (isNaN(num1) || isNaN(num2)) ? "----"
                                    : Math.round((num1 + num2) / 2) + " / size: " + Math.abs(num1 - num2 - 24);
        }
    }

    clearValues(){
        document.getElementById("finder_x_1").value = "";
        document.getElementById("finder_x_2").value = "";
        document.getElementById("finder_x_result").textContent = "----";

        document.getElementById("finder_y_1").value = "";
        document.getElementById("finder_y_2").value = "";
        document.getElementById("finder_y_result").textContent = "----";

        document.getElementById("finder_z_1").value = "";
        document.getElementById("finder_z_2").value = "";
        document.getElementById("finder_z_result").textContent = "----";        
    }

}

class TfcTimerModule{
    constructor(){
        let timerBlocks = Array.from(document.querySelectorAll(".tfc_timer_block"));
        this.timers = timerBlocks.map(b => new TfcTimer(b.children[0], b.children[1], b.children[2]));
    }

}

class TfcTimer{
        constructor(labelBox, timeBox, button){
            this.audioEl = document.getElementById("utility_timer_sound");
            this.intervalMs = 200;
            this.intervalObj = null;
            this.intervalBlinkObj = null;
            this.finishTime = null;
            this.timeBox = timeBox;
            this.labelBox = labelBox;            
            this.button = button;
            this.defaultButtonBackColor = button.style.backgroundColor;
            this.lastTime = this.getValueFrom(timeBox);
            this.button.addEventListener("click", () => this.startPause());
        }



        getMinuteAndSecond(){
            let time = this.getValueFrom(this.timeBox);
            let minSecArr = time.split(":");
            
            return (minSecArr.length == 1) ? [Number(minSecArr[0]), 0] 
                                            : [Number(minSecArr[0]), Number(minSecArr[1])];
        }

        startPause(){
            if (this.button.textContent == "START"){
                //this.startTimer();
                let minSec = this.getMinuteAndSecond();
                if (isNaN(minSec[0]) || isNaN(minSec[1])){
                    window.alert("Invalid time format. \nPlease enter in MM:SS format.\nOr just enter in MM format.");
                    this.timeBox.value = "";
                    return;
                }

                this.finishTime = new Date(Date.now() + (minSec[0] * 60 + minSec[1]) * 1000);
                this.intervalBlinkObj = setInterval(() => {
                    this.blinkButton();
                }, 1000);

                this.intervalObj = setInterval(() => {
                    this.setRemainingTime();
                    if (Date.now() >= this.finishTime){
                       this.finishTimer();
                    }
                }, this.intervalMs);
                this.button.textContent = "PAUSE";
            }
            else if (this.button.textContent == "PAUSE"){
                this.pauseTimer();
            }


            this.lastTime = this.getValueFrom(this.timeBox);
            this.timeBox.value = this.lastTime;
        }

        finishTimer(){
            clearInterval(this.intervalObj);
            clearInterval(this.intervalBlinkObj);
            this.intervalObj = null;
            this.intervalBlinkObj = null;
            this.button.textContent = "START";
            this.timeBox.value = "";
            this.timeBox.placeholder = this.lastTime;
            this.blinkButton(true);
            this.audioEl.play();
        }
        pauseTimer(){
            clearInterval(this.intervalObj);
            clearInterval(this.intervalBlinkObj);
            this.intervalObj = null;
            this.intervalBlinkObj = null;
            this.button.textContent = "START";
            this.blinkButton(true);
        }

        blinkButton(setDefaultColor = false){
            this.button.style.backgroundColor = (setDefaultColor) ? this.defaultButtonBackColor
                                               : (this.button.style.backgroundColor == this.defaultButtonBackColor) ? "aliceBlue" : this.defaultButtonBackColor;
        }

        setRemainingTime(){
            let remain = Math.floor((this.finishTime - Date.now()) / 1000);
            let remainMin = Math.floor(remain / 60);
            let remainSec = remain % 60;
            this.timeBox.value = remainMin + ":" + remainSec.toString().padStart(2, "0");
        }

        
        getValueFrom(box){
            return (box.value == "") ? box.placeholder : box.value.replace(".", ":");
        }
}
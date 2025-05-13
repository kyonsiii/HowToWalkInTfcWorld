class TfcAlloy{
    constructor(){
        this.alloyListEl = document.getElementById("utility_alloy_list");
        this.utilityAlloyEl = document.getElementById("utility_alloy");
        this.alloyCompositions = Array.from(document.getElementsByClassName("alloy_composition_container"))
                                 .map(x => new TfcAlloyCompositionElementContainer(x));      
        this.alloyTotalEl = document.getElementById("utility_alloy_total_unit");
    }

    initialize(){
        this.addClearListEvent(this.alloyListEl);
        this.showHideCompositions();

        Array.from(this.utilityAlloyEl.getElementsByClassName("alloy_composition_matsize_list"))
         .forEach(el => {
            this.setMaterialSizeToList(el);
            this.addClearListEvent(el);
            el.addEventListener("change", () => this.setSubTotalOf(el));
         });

        Array.from(this.utilityAlloyEl.getElementsByClassName("alloy_composition_matnum_list"))
         .forEach(el => {
            this.setMaterialNumsToList(el);
            this.addClearListEvent(el);
            el.addEventListener("change", () => this.setSubTotalOf(el));
         });

        Array.from(this.utilityAlloyEl.querySelectorAll("input"))
         .forEach(el => el.addEventListener("keyup", () => this.setSubTotalOf(el)));
    }

    showHideCompositions(){
        let el = document.getElementById("utility_alloy_show_hide_switch");
        //console.log(el.textContent.substring(0, 1));
        el.textContent = (el.textContent.substring(0, 1) == "▼") ? el.textContent.replace("▼","▲") : el.textContent.replace("▲", "▼");
        this.alloyCompositions.forEach(c => c.element.style.display = (c.element.style.display != "none") ? "none" : "" );
    }


    setSubTotalOf(el){
        let parentContainer = el.closest(".alloy_composition_container");
        let comp = this.alloyCompositions.find(x => x.element == parentContainer);
        comp.setSubtotal();

        
        let totalNum = this.alloyCompositions.reduce((accum, x) => accum + x.currentSubtotalResult, 0);
        this.alloyTotalEl.textContent = totalNum;
        this.alloyCompositions.forEach(x => x.setCurrentRatio(totalNum));

        //目安投入量を表示
        let visibleCompositions = this.alloyCompositions.filter(c => c.element.style.visibility != "hidden");
        let zeroSubtotalCompositions = visibleCompositions.filter(c => c.currentSubtotalResult == 0);

        
        if (zeroSubtotalCompositions.length == 1){
            zeroSubtotalCompositions[0].setRecommend(totalNum);
        }
    }



    addClearListEvent(list){
        list.addEventListener("keydown", function(e){
            if (e.key == "Delete" || e.key == "Backspace"){
                let prevIndex = e.target.selectedIndex;
                e.target.selectedIndex = 0;

                if (prevIndex != 0) e.target.dispatchEvent(new Event("change", {bubbles: true}));
            }
        });
    }


    setMaterialNumsToList(list){
        for (let i = 0 ; i < 64; i++){
            list.appendChild(this.getListOption(i, i));
        }
    }

  

    setMaterialSizeToList(list){
        list.appendChild(this.getListOption("----"  ,  0));
        list.appendChild(this.getListOption("Poor"  ,  15));
        list.appendChild(this.getListOption("Normal",  25));
        list.appendChild(this.getListOption("Rich"  ,  35));
        list.appendChild(this.getListOption("Ingot" , 100));
        list.appendChild(this.getListOption("WIngot", 200));
        list.appendChild(this.getListOption("Nugget",  10));
    }


    getListOption(sizeName, value){
        let op = document.createElement("option");
        op.value = value;
        op.textContent = sizeName;
        return op;
    }


    setAlloyMaterials(){
        this.alloyTotalEl.textContent = 0;
        this.alloyCompositions.forEach(x => x.reset()); 
        
        let ratio = this.alloyListEl.value;
        if (ratio == "") return;

        ratio.split(";").map(x => x.split(","))
        .map((x, i) => ({index: i, name: x[0], min: Number(x[1]), max: Number(x[2])}))
            .forEach(x => this.setValueToAlloyCompositionCellOf(x.index, x.name, x.min, x.max));
    }

 

    setValueToAlloyCompositionCellOf(rowIndex, name, minRatio, maxRatio){
        if (rowIndex >= this.alloyCompositions.length) throw new Error("rowIndex is out of range.");
        let comp = this.alloyCompositions[rowIndex];
        comp.name.textContent = name;
        comp.ratioRange.textContent = minRatio + "% ～ " + maxRatio  +"%";
        comp.element.style.visibility = "visible";
    }


}

class TfcAlloyCompositionElementContainer{
    constructor(el){
        this.element = el;
        this.name = el.querySelector(".alloy_composition_material_name");
        this.matsizeList = el.querySelector(".alloy_composition_matsize_list");
        this.matnumList = el.querySelector(".alloy_composition_matnum_list");
        this.ratioRange = el.querySelector(".alloy_composition_ratio_range");
        this.additional = el.querySelector(".alloy_composition_additional");
        this.subtotal = el.querySelector(".alloy_composition_subtotal");
        this.recommendNum = el.querySelector(".alloy_composition_recommend_num");
        this.currentRatio = el.querySelector(".alloy_composition_current_ratio");
        this.currentCheck = el.querySelector(".alloy_composition_current_check");   
        this.currentSubtotalResult = 0;     
        this.currentRatioResult = 0.00;

        this.currentCheckResult = false;
    }

    reset(){
        this.element.style.visibility = "hidden";
        this.name.textContent = "----";
        this.matsizeList.selectedIndex = 0;
        this.matnumList.selectedIndex = 0;

        this.ratioRange.textContent = "";        
        this.additional.value = "";
        this.subtotal.textContent = 0;

        this.recommendNum.textContent = "";
        this.currentRatio.textContent = "----";
        this.currentCheck.textContent = "----";
        this.currentCheck.parentNode.style.backgroundColor = "mistyrose";
    }

    

    setSubtotal(){
        let sizeWeight = Number(this.matsizeList.value);
        let matNum = Number(this.matnumList.value);
        let additional = Number(this.additional.value);
        /*
        console.log({
            sizeWeight: sizeWeight,
            matNum: matNum,
            additional: additional
        });
        */
        
        this.currentSubtotalResult = sizeWeight * matNum + additional;
        this.subtotal.textContent = this.currentSubtotalResult;
        this.recommendNum.textContent = "";
    }

    setCurrentRatio(totalNum){       
        let n = Math.round(this.currentSubtotalResult / totalNum * 100000) / 1000;
        /*console.log({
            totalNum:totalNum,
            n:n
        });
        */
        this.currentRatioResult = n;
        this.currentRatio.textContent = (Math.round(this.currentRatioResult * 100) / 100) + "%";
        this.setResultOfRatioInRangeOrNot();
    }

    getMinMaxValues(){
        let minMax = this.ratioRange.textContent.split(" ～ ").map(x => parseInt(x));
        return { min: minMax[0], max: minMax[1] };
    }

    setResultOfRatioInRangeOrNot(){
        if (this.name.textContent == "----") return;

        let minMax = this.getMinMaxValues();
        let n = this.currentRatioResult;
        this.currentCheckResult = minMax.min <= n && n <= minMax.max;
        
        if (this.currentCheckResult){
            this.currentCheck.textContent = "OK" ;
            this.currentCheck.parentNode.style.backgroundColor = "lightgreen";
        }
        else {
            this.currentCheck.textContent = "NG";
            this.currentCheck.parentNode.style.backgroundColor = "mistyrose";
        }
    }

    setRecommend(currentTotalNum){
        let mm = this.getMinMaxValues();

        let minRatio = mm.min / 100;
        let minTotal = currentTotalNum / (1 - minRatio);        
        let minValue = Math.ceil(minTotal * minRatio);

        let maxRatio = mm.max / 100;
        let maxTotal = currentTotalNum / (1 - maxRatio);
        let maxValue = Math.floor(maxTotal * maxRatio);

        /*
        console.log({
            minRatio:minRatio,
            minTotal :minTotal ,
            minValue :minValue ,
            maxRatio:maxRatio,
            maxTotal: maxTotal,
            maxValue:maxValue

        })
        */
        this.recommendNum.textContent = minValue + " ～ " + maxValue;
    }
}
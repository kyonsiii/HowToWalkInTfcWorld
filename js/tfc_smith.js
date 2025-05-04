
class TfcSmithing extends SmithItemContainer {

    constructor(){
        super();
        let finishListEl = document.getElementById("utility_smithing_finish_data");
        this.itemList.forEach(a =>{
            let op = document.createElement("option");
            op.value = a;
            finishListEl.appendChild(op);
        });
        this.myListEl = document.getElementById("utility_smithing_mylist");
        this.myListDataSetEl = document.getElementById("utility_smithing_mylist_data");
       
    }


    getResults(targetNum, finishPattern){

         
    }

    calc(){
        let targetNum = Number(document.getElementById('utility_smithing_target_value').value);
        let finishPatternRaw = document.getElementById('utility_smithing_finish_list').value;
        let finishPattern = this.getFinishPattern(finishPatternRaw);
        let toolName = finishPatternRaw.match(/^.*?】/)[0];

        let reg = new RegExp(finishPattern, "i");
        let finishList = this.finishActions.filter(a => reg.test(a.finishPattern))
                                          .filter((item, index, self) => index === self.findIndex(t => t.value === item.value));

        let results = finishList.map(f => 
        {
            let difference = targetNum - f.value;
            let incPattern = this.incActions.find(x => x.increment == difference).actionsStr;
            return incPattern + "→" + f.finishPattern;
        }).map(x => ({value: x, length: x.split("→").length}))
           .filter((x, i, arr) => i === arr.findIndex(t => t.length === x.length))
            .sort((a, b) => a.length - b.length);

        //console.log(results);
        console.log(results[0]);
        let resultStr = this.compressShrinkStr(results[0].value);     
        this.appendNewItemToMyList(toolName, resultStr);
    }

    delete(){
        let items = localStorage.getItem("smith_mylist").split(",");
        let selectedValue = this.myListEl.value;

        let isSelectedValueFound = items.some(x => x == selectedValue);
        if (!isSelectedValueFound){
            alert("選択されたアイテムは登録されていません。");
            return;
        }
        else{
            if (!confirm("削除してもよろしいですか？")) return;
        }

        localStorage.setItem("smith_mylist", items.filter(x => x != selectedValue).join(","));
        this.initializeMyList(selectedValue);

    }

    appendNewItemToMyList(toolName, patternStr){
        if (this.existsOption(patternStr)) return;

        let userInput = prompt("登録名を入力してください。", "【】" + toolName + patternStr);
        if (userInput == null || userInput == "") return;

        this.setOptionToMyList(userInput);
       
    }

    existsOption(patternStr){
        let decPatternStr = this.decompressShrinkStr(patternStr);
        for (let i = 0; i < this.myListDataSetEl.children.length; i++){
            let option = this.myListDataSetEl.children[i];
            //console.log({object: option, value: option.value});
            let tmpPatternStr = this.decompressShrinkStr(this.getFinishPattern(option.value));
            if (tmpPatternStr == decPatternStr) return true;
        }
        return false;
    }

    setOptionToMyList(newValue){
        let options = Array.from(this.myListDataSetEl.children).map(op => op.value);
        options.push(newValue);
        options = options.sort((a, b) => a.localeCompare(b));
        localStorage.setItem("smith_mylist", options.join(","));     
        this.initializeMyList(newValue);   
    }

    initializeMyList(defaultValue = ""){
        let cookieValue = localStorage.getItem("smith_mylist");
        if (cookieValue == null || cookieValue == "") return;

        let items = cookieValue.split(",");
        if (items[0] == "") return;

        this.myListDataSetEl.innerHTML = "";
        let isDefaultValueFound = false;
        items.forEach(x =>{
            let op = document.createElement("option");
            op.value = x;
            this.myListDataSetEl.appendChild(op);
            if (x == defaultValue) isDefaultValueFound = true;
        });

        this.myListEl.value = (defaultValue == "") ? "" : defaultValue;
    }

 


    getFinishPattern(patternStr){
        return patternStr.includes("】") ? patternStr.match(/^【.*】(.*$)/)[1] : patternStr;
    }

    compressShrinkStr(str){
        let actionArr = str.split("→");

        let shrinkCount = 0;
        for (let i = 0; i < actionArr.length; i++){
            shrinkCount = i;    //indexは0から始まるので、i+1しない
            if (actionArr[i] != "Shrink") break;           
        }
        actionArr.splice(0, shrinkCount);
        return "Shrink×" + shrinkCount + "→" + actionArr.join("→");
    }

    decompressShrinkStr(str){
        let shrinkMatch = str.match(/Shrink×(\d+)/);
        return (shrinkMatch == null) ? str.match(/[^】]*$/) :  str.replace(shrinkMatch[0], "Shrink→".repeat(shrinkMatch[1])).replace(/→+/g, "→");
    }






}




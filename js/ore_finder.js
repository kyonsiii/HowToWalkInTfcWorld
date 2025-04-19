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
                                    : Math.round((num1 + num2) / 2);
        }
        

    }

}

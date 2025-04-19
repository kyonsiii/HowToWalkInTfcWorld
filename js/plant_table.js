class PlantTableManager{
    constructor(table, filterTable){
        this.rowHeaders = ["種別", "名前", "℃<br>Min", "℃<br>Max", "Hydro<br>Min", "Hydro<br>Max", "Rain<br>Min", "Rain<br>Max", "栄養素"];
        this.rowData = [
            ["Grain", "Barley", -8, 26, 18, 75, "", "", "Nitrogen"],
            ["Grain", "Oat", 3, 40, 35, 100, "", "", "Phosphorus"],
            ["Grain", "Rye", -11, 30, 25, 85, "", "", "Phosphorus"],
            ["Grain", "Maize", 13, 40, 75, 100, "", "", "Phosphorus"],
            ["Grain", "Wheat", -4, 35, 25, 100, "", "", "Phosphorus"],
            ["Grain", "Rice", 15, 30, 25, 100, "", "", "Phosphorus"],
            ["Etc", "Beet", -5, 20, 18, 85, "", "", "Potassium"],
            ["Vegetables", "Cabbage", -10, 27, 15, 65, "", "", "Nitrogen"],
            ["Vegetables", "Carrot", 3, 30, 25, 100, "", "", "Potassium"],
            ["Vegetables", "Garlic", -20, 18, 15, 75, "", "", "Nitrogen"],
            ["Vegetables", "Green Beans", 2, 35, 38, 100, "", "", "Nitrogen"],
            ["Vegetables", "Potatoes", -1, 37, 50, 100, "", "", "Potassium"],
            ["Etc", "Pumpkins", 0, 30, 30, 80, "", "", "Phosphorus"],
            ["Etc", "Melons", 5, 37, 75, 100, "", "", "Phosphorus"],
            ["Vegetables", "Onions", 0, 30, 25, 90, "", "", "Nitrogen"],
            ["Vegetables", "Soybean", 8, 30, 40, 100, "", "", "Nitrogen"],
            ["Vegetables", "Squash", 5, 33, 23, 95, "", "", "Potassium"],
            ["Etc", "Sugarcane", 12, 38, 40, 100, "", "", "Potassium"],
            ["Vegetables", "Tomatoes", 0, 36, 30, 95, "", "", "Potassium"],
            ["Etc", "Jute", 5, 37, 25, 100, "", "", "Potassium"],
            ["Fruit", "Cherry Tree", 5, 25, "", "", 100, 350, ""],
            ["Vegetables", "Papyrus", 19, 37, 70, 100, "", "", ""],
            ["Fruit", "Green Apple Tree", 1, 25, "", "", 110, 280, ""],
            ["Vegetables", "Red Bell Papper", 16, 30, 25, 60, "", "", ""],
            ["Fruit", "Lemon Tree", 10, 30, "", "", 180, 470, ""],
            ["Vegetables", "Yellow Bell Papper", 16, 30, 25, 60, "", "", ""],
            ["Fruit", "Olive Tree", 5, 30, "", "", 150, 500, ""],
            ["Fruit", "Orange Tree", 15, 36, "", "", 250, 500, ""],
            ["Fruit", "Peach Tree", 4, 27, "", "", 60, 230, ""],
            ["Fruit", "Plum Tree", 15, 31, "", "", 250, 400, ""],
            ["Fruit", "Red Apple Tree", 1, 25, "", "", 100, 280, ""],
            ["Fruit", "Banana Tree", 17, 35, "", "", 280, 500, ""],
            ["Fruit", "Blackberry Bush", 7, 24, 24, 100, "", "", ""],
            ["Fruit", "Raspberry Bush", 5, 25, 24, 100, "", "", ""],
            ["Fruit", "Blueberry Bush", 7, 29, 12, 100, "", "", ""],
            ["Fruit", "Elderberry Bush", 10, 33, 12, 100, "", "", ""],
            ["Fruit", "Bunchberry Bush", 15, 35, 24, 100, "", "", ""],
            ["Fruit", "Gooseberry Bush", 5, 27, 24, 100, "", "", ""],
            ["Fruit", "Snowberry Bush", -7, 18, 24, 100, "", "", ""],
            ["Fruit", "Cloudberry Bush", -2, 17, 9, 100, "", "", ""],
            ["Fruit", "Strawberry Bush", 5, 28, 12, 100, "", "", ""],
            ["Fruit", "Wintergreen Berry Bush", -6, 17, 12, 100, "", "", ""],
            ["Fruit", "Cranberry", -5, 17, "water", "water", "", "", ""]
        ];

        this.table = table;
        this.filterTable = filterTable;
        let cnt = 0;
        let defaultIndexes = [0, 2, 3];
        this.filterTable.querySelectorAll("select").forEach(box =>{
            box.innerHTML = this.rowHeaders.map(x => "<option value=\"" + x + "\">" + x + "</option>").join("\n");
            box.selectedIndex = defaultIndexes[cnt];
            cnt++;
        });

        this.filterTable.querySelectorAll("input").forEach(box =>{
            console.log(box);
            box.addEventListener("keyup", (e) => {
                this.setDataTo(this.table, this.rowHeaders, this.getFilteredDataFromFilterTables());
            })
        });


        this.setDataTo(this.table, this.rowHeaders, this.rowData);

        console.log(this.getFilteredDataFromFilterTables());
    }

    getFilteredDataFromFilterTables(){
        var selectBoxes = this.filterTable.querySelectorAll("select");
        var inputBoxes = this.filterTable.querySelectorAll("input[type=\"text\"]");
        var a = this.getFilteredData(this.rowData, selectBoxes[0].value, inputBoxes[0].value);
        var b = this.getFilteredData(a, selectBoxes[1].value, inputBoxes[1].value);
        var c = this.getFilteredData(b, selectBoxes[2].value, inputBoxes[2].value);
        return c;
    }


    getFilteredData(data, header, signValue){
        if (signValue == "") return data;


        let sign = signValue.substring(0, 1);
        let value = signValue.substring(1).trim();
        let index = this.rowHeaders.indexOf(header);

        if (sign == ">"){
            let num = Number(value);
            return data.filter(r => (r[index] != undefined) && Number(r[index]) > num);
        }
        else if (sign == "<"){
            let num = Number(value);
            return data.filter(r => (r[index] != undefined) && Number(r[index]) < num);
        }
        else if (sign == "="){
            return data.filter(r => (r[index] != undefined) && r[index] == value);
        }
        else{
            console.log(signValue);
            let reg = new RegExp(signValue);
            return data.filter(r => reg.test(r[index]));
        }
    }



    setDataTo(table, headers, rowData, hightlightedHeaders = []){
        let tableHead = table.querySelector("thead");
        tableHead.innerHTML = "<tr>" + headers.map(x => "<th>" + x + "</th>").join("\n") + "</tr>";

        let tableBody = table.querySelector("tbody");
        tableBody.innerHTML = rowData.map(row => row.map(x => "<td>" + x + "</td>").join("\n")).map(x => "<tr>" + x + "</tr>").join("\n");
        //this.setBoldLineTo(table);
        //this.setCellColorTo(tableBody, 2);
        if (hightlightedHeaders.length != 0){
            hightlightedHeaders.forEach(h => {
                var i = headers.indexOf(h);
                var th = tableHead.querySelectorAll("th")[i];
                th.style.backgroundColor = "yellow";
                th.style.fontWeight = "bold";
                th.style.color = "red";
            })
      
        }
    }
}
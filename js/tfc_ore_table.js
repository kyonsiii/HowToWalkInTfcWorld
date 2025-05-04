class OreTableManager{
    constructor(tableEl, listEl){
        this.rowHeaders = "Category,RockName,Anvil,Flux,Kaolinite,Graphite,NativeCopper,Malachite,Tetraheadrite,Sphalerite,Bismuthinite,NativeGold,NativeSilver,Magnetite,Limonite,Hematite,Cassiterite,Garnierite,BituminousCoal,Lignite,Cinnabar,Cryolite,Saltpeter,Sulfur,Sylvite,Borax,LapisLazli,Gypsum,Halite,Emerald,Kimberlite".split(",");
        this.data = [
            "Limestone,Sedimentary,,○,,,,○,,,○,,,○,○,,,,○,○,,,○,,,○,○,,○,,",
            "Dolomite, Sedimentary,,○,,,,△,,,○,,,○,○,,,,○,○,,,○,,,,,,○,,",
            "Chalk,Sedimentary,,○,,,,△,,,○,,,○,○,,,,○,○,,,○,,,,,,○,,",
            "Shale,Sedimentary,,,,,,,,,○,,,○,○,,,,○,○,○,,○,,○,○,,,○,,",
            "Claystone,Sedimentary,,,,,,,,,○,,,○,○,,,,○,○,,,○,,○,○,,,○,,",
            "Conglomerate,Sedimentary,,,,,,,,,○,,,○,○,,,,○,○,,,○,,,,,,○,,",
            "Chert,Sedimentary,,,,,,,,,○,,,○,○,,,,○,○,,,○,,○,,,,○,,",
            "Quartzite,Metamorphic,,,,○,,,○,,,,,,,,,,,,○,,,,,,,○,,,",
            "Slate,Metamorphic,,,,,,,○,,,,,,,,,,,,,,,,,,,○,,,",
            "Phyllite,Metamorphic,,,,,,,○,,,,,,,,,,,,,,,,,,,○,,,",
            "Schist,Metamorphic,,,,○,,,○,,,,○,,,,,,,,,,,,,,,○,,,",
            "Gneiss,Metamorphic,,,,○,,,○,,,,○,,,,,,,,,,,,,,,○,,,",
            "Marble,Metamorphic,,,,○,,○,○,,,,,,,,,,,,,,,,,,○,○,,,",
            "Rhyolite,IgneousExtrusive,○,,,,○,,,△,,○,,,,○,,,,,,,,,,,,,,,",
            "Basalt,IgneousExtrusive,○,,,,○,,,△,,○,,,,○,,,,,,,,,,,,,,,",
            "Andesite,IgneousExtrusive,○,,,,○,,,△,,○,,,,○,,,,,,,,,,,,,,,",
            "Dacite,IgneousExtrusive,○,,,,○,,,△,,○,,,,,,,,,,,,,,,,,,,",
            "Granite,IgneousIntrusive,○,,,,,,,○,○,○,○,,,,○,△,,,○,○,,○,,,,,,○,",
            "Diorite,IgneousIntrusive,○,,,,,,,○,○,○,○,,,,○,△,,,○,,,○,,,,,,○,",
            "Gabbro,IgneousIntrusive,○,,,,,,,○,○,○,,,,,○,○,,,○,,,○,,,,,,○,○"
            ].map(d => d.replace(" ","").split(","));

            this.table = tableEl;
            this.filterList = listEl;
            this.filterList.innerHTML = this.rowHeaders.map(x => "<option value=\"" + x + "\">" + x + "</option>").join("\n");

            let fertilizerOption = document.createElement("option");
            fertilizerOption.textContent = "≪Fertilizer≫";
            fertilizerOption.value = "Saltpeter,Sylvite";
            this.filterList.insertBefore(fertilizerOption, this.filterList.children[this.rowHeaders.indexOf("Saltpeter")]);

            let coalOption = document.createElement("option");
            coalOption.textContent = "≪Coal≫";
            coalOption.value = "BituminousCoal,Lignite";
            this.filterList.insertBefore(coalOption, this.filterList.children[this.rowHeaders.indexOf("BituminousCoal")]);

            let redStoneOption = document.createElement("option");
            redStoneOption.textContent = "≪Redstone≫";
            redStoneOption.value = "Cinnabar,Cryolite";
            this.filterList.insertBefore(redStoneOption, this.filterList.children[this.rowHeaders.indexOf("Cinnabar")]);

            let ironOption = document.createElement("option");
            ironOption.textContent = "≪Iron≫";
            ironOption.value = "Magnetite,Limonite,Hematite";
            this.filterList.insertBefore(ironOption, this.filterList.children[this.rowHeaders.indexOf("Magnetite")]);

            let copperOption = document.createElement("option");
            copperOption.textContent = "≪Copper≫";
            copperOption.value = "NativeCopper,Malachite,Tetraheadrite";
            this.filterList.insertBefore(copperOption, this.filterList.children[this.rowHeaders.indexOf("NativeCopper")]);

            this.filterList.addEventListener("change", (e) => {
                if (e.target.value == "Category" || e.target.value == "RockName"){
                    this.setDataTo(this.table, this.rowHeaders, this.data);
                    return;
                }
                                
                let selectedHeaders = e.target.value.split(",");
                let filteredData = this.getFilteredData(selectedHeaders, ["△", "○"]);
                this.setDataTo(this.table, this.rowHeaders, filteredData, selectedHeaders);
            });
    }

    getFilteredData(headers, values){
        let headerIndexes = headers.map(x => this.rowHeaders.indexOf(x));
        return this.data.filter(r => headerIndexes.some(i => values.some(v => r[i] == v)));
    }


    setDataTo(table, headers, rowData, hightlightedHeaders = []){
        let tableHead = table.querySelector("thead");
        tableHead.innerHTML = "<tr>" + headers.map(x => "<th>" + x + "</th>").join("\n") + "</tr>";

        let tableBody = table.querySelector("tbody");
        tableBody.innerHTML = rowData.map(row => row.map(x => "<td>" + x + "</td>").join("\n")).map(x => "<tr>" + x + "</tr>").join("\n");
        this.setBoldLineTo(table);
        this.setCellColorTo(tableBody, 2);
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

    setBoldLineTo(table){
        let tableBody = table.querySelector("tbody");
        let rows = tableBody.querySelectorAll("tr");
        let prevRockName = "";
        for (let i = 0; i < rows.length; i++){
            let tmpRockName = rows[i].children[1].textContent;
            if (tmpRockName != prevRockName){
                rows[i].classList.add("boldLineTop");
                prevRockName = tmpRockName;
            }
            else{
            }
        }
    }

    setCellColorTo(tbody, checkIndexFrom){
        let rows = tbody.querySelectorAll("tr");
        for (let i = 0; i < rows.length; i++){
            let cells = rows[i].children;
            for (let j = checkIndexFrom; j < cells.length; j++){
                let s = cells[j].textContent;
                cells[j].style.backgroundColor = (s == "") ? "darkgray"
                                                : (s == "○") ? "PaleGreen" : "lightyellow";
            }
        }
    }

}

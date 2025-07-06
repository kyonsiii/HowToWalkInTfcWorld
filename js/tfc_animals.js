class AnimalTableManager{
    constructor(table, filterTable){
        this.rowHeaders = ["名前", "℃<br>Min", "℃<br>Max", "Rain<br>Min", "Rain<br>Max", "生息地・備考", "Category"];
        this.rowData = [
            ["ホッキョクグマ[Polar Bear]","","10","100","","","Predators"],
            ["ハイイログマ[Grizzly Bear]","-15","15","200","","森","Predators"],
            ["ブラックベアー[Black Bear]","5","20","250","","森","Predators"],
            ["ピューマ[Cougar]","-10","21","150","","","Predators"],
            ["黒ヒョウ[Panther]","-10","21","150","","","Predators"],
            ["ライオン[Lion]","16","","50","300","平原","Predators"],
            ["トラ[Tigar]","13","","100","","森","Predators"],
            ["サーベルタイガー[Sabertooth]","0","","250","","","Predators"],
            ["オオカミ[Wolf]","","22","150","420","","Predators"],
            ["ダイアウルフ[Direwolf]","","0","150","420","オオカミみたいに飼いならせない","Predators"],
            ["ハイエナ[Hyena]","15","","80","380","","Predators"],
            ["ワニ[Crocodile]","15","","","","川・池・湿地","Predators"],
            ["ヤマネコ[Ocelot]","15","30","300","500","小動物を攻撃する。","Predators"],
            ["イノシシ[Boar]","-5","25","130","430","","Ramming"],
            ["ヘラジカ[Moose]","","10","150","300","森","Ramming"],
            ["ヌー[Wildebeest]","13","","90","380","平原","Ramming"],
            ["ウサギ[Rabbit]","","","15","","","Prey"],
            ["キツネ[Fox]","","25","130","400","","Prey"],
            ["シカ[Deer]","-15","25","130","400","","Prey"],
            ["トナカイ[Caribou]","","-9","110","550","","Prey"],
            ["ガゼル[Gazelle]","12","","90","380","平原","Prey"],
            ["ボンゴ[Bongo]","15","","230","500","森","Prey"],
            ["ライチョウ[Grouse]","-12","13","150","400","","Prey"],
            ["キジ[Pheasant ]","-12","13","150","400","森","Prey"],
            ["七面鳥[Turkey]","0","17","250","450","森","Prey"],
            ["クジャク[Peafowl]","14","","190","500","森","Prey"],
            ["ペンギン[Penguin]","","-14","75","","海岸","Aquatic"],
            ["ウミガメ[Sea Turtle]","21","","250","","海","Aquatic"],
            ["魚[Fish] ","","","","","海","Aquatic"],
            ["タラ[Cod]","","18","","","海","Aquatic"],
            ["フグ[Pufferfish]","10","","","","海","Aquatic"],
            ["クラゲ[Jellyfish]","18","","","","海","Aquatic"],
            ["南国の魚[Tropical Fish]","18","","","","海","Aquatic"],
            ["サーモン[Salmon]","-5","","","","川・湖","Aquatic"],
            ["ブルーギル[Bluegill]","-10","26","","","川・湖","Aquatic"],
            ["貝[Shellfish]","","","","","釣り餌になる","Aquatic"],
            ["ダイオウグソクムシ[Isopod]","","14","","","深い海","Aquatic"],
            ["ロブスター[Lobster]","","21","","","","Aquatic"],
            ["ザリガニ[Crayfish]","5","","125","","川・湖","Aquatic"],
            ["カブトガニ[Horseshoe Crab]","10","21","","400","moderate climate","Aquatic"],
            ["シャチ[Orca]","","19","","100","深い海","Aquatic"],
            ["イルカ[Dolphin]","10","","200","","","Aquatic"],
            ["マナテイ[Manatee]","20","","","300","湖","Aquatic"],
            ["イカ[Squid]","","","","","","Aquatic"]
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
            box.addEventListener("keyup", (e) => {
                this.setDataTo(this.table, this.rowHeaders, this.getFilteredDataFromFilterTables());
            })
        });


        this.setDataTo(this.table, this.rowHeaders, this.rowData);
    }
}
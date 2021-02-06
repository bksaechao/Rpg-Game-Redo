var myRpg = {
    characters: [
        afroSamurai = {
            id: "afroSamurai",
            name: "Afro Samurai",
            image: "assets/images/afroSamurai.jpg",
            health: 160,
            power: 10,
            isEnemy: false
        },
        dante = {
            id: "dante",
            name: "Dante",
            image: "assets/images/dante.png",
            health: 130,
            power: 10,
            isEnemy: false
        },
        samuraiJack = {
            id: "samuraiJack",
            name: "Samurai Jack",
            image: "assets/images/samuraiJack.png",
            health: 150,
            power: 10,
            isEnemy: false
        },
        vashTheStampede = {
            id: "vash",
            name: "Vash The Stampede",
            image: "assets/images/vash.png",
            health: 180,
            power: 10,
            isEnemy: false
        }
    ],

    userHero: null,
    isBattling: false,

    displayCharacters: function () {
        this.characters.forEach(character => {
            var charDiv = $("<div>");
            var charImg = $("<img>");
            var charName = $("<h3>");
            var charStats = $("<h2>");
            $(charDiv).addClass("col-md-2 character");
            $(charName).text(character.name);
            $(charStats).text(character.health);
            charDiv.attr("id", character.id);
            charDiv.css("position", "relative");
            charName.css({ "position": "absolute", "top": 180, "color": "purple", "text-align": "center" });
            charStats.css({ "position": "absolute", "top": 0, "color": "red", "text-align": "center" });
            charImg.attr({ "src": character.image, "alt": character.name });
            charImg.css({ "height": "225", "width": "150" });
            charDiv.append(charImg);
            charDiv.append(charName);
            charDiv.append(charStats);
            $(".characters").append(charDiv);
        })
    },

    handleQuery: function(charData) {
        this.handleCharSelect(charData);
        this.handleBattle(charData);
    },

    handleCharSelect: function (charData) {
        if (!this.isBattling){
            $(".characters").empty();
            // $(".enemies").empty();
            this.characters.forEach(character => {
                if (charData.attr("id") == character.id) {
                    this.userHero = character;
                    console.log("====================Hero====================");
                    console.log(this.userHero);
                    console.log("============================================");
                    var charDiv = $("<div>");
                    var charImg = $("<img>");
                    var charName = $("<h3>");
                    var charStats = $("<h2>");
                    $(charDiv).addClass("col-md-3 character hero");
                    $(charName).text(character.name);
                    $(charStats).text(character.health);
                    charDiv.attr("id", character.id);
                    charDiv.css("position", "relative");
                    charName.css({ "position": "absolute", "top": 180, "color": "purple", "text-align": "center" });
                    charStats.css({ "position": "absolute", "top": 0, "color": "red", "text-align": "center" });
                    charImg.attr({ "src": character.image, "alt": character.name });
                    charImg.css({ "height": "225", "width": "150" });
                    charDiv.append(charImg);
                    charDiv.append(charName);
                    charDiv.append(charStats);
                    $(".characters").append(charDiv);
                    $(".character-name").text("Hero");
                } else {
                    character.isEnemy = true;
                    console.log("====================Enemy===================");
                    console.log(character);
                    console.log("============================================");
                    var charDiv = $("<div>");
                    var charImg = $("<img>");
                    var charName = $("<h3>");
                    var charStats = $("<h2>");
                    $(charDiv).addClass("col-md-3 character enemy");
                    $(charName).text(character.name);
                    $(charStats).text(character.health);
                    charStats.attr("class", "char-stats")
                    charDiv.attr("id", character.id);
                    charDiv.css("position", "relative");
                    charName.css({ "position": "absolute", "top": 180, "color": "purple", "text-align": "center" });
                    charStats.css({ "position": "absolute", "top": 0, "color": "red", "text-align": "center" });
                    charImg.attr({ "src": character.image, "alt": character.name });
                    charImg.css({ "height": "225", "width": "150" });
                    charDiv.append(charImg);
                    charDiv.append(charName);
                    charDiv.append(charStats);
                    $(".enemies").append(charDiv);
                    $(".enemies-name").text("Enemies");
                }
            });
            this.isBattling = true;        
        }
    },

    handleBattle: function (charData) {
        if (this.isBattling) {
            this.characters.forEach(character => {
                if (charData.attr("id") === character.id && character.isEnemy) {
                    character.health -= this.userHero.power;
                    this.userHero.health -= character.power;
                    $(charData).children("h2").text(character.health);
                    $(".hero").children("h2").text(this.userHero.health);
                }
            })
        }
    }
};

$(document).ready(function () {
    myRpg.displayCharacters();
    var charData;
    $(document).on('click', ".character", function() {
        charData = $(this)
        myRpg.handleQuery(charData);
    })
});
var myRpg = {
    characters: [
        afroSamurai = {
            id: "afro-samurai",
            name: "Afro Samurai",
            image: "assets/images/afroSamurai.jpg",
            health: 160,
            power: 10,
            counterAtk: 40,
            isEnemy: false
        },
        danteImg = {
            id: "dante",
            name: "Dante",
            image: "assets/images/dante.png",
            health: 130,
            power: 10,
            counterAtk: 50,
            isEnemy: false
        },
        samuraiJack = {
            id: "samurai-jack",
            name: "Samurai Jack",
            image: "assets/images/samuraiJack.png",
            health: 150,
            power: 10,
            counterAtk: 30,
            isEnemy: false
        },
        vashTheStampede = {
            id: "vash",
            name: "Vash The Stampede",
            image: "assets/images/vash.png",
            health: 180,
            power: 10,
            counterAtk: 20,
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

    handleQuery: function (charData) {
        this.handleCharSelect(charData);
        this.handleBattle(charData);
    },

    createHero: function (character) {
        this.userHero = character;
        var charDiv = $("<div>");
        var charImg = $("<img>");
        var charName = $("<h3>");
        var charStats = $("<h2>");
        $(charDiv).addClass("col-md-3 character hero");
        $(charName).text(character.name);
        $(charStats).text(character.health);
        $(charStats).attr("class", "hero-stats")
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
        $(".character-name").text("Your Hero");
    },

    createItems: function () {
        var itemNav = $("<nav>");
        var navDiv = $("<div>");
        var aNav = $("<a>");
        var aBtn = $("<button>");
        var aBtnIcon = $("<span>");
        var navDivCollapse = $("<div>");
        var navList = $("<ul>");
        var navItemOne = $("<li>");
        var navItemTwo = $("<li>");
        var navPotion = $("<a>");
        var navAtkBoost = $("<a>");
        itemNav.addClass("navbar col-md-9 navbar-expand-lg navbar-light bg-light");
        navDiv.addClass("container-fluid");
        aNav.addClass("navbar-brand");
        aNav.text("Items");
        aBtn.addClass("navbar-toggler");
        aBtn.attr({ "type": "button", "data-bs-toggle": "collapse", "data-bs-target": "#navbarSupportedContent", "aria-controls": "navbarSupportedContent", "aria-expanded": "false", "aria-label": "Toggle navigation" });
        aBtnIcon.addClass("navbar-toggler-icon");
        navDivCollapse.addClass("collapse navbar-collapse");
        navDivCollapse.attr("id", "navbarSupportedContent");
        navList.addClass("navbar-nav");
        navItemOne.addClass("nav-item");
        navItemTwo.addClass("nav-item");
        navPotion.addClass("nav-link potion");
        navPotion.attr({"href":"#", "onClick":"myRpg.boostHp()"});
        navPotion.text("Potion");
        navAtkBoost.addClass("nav-link attack-boost");
        navAtkBoost.attr({"href":"#", "onClick":"myRpg.boostAtk()"});
        navAtkBoost.text("Atk Boost");
        aBtn.append(aBtnIcon);
        navItemOne.append(navPotion);
        navItemTwo.append(navAtkBoost);
        navList.append(navItemOne);
        navList.append(navItemTwo);
        navDivCollapse.append(navList);
        navDiv.append(aNav);
        navDiv.append(aBtn);
        navDiv.append(navDivCollapse);
        itemNav.append(navDiv);
        $(".characters").append(itemNav);
    },

    createEnemies: function (character) {
        character.isEnemy = true;
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
        $(".enemies").css("visibility", "initial")
        $(".enemies-name").text("Enemies");
    },

    handleCharSelect: function (charData) {
        if (!this.isBattling) {
            $(".characters").empty();
            $(".enemies").empty();
            this.characters.forEach(character => {
                if (charData.attr("id") == character.id) {
                    this.createHero(character);
                    this.createItems();
                } else {
                    this.createEnemies(character);
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
                    this.userHero.health -= character.counterAtk;
                    // this.attackEnemy(charData);
                    this.checkHealth(character, charData);
                    this.checkBattleResults(character);
                    $(charData).children("h2").text(character.health);
                    $(".hero").children("h2").text(this.userHero.health);
                }
            })
        }
    },

    checkHealth: function (character, charData) {
        console.log(
            character.name + ": " + character.health + "\n" +
            this.userHero.name + ": " + this.userHero.health
        );
        if (this.userHero.health <= 0) {
            $(".character-name").text("GAME OVER");
            alert("YOU LOSE!");
            window.location.reload();
        } else if (character.health <= 0) {
            $(".enemies-name").text("You defeated " + character.name);
            charData.fadeOut(function () {
                charData.remove();
            });
        }
    },

    checkBattleResults: function (character) {
        if ($(".enemies").children().length === 0) {
            $(".enemies-name").text("WINNER");
            this.restartBattle();
        } else if ($(".enemies-name").text().includes(character.name)) {
            setTimeout(function () {
                $(".enemies-name").text("Enemies");
            }, 800);
        }
    },

    boostAtk: function () {
        this.userHero.power += 100;
        console.log("Hero Power: " + this.userHero.power);
    },

    boostHp: function() {
        this.userHero.health += 30;
        console.log("Hero Health: " + this.userHero.health);
        $(".hero-stats").text(this.userHero.health); 
    },

    restartBattle: function () {
        var btn = $("<button>")
        btn.attr({ "id": "restart-btn", "onClick": "window.location.reload()" });
        btn.text("Retry?")
        $(".characters").append(btn);
    }
};

$(document).ready(function () {
    myRpg.displayCharacters();
    var charData;
    $(document).on("click", ".character", function () {
        charData = $(this)
        myRpg.handleQuery(charData);
    });
});
var myRpg = {
    characters: [
        mugenImg = {
            id: "mugen",
            name: "Mugen",
            image: "assets/images/mugen.png",
            health: 150,
            power: 10,
            counterAtk: 40,
            isEnemy: false
        },
        danteImg = {
            id: "dante",
            name: "Dante",
            image: "assets/images/dante.png",
            health: 120,
            power: 10,
            counterAtk: 50,
            isEnemy: false
        },
        mojoJojo = {
            id: "mojo-jojo",
            name: "Mojo Jojo",
            image: "assets/images/mojoJojo.png",
            health: 140,
            power: 10,
            counterAtk: 30,
            isEnemy: false
        },
        vashTheStampede = {
            id: "vash",
            name: "Vash",
            image: "assets/images/vash.png",
            health: 160,
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
            charName.css({ "position": "absolute", "top": 180, "color": "rgb(240, 144, 20)", "text-align": "center" });
            charStats.css({ "position": "absolute", "top": 0, "color": "rgb(10, 221, 21)", "text-align": "center" });
            charImg.attr({ "src": character.image, "alt": character.name });
            charImg.css({ "height": "225", "width": "150" });
            charDiv.append(charImg);
            charDiv.append(charName);
            charDiv.append(charStats);
            $(".characters").append(charDiv);
        })
    },

    handleCharacter: function (charData) {
        this.handleCharSelect(charData);
        this.handleBattle(charData);
    },

    handleItem: function (itemData) {
        if (itemData.hasClass("potion") && $("#restart-btn").length === 0) {
            this.boostHp(itemData);
        } else if (itemData.hasClass("atk-boost") && $("#restart-btn").length === 0) {
            this.boostAtk(itemData);
        }
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
        // charDiv.attr("id", character.id);
        charDiv.css("position", "relative");
        charName.css({ "position": "absolute", "top": 180, "color": "rgb(240, 144, 20)", "text-align": "center", });
        charStats.css({ "position": "absolute", "top": 0, "color": "rgb(10, 221, 21)", "text-align": "center" });
        charImg.attr({ "src": character.image, "alt": character.name, "class": "hero-img" });
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
        itemNav.css("opacity", "0.7")
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
        navPotion.attr("href", "#");
        navPotion.text("Potion");
        navAtkBoost.addClass("nav-link atk-boost");
        navAtkBoost.attr("href", "#");
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
        charName.css({ "position": "absolute", "top": 180, "color": "rgb(240, 144, 20)", "text-align": "center" });
        charStats.css({ "position": "absolute", "top": 0, "color": "rgb(10, 221, 21)", "text-align": "center" });
        charImg.attr({ "src": character.image, "alt": character.name });
        charImg.css({ "height": "225", "width": "150" });
        charDiv.append(charImg);
        charDiv.append(charName);
        charDiv.append(charStats);
        $(".enemies").append(charDiv);
        $(".enemies").css("visibility", "initial");
        $(".enemies-name").text("Enemies");
        $(".enemies-name").css("visibility", "initial");
    },

    handleCharSelect: function (charData) {
        if (!this.isBattling && $("#restart-btn").length === 0) {
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
                    this.checkHealth(character, charData);
                    this.checkBattleResults(character);
                    $(charData).children("h2").text(character.health);
                    $(".hero").children("h2").text(this.userHero.health);
                }
            })
        }
    },

    checkHealth: function (character, charData) {
        if (this.userHero.health <= 0) {
            $(".enemies-name").text("GAME OVER");
            this.isBattling = false;
            this.restartBattle();
        } else if (character.health <= 0) {
            $(".enemies-name").text("You defeated " + character.name);
            charData.remove();
            this.createPotion();
        }
    },

    checkBattleResults: function (character) {
        if ($(".enemies").children().length === 0) {
            $(".enemies-name").text("WINNER");
            $(".enemies").css("visibility", "hidden");
            this.isBattling = false;
            this.restartBattle();
        }
    },

    createPotion: function () {
        var navItem = $("<li>");
        var navPotion = $("<a>");
        navItem.addClass("nav-item");
        navPotion.addClass("nav-link potion");
        navPotion.attr("href", "#");
        navPotion.text("Potion");
        navItem.append(navPotion);
        $(".navbar-nav").append(navItem);
    },

    boostAtk: function (itemData) {
        this.userHero.power += 100;
        $(".hero-img").css("border", "1px solid red");
        itemData.remove();
    },

    boostHp: function (itemData) {
        this.userHero.health += 30;
        $(".hero-stats").text(this.userHero.health);
        itemData.remove();
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
    var itemData;

    $(document).on("click", ".character", function () {
        charData = $(this);
        myRpg.handleCharacter(charData);
    });

    $(document).on("click", ".nav-link", function () {
        itemData = $(this);
        myRpg.handleItem(itemData);
    })
});
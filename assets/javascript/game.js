var myRpg = {
    characters: [
        afroSamurai = {
            id: "afroSamurai",
            name: "Afro Samurai",
            image: "assets/images/afroSamurai.jpg",
            power: 160,
            health: null
        },
        dante = {
            id: "dante",
            name: "Dante",
            image: "assets/images/dante.png",
            power: 200,
            health: null
        },
        samuraiJack = {
            id: "samuraiJack",
            name: "Samurai Jack",
            image: "assets/images/samuraiJack.png",
            power: 150,
            health: null
        },
        vashTheStampede = {
            id: "vash",
            name: "Vash The Stampede",
            image: "assets/images/vash.png",
            power: 180,
            health: null
        }
    ],

    userHero: null,

    displayCharacters: function () {
        this.characters.forEach(character => {
            var charDiv = $("<div>");
            var charImg = $("<img>");
            var charName = $("<h1>");
            var charStats = $("<h2>");
            $(charDiv).addClass("col-md-2 hero");
            $(charName).text(character.name);
            $(charStats).text(character.power);
            charDiv.attr("id", character.id);
            charDiv.css("position", "relative");
            charName.css({ "position": "absolute", "top": 200, "color": "yellow", "text-align": "center" });
            charStats.css({ "position": "absolute", "top": 0, "color": "red", "text-align": "center" });
            charImg.attr({ "src": character.image, "alt": character.name });
            charImg.css({ "height": "300", "width": "175" });
            charDiv.append(charImg);
            charDiv.append(charName);
            charDiv.append(charStats);
            $(".characters").append(charDiv);
        })
    },

    handleCharSelect: function () {
        this.characters.forEach(character => {
            if (charId === character.id) {
                this.userHero = character;
                console.log(character);
            }
        })
    }
};

$(document).ready(function () {
    myRpg.displayCharacters();
    $(".hero").on("click", function () {
        var charId = $(this).attr("id");
        console.log(charId);
    })
})
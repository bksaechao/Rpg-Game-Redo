var myRpg = {
    characters: [
        characterOne = {
            image: "assets/images/afroSamurai.jpg",
            power: 1,
            health: null
        },
        characterTwo = {
            image: "assets/images/dante.png",
            power: 2,
            health: null
        },
        characterThree = {
            image: "assets/images/samuraiJack.png",
            power: 3,
            health: null
        },
        characterFour = {
            image: "assets/images/vash.png",
            power: 4,
            health: null
        }
    ],

    displayCharacters: function () {
        this.characters.forEach(character => {
            var charDiv = $("<div>");
            var charImg = $("<img>");
            charImg.attr({"src":character.image, "alt":character});
            charImg.css({ "height": "250", "width": "200" });
            charDiv.append(charImg);
            $(".characters").append(charDiv);
            console.log(charImg.alt);
        })
    }
};

$(document).ready(function () {
    myRpg.displayCharacters();
})
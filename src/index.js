import _ from 'lodash';
import Vue from 'vue';
import { Hooper, Slide,  Navigation as HooperNavigation} from 'hooper';

var app = new Vue({
    el: '#app',
    components: {
        Hooper,
        Slide,
        HooperNavigation
      },
    data: {
        meat: {
            chinese: [
                "chicken",
                "pork",
                "tofu",
                "shrimp",
                "lamb",
            ],
            indian: [
                "paneer",
                "beans",
                "chicken",
                "shrimp",
            ]
        },
        veggie: {
            chinese: [
                "bok choy",
                "napa cabbage",
                "green beans",
                "eggplant",
                "cucumber",
                "enoki",
                "lotus root",
            ],
            indian: [
                "zucchini",
                "okra",
                "tomato",
                "tindola",
                "eggplant",
                "spinach",
            ]
        },
        grain: {
            chinese: [
                "rice",
                "potato",
                "rice cake",
            ],
            indian: [
                "basmati rice",
                "roti",
                "noodles",
                "lentils",
                "thepla"
            ]
        },
        flavors: {
            chinese: [
                "soy sauce",
                "ginger",
                "garlic",
                "cumin",
                "doubanjiang",
                "chili",
            ],
            indian: [
                "turmeric",
                "chili powder",
                "hing",
                "coconut milk",
            ]
        },
        fleshType: "meat",
        selectedArea:0,
        cuisine: "",
        flavorCarouselIndex: 0,
        fleshCarouselIndex: 0,
    },
    computed: {
        flavorList: function() {
            return this.flavors[this.cuisine];
        },

        fleshList: function() {
            if (this.fleshType === "meat") {
                return this.meat[this.cuisine];
            } else if (this.fleshType === "veggie") {
                return this.veggie[this.cuisine];
            } else if (this.fleshType === "grain") {
                return this.grain[this.cuisine];
            }
        }
    },
    watch: {
        flavorCarouselIndex() {
            this.$refs.flavorCarousel.slideTo(this.flavorCarouselIndex);
        },
        fleshCarouselIndex() {
            this.$refs.fleshCarousel.slideTo(this.fleshCarouselIndex);
        }
    },
    methods:{
        submit: function(){
            var query = "";
            var sliders = document.getElementsByClassName("hooper-track");
            for(var i = 0; i < sliders.length;i++){
                var allCards = sliders[i].children;
                console.log(allCards);
                for(var j = 0;j<allCards.length;j++){
                    if(allCards[j].classList.contains("is-active")){
                        var text = allCards[j].innerHTML.trim().replace(/\s/g, '+');
                        query += text + "+"
                    }
                }
            }
            //add cuisine
            query+=this.cuisine+"+";
            query+="recipe";
            var link = "https://www.google.com/search?q=" + query;
            window.open(link, '_blank');
        },
        updateFlavorCarousel(payload) {
            this.flavorCarouselIndex = payload.currentSlide;
        },
        updateFleshCarousel(payload) {
            this.fleshCarouselIndex = payload.currentSlide;
        },
        switchCuisine: function(newCuisine){
            var flags = document.getElementById("cuisineSelector").children;
            for(var i = 0;i< flags.length;i++){
                flags[i].classList.remove("selected");
            }
            this.cuisine = newCuisine
            document.getElementById(newCuisine).classList.add("selected");
            this.flavorCarouselIndex = 0;
            this.fleshCarouselIndex = 0;
        },
        switchFlesh: function(newFlesh){
            var types = document.getElementById("fleshTypeLegend").children;
            for(var i = 0;i< types.length;i++){
                types[i].classList.remove("selected");
            }
            document.getElementById(newFlesh).classList.add("selected");
            this.fleshType = newFlesh;
            this.fleshCarouselIndex = 0;
        }
    }
})

window.onload = function(){
    //focus on first area
    document.getElementsByClassName("area")[0].focus();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(!urlParams.has('cuisine')){
        app.cuisine = "chinese";
        document.getElementById("chinese").classList.add("selected");
    }
    else{
        if(document.getElementById("chinese") != undefined){
            app.cuisine = urlParams.get('cuisine');
            document.getElementById(urlParams.get('cuisine')).classList.add("selected");
        }else{
            app.cuisine = "chinese";
            document.getElementById("chinese").classList.add("selected");
        }

    }
}

document.addEventListener('keyup', event => {
    switch(event.code) {
        case "KeyM":
            app.fleshType = "meat";
            app.switchFlesh("meat");
            break;
        case "KeyV":
            app.fleshType = "veggie";
            app.switchFlesh("veggie");
            break;
        case "KeyG":
            app.fleshType = "grain";
            app.switchFlesh("grain");
            break;
        case "ArrowLeft":
            if(app.selectedArea !== 0){
                app.selectedArea--;
            }
            document.getElementsByClassName("area")[app.selectedArea].focus();
            break;
        case "ArrowRight":
            if(app.selectedArea < document.getElementsByClassName("area").length - 1){
                app.selectedArea++;
            }
            document.getElementsByClassName("area")[app.selectedArea].focus();
            break;
        case "Digit1":
            app.switchCuisine("chinese");
            break;
        case "Digit2":
            app.switchCuisine("indian");
            break;
    }

})

export default app;
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
        proteins: [
            "chicken",
            "pork",
            "tofu",
            "shrimp",
            "lamb",      
            ],
        vegetables: [
            "bok choy",
            "napa cabbage",
            "green beans",
            "eggplant",
            "cucumber",
            "enoki",
            "lotus root"
        ],
        grains: [
            "rice",
            "potato",
            "rice cake",
        ],
        flavors: [
            "soy sauce",
            "ginger",
            "garlic",    
            "cumin",
            "doubanjiang",
            "chili",
            ],
        fleshTypeKeyCode: "KeyM",
        selectedArea:0
    },
    computed: {
        fleshType: function() {
            if (this.fleshTypeKeyCode === "KeyM") {
                return this.proteins;
            } else if (this.fleshTypeKeyCode === "KeyV") {
                return this.vegetables;    
            } else if (this.fleshTypeKeyCode === "KeyG") {
                return this.grains; 
            }
        }
    },
    methods:{
        submit: function(){
            var link = "https://www.google.com/search?q=chicken"
            window.open(link, '_blank');
        },
        switchCuisine: function(cuisine){
            alert(cuisine);
        }
    }
})

document.addEventListener('keyup', event => {
    switch(event.code) {
        case "KeyM":
        case "KeyV":
        case "KeyG":
            app.fleshTypeKeyCode = event.code;
        case "ArrowLeft":
            if(app.selectedArea !== 0){
                app.selectedArea--;
            }
            document.getElementsByClassName("area")[app.selectedArea].focus();
            break;
        case "ArrowRight":
            if(app.selectedArea <= document.getElementsByClassName("area").length){
                app.selectedArea++;
            }
            document.getElementsByClassName("area")[app.selectedArea].focus();
            break;
    }

})

export default app;
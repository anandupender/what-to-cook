import _ from 'lodash';
import Vue from 'vue';
import { Hooper, Slide,  Navigation as HooperNavigation} from 'hooper';

var app = new Vue({
    el: '#main',
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
            ],
        flavors: [
            "soy sauce",
            "ginger",
            "garlic",              
            ]
    }
})

export default app;
import Vue from "nativescript-vue";
import Vuex from "vuex";

Vue.use(Vuex);

let initialState = {
  product: {
    categories: []
  },
  orders: []
};

const store = new Vuex.Store({
  strict: true,
  state: Vue.util.extend({}, initialState),
  mutations: {
    updateModel: function(state, user) {
      Object.assign(state, user);
    }
  }
});

Vue.prototype.$store = store;

var firebase = require("nativescript-plugin-firebase");
firebase
  .init({
    // persist: false
  })
  .then(
    function(instance) {
      console.log("firebase init");

      let categoriesCollection = firebase.firestore
        .collection("categories")
        .get()
        .then(querySnapshot => {
          let categories = [];
          querySnapshot.forEach(doc => {
            // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            categories.push(doc.data().name);
          });
          let product = {
            categories: categories
          };
          store.commit("updateModel", { product: product });
        });
    },
    function(error) {
      console.log("firebase error");
    }
  );

Vue.prototype.$firebase = firebase;

Vue.filter("concat", function(value, key) {
  return value + key;
});

Vue.prototype.$filters = Vue.options.filters;

Vue.registerElement(
  "RadSideDrawer",
  () => require("nativescript-ui-sidedrawer").RadSideDrawer
);

Vue.component("RadListView", require("./RadListView"));

import { TNSFontIcon, fonticon } from "nativescript-fonticon";

TNSFontIcon.paths = {
  fa: "./FontAwesome.css"
};

TNSFontIcon.loadCss();

Vue.filter("fonticon", fonticon);

import home from "./components/home";
import products from "./components/products";
import product_add from "./components/product_add";
import orders from "./components/orders";
import specials from "./components/specials";

import "./styles.scss";

// Uncomment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new Vue({
  render: h => h(home)
}).$start();

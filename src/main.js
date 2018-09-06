import Vue from "nativescript-vue";
import Vuex from "vuex";

Vue.use(Vuex);

let initialState = {
  products: [],
  categories: [],
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
          store.commit("updateModel", { categories: categories });
        });

      let productsCollection = firebase.firestore.collection("products");

      productsCollection.get().then(querySnapshot => {
        let products = [];
        querySnapshot.forEach(doc => {
          products.push(doc.data());
          products[products.length - 1]["id"] = doc.id;
        });
        store.commit("updateModel", { products: products });
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
import special_add from "./components/special_add";

import "./styles.scss";

// Uncomment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new Vue({
  render: h => h(home)
}).$start();

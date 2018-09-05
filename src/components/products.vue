<template>
  <Page class="page" @loaded="loaded">
    <ActionBar class="action-bar">
      <StackLayout orientation="horizontal" ref="actionBar">
        <Label class="fa" :text="'fa-arrow-left' | fonticon" width="20%" style="font-size: 22;" @tap="$navigateBack" />
        <Label text="" width="60%" />
        <Label class="fa" :text="'fa-shopping-basket' | fonticon | concat(' ') | concat(orders.length)" width="20%" style="font-size: 22;" @tap="goToOrders" />
      </StackLayout>
    </ActionBar>

    <scrollview ref="scrollV">

    <menuList :items="products" @tap="productTap" @pull="onPullToRefresh" />

    </scrollview>

  </Page>
</template>

<script>
import menuList from "./partials/menuList";

import ordersPage from "./orders";

export default {
  name: "products",
  data() {
    return {
      isDrawerOpen: false,
      products: [],
      orders: [],
      ordersPage: ordersPage
    };
  },
  methods: {
    loaded: function() {
      let THIS = this;
      let productsCollection = this.$firebase.firestore.collection("products");
      // console.log(THIS.products);

      productsCollection
        .get()
        .then(querySnapshot => {
          return querySnapshot.forEach(doc => {
            THIS.products.push(doc.data());
            return this;
            // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
          });
        })
        .then(data => {
          // console.log(THIS.products);
        });
    },
    productTap: function(event) {
      // console.log(event.index);
      // console.log(event.item);
      this.orders.push(event.item);
      // console.log(this.orders);
    },
    goToOrders: function() {
      console.log("click go to orders");
      this.$store.commit("updateModel", { orders: this.orders });
      this.$navigateTo(ordersPage);
    },
    updateDrawer: function(value) {
      this.isDrawerOpen = value;
    },
    onPullToRefresh: function() {
      let THIS = this;
      let localProducts = [];
      // console.log("pull products");
      let productsCollection = this.$firebase.firestore.collection("products");
      // console.log("after collection");

      productsCollection
        .get()
        .then(querySnapshot => {
          return querySnapshot.forEach(doc => {
            // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            localProducts.push(doc.data());
            return this;
          });
        })
        .then(data => {
          // console.log("concat products");
          // console.log(THIS.products.length);
          // console.log(localProducts.length);
          THIS.products.concat(localProducts);
          // console.log(THIS.products.length);
        });
    }
  },
  components: {
    menuList
  }
};
</script>

<style scoped>
</style>

<template>
  <Page ref="mainPage" class="page" @loaded="loaded">
    <ActionBar class="action-bar">
      <StackLayout orientation="horizontal" ref="actionBar">
        <Label class="fa" :text="'fa-bars' | fonticon" width="20%" style="font-size: 22;" @tap="isDrawerOpen = !isDrawerOpen" />
        <Label text="Route 65" width="60%" />
x        <Label class="fa" :text="'fa-shopping-basket' | fonticon | concat(' ') | concat($store.state.orders.length)" width="20%" style="font-size: 22;" @tap="goToOrders" />
      </StackLayout>
    </ActionBar>

    <scrollview ref="scrollV">
      <h-sideBar :open="isDrawerOpen" @change="updateDrawer" :key="'home'">
      </h-sideBar>
    </scrollview>
  </Page>
</template>

<script>
import orders from "./orders";

import sideBar from "./partials/sideBar";

export default {
  name: "home",
  data() {
    return {
      isDrawerOpen: false,
      name: "",
      description: "",
      cost_price: "",
      imageurl: "",
      sell_price: "",
      slug: ""
    };
  },
  methods: {
    updateDrawer: function(value) {
      this.isDrawerOpen = value;
    },
    loaded: function() {},
    goToOrders: function() {
      console.log("click go to orders");
      this.$navigateTo(ordersPage);
    }
  },
  components: {
    "h-sideBar": sideBar
  }
};
</script>

<style scoped>
</style>

<template>
  <Page class="page" @loaded="loaded">
    <ActionBar class="action-bar">
      <StackLayout orientation="horizontal" ref="actionBar">
        <Label class="fa" :text="'fa-arrow-left' | fonticon" width="20%" style="font-size: 22;" @tap="$navigateBack" />
        <Label text="" width="60%" />
        <Label text="" width="20%" />
      </StackLayout>
    </ActionBar>

    <scrollview ref="scrollV">
      <sideBar :open="isDrawerOpen" @change="updateDrawer">
        
        <RadListView for="order in orders" pullToRefresh="true" @pullToRefreshInitiated="onPullToRefreshInitiated" @itemTap="orderTap" style="height: 400;">
          <ListViewGridLayout v-tkListViewLayout scrollDirection="Vertical" spanCount="1" itemInsertAnimation="Slide" />

          <v-template>
            <GridLayout class="list-group-item" rows="auto" columns="100, *">
              <Image row="0" col="0" src="~/images/burger.jpg" />
              <StackLayout row="0" col="1" style="padding-left: 20;">
                  <Label :text="order.name" />
                  <Label :text="order.description" />
              </StackLayout>
            </GridLayout>
          </v-template>

        </RadListView>

        <StackLayout>
          <Label :text="'Sub-Total: R' + totalAmount" />
          <Label :text="'VAT @ (0%): R0.00'" />
          <Label :text="'Total: R' + totalAmount" />
        </StackLayout>

        <Button text="Checkout" style="background-color: orange; color: white;" />
        
      </sideBar>
    </scrollview>

  </Page>
</template>

<script>
import sideBar from "./partials/sideBar";

export default {
  name: "products",
  data() {
    return {
      isDrawerOpen: false,
      orders: [],
      listViewHeight: 400,
      bottomPanelHeight: 200
    };
  },
  computed: {
    totalAmount() {
      return this.orders
        .reduce((a, b) => {
          return a + parseFloat(b.sell_price);
        }, 0)
        .toFixed(2);
    }
  },
  methods: {
    loaded: function() {
      let THIS = this;
      // this.fixLayouts();
      this.orders = this.$store.state.orders;
    },
    fixLayouts: function() {
      const platformModule = require("tns-core-modules/platform");

      let THIS = this;
      this.$nextTick(() => {
        setTimeout(function() {
          // console.log("fixing screen layout");
          // console.log(
          // "ScreenSize: " + platformModule.screen.mainScreen.heightPixels
          // );
          // console.log(
          //   THIS.$refs.mainContentView.nativeView.getActualSize().height
          // );
          if (THIS.$refs.scrollV)
            console.log(THIS.$refs.scrollV.nativeView.getActualSize().height);
        }, 50);
      });
    },
    orderTap: function(event) {
      // console.log(event.index);
      // console.log(event.item);
    },
    updateDrawer: function(value) {
      this.isDrawerOpen = value;
    },
    onPullToRefreshInitiated(args) {
      const listView = args.object;
      console.log("pull to refresh");
      setTimeout(() => {
        this.items = ["abc", "def", "lol"];
        listView.notifyPullToRefreshFinished();
      }, 2000);
    }
  },
  components: {
    sideBar: sideBar
  }
};
</script>

<style scoped>
</style>

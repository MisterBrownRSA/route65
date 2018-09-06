<template>
    <StackLayout @loaded="loaded">
        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent class="drawerContent">
                <StackLayout height="56" style="text-align: center; vertical-align: center; color: white;">
                    <Label text="Navigation Menu" />
                </StackLayout>
                <StackLayout :height="pageHeight - 56 - 56" class="pageHeadings" style="padding: 0 20;">
                    <Label class="fa" :text="'fa-lemon' | fonticon | concat(' Products')" @tap="goToProducts" />
                    <Label class="fa" :text="'fa-plus' | fonticon | concat(' Product Add')" @tap="goToProductAdd" />
                    <Label class="fa" :text="'fa-dollar-sign' | fonticon | concat(' Specials')" @tap="goToSpecials" />
                    <Label class="fa" :text="'fa-plus' | fonticon | concat(' Special Add')" @tap="goToSpecialAdd" />
                </StackLayout>
                <StackLayout height="56">
                    <Label text="Close" color="lightgray" padding="10" style="horizontal-align: center" @tap="onCloseDrawerTap" />
                </StackLayout>
            </StackLayout>

            <StackLayout :height="pageHeight" ~mainContent>
                <slot></slot>
            </StackLayout>
        </RadSideDrawer>
    </StackLayout>
</template>

<script>
import products from "../products";
import product_add from "../product_add";
import specials from "../specials";
import special_add from "../special_add";

export default {
  name: "sideBar",
  data() {
    return {
      isDrawerOpen: false,
      pageHeight: "400"
    };
  },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    open: function(bool) {
      if (bool)
        this.onOpenDrawerTap(); //if true
      else this.onCloseDrawerTap();
    }
  },
  methods: {
    goToProducts: function() {
      this.$navigateTo(products);
    },
    goToProductAdd: function() {
      this.$navigateTo(product_add);
    },
    goToSpecials: function() {
      this.$navigateTo(specials);
    },
    goToSpecialAdd: function() {
      this.$navigateTo(special_add);
    },
    onOpenDrawerTap() {
      this.$refs.drawer.nativeView.showDrawer();
      this.$emit("change", true);
    },
    onCloseDrawerTap() {
      this.$refs.drawer.nativeView.closeDrawer();
      this.$emit("change", false);
    },
    loaded: function() {
      let THIS = this;

      const platformModule = require("tns-core-modules/platform");
      setTimeout(function() {
        // console.log(platformModule.screen.mainScreen.heightDIPs);
        THIS.pageHeight = platformModule.screen.mainScreen.heightDIPs - 80 - 50; //action bar
      }, 50);
    }
  }
};
</script>

<style lang="scss">
.pageHeadings {
  label {
    height: 40;
    color: white;
    font-size: 20;
    font-weight: bold;
  }
}

.drawerContent {
  height: 100%;
  StackLayout {
    background-color: black;
  }
}
</style>

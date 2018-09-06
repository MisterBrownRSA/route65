<template>
  <Page class="page" @loaded="loaded">
    <ActionBar class="action-bar">
      <StackLayout orientation="horizontal" ref="actionBar">
        <Label class="fa" :text="'fa-arrow-left' | fonticon" width="20%" style="font-size: 22;" @tap="$navigateBack" />
        <Label text="Product Add" width="60%" />
        <Label text="" width="20%" />
      </StackLayout>
    </ActionBar>

    <scrollview ref="scrollV">
      <StackLayout>
        <Label textWrap=true text="Name"/>
        <TextField v-model="name" hint="" />
        <Label textWrap=true text="Description"/>
        <TextView v-model="description" hint="" height="200" />
        <Label textWrap=true text="Cost Price"/>
        <TextField v-model="cost_price" hint="0.00" keyboardType="number" />
        <Label textWrap=true text="Sell Price"/>
        <TextField v-model="sell_price" hint="0.00" keyboardType="number" />
        <Label textWrap=true text="Category"/>

        <ListPicker :items="categories" v-model="selectedCategory" />
        <!-- <Label textWrap=true text="imageurl"/> -->
        <!-- <TextField v-model="imageurl" hint="Enter text..." /> -->
        
        <Button class="btn btn-primary" text="Add New" @tap="addProduct" />
      </StackLayout>
    </scrollview>

  </Page>
</template>

<script>
import sideBar from "./partials/sideBar";

export default {
  name: "product_add",
  data() {
    return {
      name: "",
      description: "",
      cost_price: 0,
      sell_price: 0,
      // imageurl: "",

      categories: [],
      selectedCategory: 0
    };
  },
  methods: {
    addProduct: function() {
      let THIS = this;
      let productsCollection = this.$firebase.firestore.collection("products");
      productsCollection
        .add({
          name: THIS.name,
          description: THIS.description,
          cost_price: THIS.cost_price,
          sell_price: THIS.sell_price,
          units_sold: 0,
          slug: "",
          image_url: "",
          category_id: THIS.selectedCategory + 1
        })
        .then(ref => {
          console.log(`{ref.id}`);
          THIS.name = "";
          THIS.description = "";
          THIS.cost_price = 0;
          THIS.sell_price = 0;
        });
    },
    loaded: function() {
      let THIS = this;
      THIS.categories = THIS.$store.state.categories;
    }
  },
  components: {
    sideBar
  }
};
</script>

<style scoped>
</style>

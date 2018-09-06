<template>
  <Page class="page" @loaded="loaded">
    <ActionBar class="action-bar">
      <StackLayout orientation="horizontal" ref="actionBar">
        <Label class="fa" :text="'fa-arrow-left' | fonticon" width="20%" style="font-size: 22;" @tap="$navigateBack" />
        <Label text="Special Add" width="60%" />
        <Label text="" width="20%" />
      </StackLayout>
    </ActionBar>

    <scrollview ref="scrollV">
      <StackLayout>
        <Label textWrap=true text="Select Product"/>
        <ListPicker :items="productNames" v-model="selectedProduct" />

        <Label textWrap=true text="Special Price"/>
        <TextField v-model="price" hint="0.00" keyboardType="number" />
        <Label textWrap=true text="Starts at:"/>
        <DatePicker v-model="started_at" :minDate="today" />
        <Label textWrap=true text="Ends at:"/>
        <DatePicker v-model="stopped_at" :minDate="today" />
        <!-- <Label textWrap=true text="imageurl"/> -->
        <!-- <TextField v-model="imageurl" hint="Enter text..." /> -->
        
        <Button class="btn btn-primary" text="Add New" @tap="addSpecial" />
      </StackLayout>
    </scrollview>

  </Page>
</template>

<script>
export default {
  name: "special_add",
  data() {
    return {
      price: "",
      products: [],
      selectedProduct: 0,
      today: Date.now(),
      started_at: new Date(),
      stopped_at: new Date()
    };
  },
  computed: {
    productNames() {
      return this.products.map(product => {
        return product.name;
      });
    }
  },
  methods: {
    addSpecial: function() {
      let THIS = this;
      console.log("add special");

      // console.log(this.price);
      // console.log(this.started_at);
      // console.log(this.stopped_at);
      // console.log(this.today);
      // console.log(this.selectedProduct);
      // console.dir(this.products[this.selectedProduct]);

      let specialCollection = this.$firebase.firestore.collection("specials");
      specialCollection
        .add({
          price: THIS.price,
          started_at: THIS.started_at,
          stopped_at: THIS.stopped_at,
          product_id: THIS.products[THIS.selectedProduct]["id"],
          created_at: Date.now().toString()
        })
        .then(ref => {
          console.log(`${ref.id}`);
          THIS.price = "";
          THIS.selectedProduct = 0;
          THIS.started_at = new Date();
          THIS.stopped_at = new Date();
        });
    },
    loaded: function() {
      console.log(this.$store.state.products.length);
      // if (this.$state.store.products.length > 0) {
      this.products = this.$store.state.products;
      // }
      // console.log(this.products.length);
    }
  }
};
</script>

<style lang="scss">
</style>

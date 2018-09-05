<template>
  <RadListView for="item in items" pullToRefresh="true" @pullToRefreshInitiated="onPullToRefreshInitiated" @itemTap="itemTap" style="height: 100%;">
          <ListViewGridLayout v-tkListViewLayout scrollDirection="Vertical" itemHeight="200" spanCount="1" itemInsertAnimation="Slide" />

          <v-template>
              <GridLayout class="list-group-item" rows="auto" columns="100, *">
                <Image row="0" col="0" src="~/images/burger.jpg" />
                <StackLayout row="0" col="1" style="padding-left: 20;">
                    <Label :text="item.name" textWrap="true" />
                    <Label :text="item.description" textWrap="true" />
                    <Label :text="'R ' + item.sell_price" textWrap="true" />
                </StackLayout>
              </GridLayout>
          </v-template>

        </RadListView>
</template>

<script>
let listView;
export default {
  name: "menuList",
  data() {
    return {};
  },
  watch: {
    items: function(event, old) {
      if (typeof listView !== "undefined")
        listView.notifyPullToRefreshFinished();
      console.log(this.event);
    }
  },
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  methods: {
    itemTap: function(event) {
      console.log("itemTapped");
      this.$emit("tap", event);
    },
    onPullToRefreshInitiated(args) {
      // console.log("pull");
      listView = args.object;
      this.$emit("pull");
      setTimeout(function() {
        listView.notifyPullToRefreshFinished();
      }, 1000);
    }
  }
};
</script>

<style lang="scss">
</style>

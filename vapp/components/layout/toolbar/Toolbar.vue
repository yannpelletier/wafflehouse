<template>
  <div>
    <v-card width="100%" tile color="transparent">
      <v-col cols="12">
        <v-row>
          <v-col cols="6" md="3" class="pa-0 ma-0">
            <toolbar-button
              :image="require('~/static/layout/house-icon.png')"
              to="/"
              label="Home"
            />
          </v-col>
          <v-col cols="6" md="3" class="pa-0 ma-0">
            <toolbar-button
              :image="require('~/static/layout/my-waffles-icon.png')"
              show-waffle
              to="/my-waffles"
              label="My Waffles"
            />
          </v-col>
          <v-col cols="6" md="3" class="pa-0 ma-0">
            <toolbar-button
              :image="require('~/static/layout/my-waffles-icon.png')"
              to="/vote"
              label="Vote"
            />
          </v-col>
          <v-col cols="6" md="3" class="pa-0 ma-0">
            <toolbar-button to="/rules" label="Rules" />
          </v-col>
        </v-row>
        <v-row align="center" justify="center" style="height: 50px">
          <toolbar-news />
        </v-row>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import ToolbarButton from "~/components/layout/toolbar/ToolbarButton";
import ToolbarNews from "~/components/layout/toolbar/ToolbarNews";

export default {
  name: "TopBar",
  components: {
    ToolbarButton,
    ToolbarNews,
  },
  props: {
    hide: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.button-container-background {
  background: url(../../../static/top-bar-background.png) repeat;
}
</style>

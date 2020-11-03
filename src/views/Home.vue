<template>
  <v-container class="home">
    <v-row>
      <sidebar />
      <v-col>
        <products-list />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

import ProductsList from "../components/products/ProductsList.vue";
import Sidebar from "../components/nav/Sidebar";

export default {
  name: "Home",
  components: { ProductsList, Sidebar },
 title: "Товары",

};
</script>

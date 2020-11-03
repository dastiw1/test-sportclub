<template>
  <v-container class="create-product">
    
    <v-row>
      <sidebar />
      <v-col>
        <v-breadcrumbs :items="breadcrumbs">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
        <product-form
          ref="form"
          :is-new="true"
          :model="model"
          :categories="categories"
          @submit="onSubmit"
        />
      </v-col>
    </v-row>
     <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import { mapWaitingActions } from "vue-wait";
import ProductForm from "../components/products/ProductForm";
import Sidebar from "../components/nav/Sidebar.vue";

export default {
  components: { Sidebar, ProductForm },
  title: "Создание товара",
  data() {
    return {
      title: this.title,
      model: {
        name: "",
        count: 0,
        amount: 0,
        image: null,
        category_id: null,
      },
    };
  },
  computed: {
    ...mapState("products", {
      categories: (state) => state.categories,
    }),
    overlay() {
      return this.$wait.is('product.creating');
    },
    breadcrumbs() {
      return [
        {
          text: "Товары",
          disabled: false,
          href: "/",
        },
        {
          text: this.title,
          disabled: true,
          href: "/products/create",
        },
      ];
    },
  },
  methods: {
    ...mapWaitingActions("products", {
      fetchCategories: "categories.fetching",
      createProduct: "product.creating",
    }),
    async onSubmit(payload) {
      let msg = "Товар успешно добавлен";
      try {
        await this.createProduct(payload);
        this.$notify({
          group: "app",
          title: "ГОТОВО",
          type: "success",
          text: msg,
        });
        this.$router.push({name: 'Home'});
      } catch (error) {
        this.$notify({
          group: "app",
          title: "Ошибка",
          type: "error",
          text: error.message,
        });
      }
      
    },
  },
  created() {
    this.fetchCategories();
  },
};
</script>

<style>
</style>
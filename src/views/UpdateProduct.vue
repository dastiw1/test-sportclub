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
          v-if="model"
          ref="form"
          :model="model"
          :categories="categories"
          @submit="onSubmit"
          @delete="onDelete"
        />
      </v-col>
    </v-row>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import { mapWaitingActions } from "vue-wait";
import ProductForm from "../components/products/ProductForm";
import Sidebar from "../components/nav/Sidebar.vue";

export default {
  components: { Sidebar, ProductForm },
  title: "Редактирование товара",
  data() {
    return {
      model: null,
    };
  },
  watch: {
    currentProduct: {
      immediate: true,
      deep: true,
      handler(val) {
        if(val?.name) {
          this.$options.title = `Редактирование "${val.name}"`
          document.title = this.$options.title;
        }
        
      }
    }
  },
  computed: {
    ...mapGetters("products", ["getProductById"]),
    ...mapState("products", {
      categories: (state) => state.categories,
    }),
    currentProduct() {
      return this.getProductById(this.id);
    },
    overlay() {
      return (
        this.$wait.is("product.updating") || this.$wait.is("product.deleting")
      );
    },
    id() {
      return parseInt(this.$route.params.id);
    },
    breadcrumbs() {
      return [
        {
          text: "Товары",
          disabled: false,
          href: "/",
        },
        {
          text: this.$options.title,
          disabled: true,
          href: "/products/" + this.id,
        },
      ];
    },
  },
  methods: {
    ...mapWaitingActions("products", {
      fetchCategories: "categories.fetching",
      updateProduct: "product.updating",
      deleteProduct: "product.deleting",
    }),
    async onSubmit(payload) {
      let msg = "Товар успешно изменен";
      try {
        await this.updateProduct(payload);
        this.$notify({
          group: "app",
          title: "ГОТОВО",
          type: "success",
          text: msg,
        });
      } catch (error) {
        this.$notify({
          group: "app",
          title: "Ошибка",
          type: "error",
          text: error.message,
        });
      }
    },
    async onDelete(payload) {
      try {
        let msg = `Товар ${payload.name} успешно удален`;
        await this.deleteProduct(payload);

        this.$notify({
          group: "app",
          title: "ГОТОВО",
          type: "success",
          text: msg,
        });
        setTimeout(() => {
          this.$router.push({ name: "Home" });
        }, 500);
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
    const prod = this.currentProduct;
    if (prod) {
      this.model = { ...prod, image: null };
    } else {
      this.$notify({
        group: "app",
        title: "Ошибка",
        type: "error",
        text: `Товар с ID ${this.id} не найден`,
      });
      setTimeout(() => {
        this.$router.push({ name: "Home" });
      }, 1000);
    }
  },
};
</script>

<style>
</style>
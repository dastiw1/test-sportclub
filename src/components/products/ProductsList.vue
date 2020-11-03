
<template>
  <div class="products-list">
    <v-row class="products-list__filter">
      <v-text-field
        outlined
        class="mr-4"
        solo
        :value="filter.name"
        @input="debounceNameFilterInput"
      ></v-text-field>

      <v-select
        placeholder="Категория"
        clearable
        v-model="filter.category_id"
        class="mr-4"
        outlined
        solo
        :items="categories"
        item-text="name"
        item-value="id"
        @change="getData"
      ></v-select>

      <v-btn :to="{ name: 'CreateProduct' }">Добавить</v-btn>
    </v-row>
    <v-data-table
      disable-sort
      :headers="headers"
      :items="tableData"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
    >
      <template v-slot:item.category_id="{ item }">
        {{ readableCategoryName(item) }}
      </template>
      <template v-slot:item.amount="{ item }">
       {{$tc('routes.products.msgs.rubles', item.amount)}}
      </template>
      <template v-slot:item.count="{ item }">
       {{item.count}} шт.
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn :to="{ name: 'UpdateProduct', params: { id: item.id } }"
          >Редактировать</v-btn
        >
      </template>
    </v-data-table>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapWaitingActions } from "vue-wait";
import debounce from "lodash/debounce";
import { mapGetters } from "vuex";

import { mapState } from "vuex";
export default {
  data() {
    return {
      filter: {
        name: "",
        category_id: null,
      },
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        { text: this.$t("routes.products.properties.name"), value: "name" },
        {
          text: this.$t("routes.products.properties.category_id"),
          value: "category_id",
        },
        { text: this.$t("routes.products.properties.amount"), value: "amount" },
        { text: this.$t("routes.products.properties.count"), value: "count" },
        { text: null, value: "actions" },
      ],
    };
  },
  computed: {
    ...mapGetters("products", ["getCategoryById"]),
    ...mapState("products", {
      products: (state) => state.products,
      categories: (state) => state.categories,
    }),
    overlay() {
      return (
        this.$wait.is("products.fetch") || this.$wait.is("categories.fetch")
      );
    },
    tableData() {
      return [].sort.call(this.products, (a, b) => {
        if (a.id < b.id) {
          return 1;
        }
        if (a.id > b.id) {
          return -1;
        }
        return 0;
      });
    },
  },
  methods: {
    ...mapWaitingActions("products", {
      fetchProducts: "products.fetch",
      fetchCategories: "categories.fetch",
    }),
    readableCategoryName({ category_id }) {
      const cat = this.getCategoryById(category_id);
      return cat ? cat.name : "-неизвестная-";
    },
    debounceNameFilterInput: debounce(function (v) {
      this.filter.name = v;
      this.getData();
    }, 300),
    getData() {
      this.fetchProducts(this.filter);
    },
  },

  created() {
    this.fetchProducts(this.filter);
    this.fetchCategories();
  },
};
</script>

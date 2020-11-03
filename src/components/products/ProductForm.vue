<template>
  <v-form class="product-form" @submit.prevent="handleSubmit">
    <v-row>
      <v-col cols="6">
        <v-text-field
          outlined
          label="Название"
          v-model="model.name"
          :error="$v.model.name.$dirty && $v.model.name.$error"
          :error-messages="nameError"
        ></v-text-field>
        <v-row>
          <v-col cols="6">
            <v-text-field
              outlined
              label="Стоимость"
              type="number"
              max="1000"
              v-model="model.amount"
              suffix="руб."
              :error="$v.model.amount.$dirty && $v.model.amount.$error"
              :error-messages="amountError"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              outlined
              label="Наличие"
              max="100"
              suffix="шт."
              type="number"
              v-model="model.count"
              :error="$v.model.count.$dirty && $v.model.count.$error"
              :error-messages="countError"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-file-input
          v-if="model.image == null"
          outlined
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Изображение"
          prepend-icon="mdi-image"
          label="Изображение"
          :error="$v.model.image.$dirty && $v.model.image.$error"
          :error-messages="imageError"
          @change="onFileChange"
        ></v-file-input>
        <v-row
          no-gutters
          class="img-block flex-column"
          v-else
          style="max-width: 400px"
        >
          <v-img max-width="400" max-height="400" :src="model.image"></v-img>
          <v-btn color="error" @click="() => (model.image = null)"
            >Удалить картинку</v-btn
          >
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-select
          placeholder="Категория"
          clearable
          v-model="model.category_id"
          class="mr-4"
          outlined
          solo
          :items="categories"
          item-text="name"
          item-value="id"
          :error="$v.model.category_id.$dirty && $v.model.category_id.$error"
          :error-messages="categoryIdError"
        ></v-select>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-6">
      <v-btn type="submit" color="primary" large class="mr-3">Сохранить</v-btn>
      <v-btn v-if="!isNew" color="error" @click="handleDelete" large
        >Удалить</v-btn
      >
    </v-row>
  </v-form>
</template>


<script>
import {
  required,
  minValue,
  maxValue,
  numeric,
} from "vuelidate/lib/validators";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default {
  props: {
    isNew: {
      type: Boolean,
      default: false,
    },
    model: {
      required: true,
      type: Object,
    },
    categories: {
      required: true,
      type: Array,
    },
  },
  validations: {
    model: {
      name: { required },
      count: {
        required,
        numeric,
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      amount: {
        required,
        numeric,
        minValue: minValue(0),
        maxValue: maxValue(1000),
      },
      image: { required },
      category_id: { required },
    },
  },
  computed: {
    nameError() {
      return this.getError("name");
    },
    countError() {
      return this.getError("count");
    },
    amountError() {
      return this.getError("amount");
    },
    imageError() {
      return this.getError("image");
    },
    categoryIdError() {
      return this.getError("category_id");
    },
  },
  methods: {
    /**
     * TODO: Вытащить отдельно как модуль или миксин и сделать универсальным
     */
    getError(field) {
      const params = this.$v.model[field].$params;
      let msg = "";
      let re = {
        field: this.$t(`routes.products.properties.${field}`),
      };
      let errorPrefix = "validation.errors.";
      Object.keys(params).every((key) => {
        const param = params[key];

        if (
          this.$v.model[field].$dirty &&
          this.$v.model[field][key] === false
        ) {
          msg = `${errorPrefix}${key}`;
          switch (key) {
            case "required":
            case "numeric":
              break;
            case "maxValue":
              re.max = param.max;
              break;
            case "minValue":
              re.min = param.min;
              break;
          }
          return false;
        } else {
          return true;
        }
      });
      return msg === "" ? msg : this.$t(msg, re);
    },
    async onFileChange(file) {
      if(file) {
        this.model.image = await toBase64(file);
      }
    },
    async handleDelete() {
      this.$emit('delete', this.model);
    },
    handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        this.$notify({
          group: "app",
          title: "Ошибка",
          type: "warn",
          text: "Исправьте ошибки",
        });
        return;
      }
      
      // eslint-disable-next-line no-unused-vars
      const {image, ...payload} = this.model;
      this.$emit("submit", payload);
    },
  },
};
</script>

<style>
</style>
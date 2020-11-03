<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="4" sm="4" lg="3">
        <v-form
          @submit.prevent="clickSuccessHandler"
          :disabled="$wait.is('user.authorizing')"
        >
          <legend class="mb-2">{{ $t("routes.login.login-title") }}</legend>
          <v-text-field
            solo
            v-model.trim="email"
            :placeholder="$t('routes.login.login-field')"
            :error="$v.password.$dirty && $v.email.$error"
            :error-messages="emailErrorMsg"
            required
          ></v-text-field>

          <v-text-field
            solo
            v-model="password"
            :type="passwordFieldType"
            :error="$v.password.$dirty && $v.password.$error"
            :placeholder="$t('routes.login.password-field')"
            :error-messages="passwordErrorMsg"
            required
          >
          <template v-slot:append>
            <v-btn class="password-type-toggle pa-0" icon  @click="passwordFieldType === 'password' ? passwordFieldType ='text': passwordFieldType= 'password'">
              {{passwordFieldType === 'password' ? '🙈' : '🙉' }}
            </v-btn>
            
          </template>
          </v-text-field>

          <v-btn
            type="button"
            block
            color="primary"
            :loading="$wait.is('user.authorizing')"
            @click.ctrl="clickErrorHandler"
            @click="clickSuccessHandler"
            >{{ $t("routes.login.actions.login") }}</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapWaitingActions } from "vue-wait";
import { required, minLength } from "vuelidate/lib/validators";

const isValidPassword = (val) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
  return typeof val === "string" && regex.test(val);
};

const isValidEmail = (val) => {
  //eslint-disable-next-line
  const regex = /^[a-zA-Zа-яА-Я_\d][-a-zA-Zа-яА-Я0-9_\.\d]*\@[a-zA-Zа-яА-Я\d][-a-zA-Zа-яА-Я\.\d]*\.[a-zA-Zа-яА-Я]{2,4}$/;
  return typeof val === "string" && regex.test(val);
};
export default {
  title: "Войти",
  data() {
    return {
      email: "",
      password: "",
      passwordFieldType: 'password'
    };
  },
  validations: {
    email: { required, valid: isValidEmail },
    password: { required, minLength: minLength(6), valid: isValidPassword },
  },
  computed: {
    
    passwordErrorMsg() {
      const { required, minLength, valid, $error } = this.$v.password;
      if (!$error) {
        return null;
      }
      if (!required) {
        return this.$t("routes.login.msgs.password-required");
      }

      if (!minLength) {
        return this.$t("routes.login.msgs.password-min-length");
      }

      if (!valid) {
        return this.$t("routes.login.msgs.password-invalid");
      }
      return null;
    },
    emailErrorMsg() {
      const { required, valid, $error } = this.$v.email;
      if (!$error) {
        return null;
      }
      if (!required) {
        return this.$t("routes.login.msgs.email-required");
      }

      if (!valid) {
        return this.$t("routes.login.msgs.email-incorrect");
      }
      return null;
    },
  },
  methods: {
    ...mapWaitingActions("user", {
      authorizeUser: "user.authorizing",
    }),
    clickErrorHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      this.$notify({
        group: "auth",
        title: this.$t('messages.error'),
        type: 'warn',
        text: this.$t('routes.login.msgs.password-is-wrong'),
      });
      this.password = '';
    },
    async clickSuccessHandler(event) {
      if(event.ctrlKey) {
        return;
      }
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const { token } = await this.authorizeUser();
      if (token) {
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>

<style lang="scss">
.password-type-toggle {
  font-size: 24px !important;
}
</style>
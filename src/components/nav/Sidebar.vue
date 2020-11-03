<template>
  <v-navigation-drawer color="#f9f6f6" class="sidebar" absolute permanent left>
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/women/81.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Jane Smith</v-list-item-title>
          <v-list-item-subtitle class="link" @click="logout"
            >Выход <v-icon size="14">mdi-logout</v-icon>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        :to="item.route"
        link
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      navItems: [{ title: "Товары", route: { name: "Home" } }],
    };
  },
  methods: {
    ...mapActions("user", ["logoutUser"]),
    async logout() {
      await this.logoutUser();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>


<style lang="scss" scoped>
.link {
  cursor: pointer;
}
</style>


<style lang="scss" >
.sidebar + div {
  margin-left: 280px;
}
</style>
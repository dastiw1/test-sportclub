<template>
  <div id="app">
    <v-app>
      <v-main>
        <router-view />
      </v-main>
      <notifications group="auth" position="bottom center" />
      <notifications group="app" position="bottom right" />
    </v-app>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

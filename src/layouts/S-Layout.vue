<template>
  <div>

<!--=====================================================================================================
============================== Halooo !!! ngintip aja bro ================================================
==========================================================================================================

NYARI APA NIH? HEHE...
SELAMAT MENCARI SESUATU YANG DICARI :D

IT'S ONLY WITH THE HEART THAT ONE CAN SEE RIGHTLY , WHAT IS ESSENTIAL IS INVISIBLE TO THE EYE

==========================================================================================================
==========================================================================================================
=======================================================================================================
-->
    <div class="q-pa-md bg-grey-2">
      <q-layout view="hHh Lpr fFf">
        <q-header elevated class="bg-primary lobster">
          <q-toolbar>
            <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
            <q-toolbar-title>
              Dispo
                  <!-- <q-separator  color="white" inset /> -->
                 <div class="ubuntu text-caption">Aplikasi Disposisi </div>

            </q-toolbar-title>
            <q-btn flat @click="$q.fullscreen.toggle()"
              :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
              :label="$q.fullscreen.isActive ? '' : ''" />
                <q-btn  push color="white" icon="ion-ios-log-out" no-caps text-color="primary" label="Logout" class="ubuntu" @click="logout"/>
          </q-toolbar>
        </q-header>

        <q-drawer v-model="drawer" show-if-above :mini="miniState" @mouseover="miniState = false"
          @mouseout="miniState = true" :width="200" :breakpoint="500" bordered content-class="bg-white ubuntu">
          <!-- <q-scroll-area class="fit ubuntu"> -->
            <q-list padding>
              <q-item :active="menu_home" clickable v-ripple @click="goHome" >
                <q-item-section avatar>
                  <q-icon name="ion-clipboard" color="secondary"/>
                </q-item-section>

                <q-item-section class="text-secondary" >
                  Form
                </q-item-section>
              </q-item>

               <q-item :active="menu_tabel" clickable v-ripple @click="goTabel">
                <q-item-section avatar>
                  <q-icon name="table_chart" color="secondary"/>
                </q-item-section>

                <q-item-section class="text-secondary">
                  Disposisi
                </q-item-section>
              </q-item>

              <q-item :active="menu_about" clickable v-ripple @click="goAbout">
                <q-item-section avatar>
                  <q-icon name="ion-information-circle-outline" color="secondary" />
                </q-item-section>

                <q-item-section class="text-secondary"  >
                  About
                </q-item-section>
              </q-item>

            </q-list>
          <!-- </q-scroll-area> -->
        </q-drawer>

        <q-page-container >

          <router-view />
        </q-page-container>

        <q-footer reveal elevated class="bg-primary  text-white ubuntu">
          <div class="grey darken-3 white-text text-center">
            <div class="white-text">
              <p></p>
              <p class="white-text"> Luaskan ilmu, luaskan manfaat <br>

                [ ] dengan  <span class="animated infinite fadeIn delay-5s text-secondary"> ❤ </span>
                <!-- <q-spinner-hearts class="animated 2s infinite fadeIn" color="red" size="2.5em" /> -->
                di Toli-toli</p>
            </div>

            <div>
              ©2020 — Imam Satya Wedhatama
              <p></p>
            </div>
          </div>
        </q-footer>
      </q-layout>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      menu_home: true,
      menu_tabel: false,
      menu_about: false,
      left: false,
      drawer: false,
      miniState: true
    }
  },
  methods: {
    goHome () {
      this.menu_home = true
      this.menu_tabel = false
      this.menu_about = false
      this.$router.push('/home')
    },
    goTabel () {
      this.menu_home = false
      this.menu_tabel = true
      this.menu_about = false
      this.$router.push('/disposisi')
    },
    goAbout () {
      this.menu_home = false
      this.menu_tabel = false
      this.menu_about = true
      this.$router.push('/about')
    },
    logout: async function () {
      try {
        this.$firebase.auth().signOut()
        this.$router.push('/')
      } catch (error) {
        alert(error.message)
      }
    }
  }
}

</script>
<style lang="stylus" scoped>

.text-pinkku {
  color: #f38181;
}
.bg-pinkku {
  background: #f38181;
}
.text-kuningku {
  color: #f0decb;
}
.bg-kuningku {
  background: #f0decb;
}

</style>
<style lang="sass" scoped>

.ubuntu
  font-family: 'ubuntu'

.pacifico
  font-family: 'pacifico'

.lobster
  font-family: 'lobster'
</style>

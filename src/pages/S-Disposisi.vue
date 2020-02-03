<template>
  <!-- <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
  </q-page> -->
   <!-- // "rules": {
  //   ".read": "auth != null",
  //   ".write": "auth != null"
  // } -->
  <div>
    <!-- <a href=" https://us-central1-dispo-cbe6c.cloudfunctions.net/emailMessage
"> emailMessage</a> <br>

    <a href="https://us-central1-dispo-cbe6c.cloudfunctions.net/addMessage">addMessage</a> <br>

    <a href="https://us-central1-dispo-cbe6c.cloudfunctions.net/helloWorld">helloWorld</a> -->

    <transition appear enter-active-class="animated zoomIn" leave-active-class="animated fadeOut">
      <!-- <div class="q-pa-md" style="max-width: 400px"> -->

      <div class="q-pa-md ubuntu">
        <!-- <div class="row items-start q-col-gutter-x-md justify-around"> -->

        <div class="row q-col-gutter-lg">
          <div class="col-sm-12 ">
            <q-card class="my-card shadow-7">
              <q-card-section>
                <div class="text-h6 text-primary ubuntu">Daftar Surat</div>
                <!-- <div class="text-subtitle2">by John Doe</div> -->
              </q-card-section>
              <q-separator inset color="primary" />
              <q-card-section>

                <template>
                  <div class="q-pa-md">
                    <!-- User Surat -->
                    <q-table title="Stok" :data="user_surat" :columns="columns" row-key="name" :filter="filter"
                      :loading="loading" :pagination.sync="pagination" :visible-columns="visibleColumns"
                      no-data-label="tambah dulu barangnya" class="bg-white text-secondary"
                      no-results-label="Yang kamu cari ga ada">

                      <template v-slot:header-cell-action="props">
                        <q-th :props="props">
                          <q-icon name="ion-bulb" size="2em" />
                          {{ props.col.label }}
                        </q-th>
                      </template>
                      <template v-slot:header-cell-judul_surat="props">
                        <q-th :props="props">
                          <q-icon name="ion-ios-cloud-upload" size="2em" />
                          {{ props.col.label }}
                        </q-th>
                      </template>
                      <template v-slot:header-cell-dari="props">
                        <q-th :props="props">
                          <q-icon name="ion-ios-business" size="2em" />
                          {{ props.col.label }}
                        </q-th>
                      </template>
                      <template v-slot:header-cell-untuk="props">
                        <q-th :props="props">
                          <q-icon name="ion-ios-people" size="2em" />
                          {{ props.col.label }}
                        </q-th>

                      </template>

                      <template v-slot:header-cell-file="props">
                        <q-th :props="props">
                          <q-icon name="ion-ios-document" size="2em" />
                          {{ props.col.label }}
                        </q-th>
                      </template>

                      <template v-slot:header-cell-tanggal="props">
                        <q-th :props="props">
                          <q-icon name="ion-ios-alarm" size="2em" />
                          {{ props.col.label }}
                        </q-th>
                      </template>

                      <template v-slot:header-cell-status="props">
                        <q-th :props="props">
                          <q-icon name="ion-ios-alarm" size="2em" />
                          {{ props.col.label }}
                        </q-th>
                      </template>
                      <template v-slot:body="props">
                        <!-- {{props.row}} -->
                        <q-tr :props="props">

                          <q-td key="action">
                            <div class=" q-gutter-sm">
                              <q-btn push round color="green-5" icon="ion-swap" size='sm'
                                @click="edit_dialog_dispo(props)">
                                <q-tooltip content-class="bg-green-5" :offset="[10, 10]">
                                  Disposisi
                                </q-tooltip>
                              </q-btn>

                            </div>
                          </q-td>

                          <q-td key="judul_surat" :props="props">
                            <q-badge color="primary">
                              {{ props.row.judul_surat }}
                            </q-badge>
                          </q-td>

                          <q-td key="dari" :props="props">
                            <q-badge color="primary">
                              {{ props.row.darimana }}
                            </q-badge>
                          </q-td>
                          <q-td key="untuk" :props="props">
                            <q-badge color="primary">
                              {{ props.row.untuk_siapa }}
                            </q-badge>
                          </q-td>

                          <q-td key="file" :props="props">
                            <q-badge color="primary">
                              <a :href="props.row.file_scan">filenya</a>
                            </q-badge>
                          </q-td>

                          <q-td key="tanggal" :props="props">
                            <q-badge color="primary">
                              {{ props.row.time }}
                            </q-badge>
                          </q-td>

                          <q-td key="status" :props="props">
                            <q-badge color="primary">
                              {{ props.row.status }}
                            </q-badge>
                          </q-td>

                        </q-tr>
                      </template>

                      <template v-slot:top-right>
                        <q-select v-model="visibleColumns" multiple borderless dense options-dense
                          :display-value="$q.lang.table.columns" emit-value map-options :options="columns"
                          option-value="name" style="min-width: 150px" />

                        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                          <q-space />

                          <template v-slot:append>
                            <q-icon name="search" />
                          </template>

                          <template v-slot:no-data="{ icon, message, filter }">
                            <div class="full-width row flex-center text-accent q-gutter-sm">
                              <q-icon size="2em" name="sentiment_dissatisfied" />
                              <span>
                                Well this is sad... {{ message }}
                              </span>
                              <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
                            </div>
                          </template>

                        </q-input>

                      </template>

                      <template v-slot:top-right>
                        <q-select v-model="visibleColumns" multiple borderless dense options-dense
                          :display-value="$q.lang.table.columns" emit-value map-options :options="columns"
                          option-value="name" style="min-width: 150px" />
                        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                          <q-icon slot="append" name="search" />
                        </q-input>
                      </template>

                      <template v-slot:no-data="{ icon, message, filter }">
                        <div class="full-width row flex-center text-secondary q-gutter-sm">
                          <q-icon size="2em" name="sentiment_dissatisfied" />
                          <span>
                            Hmm ga ada apa-apa... {{ message }}
                          </span>
                          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
                        </div>
                      </template>
                    </q-table>
                  </div>

                  <q-dialog v-model="medium_surat">
              <q-card class="text-white " style="width: 700px; max-width: 80vw;">
                <q-bar class="bg-primary">

                  <div>Disposisi</div>

                  <q-space />

                  <q-btn dense flat icon="close" v-close-popup>
                    <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
                  </q-btn>
                </q-bar>
                <q-card-section>
                  <q-form @submit="disposisi(id)" @reset="onResetEdit" class="q-gutter-md">
                    <q-select v-model="penerima_surat" :options="user_daftar_penerima" option-label="nama_penerima"
                  option-value="nama_penerima" label="Penerima Surat" />

                    <q-card-actions align="right">

                      <q-btn no-caps class="text-weight-light" flat label="Reset" type="reset" color="primary"
                        text-color="primary" />
                      <q-btn no-caps label="Disposisi" type="submit" color="primary" text-color="white"
                        class="q-ml-sm text-weight-light" />
                    </q-card-actions>
                  </q-form>
                </q-card-section>

              </q-card>
            </q-dialog>
                </template>

              </q-card-section>

            </q-card>

          </div>

        </div>
        <br><br>
        <div class="row q-col-gutter-lg">
          <div class="col-sm-8 ">
            <q-card class="my-card shadow-7">
              <q-card-section>
                <div class="text-h6 text-primary ubuntu">Daftar Penerima</div>
                <!-- <div class="text-subtitle2">by John Doe</div> -->
              </q-card-section>
              <q-separator inset color="primary" />
              <q-card-section>

                <template>
                  <div class="q-pa-md">
                    <!-- Daftar Penerima -->
                    <q-table title=" Penerima" :data="user_daftar_penerima" :columns="columns2" row-key="name"
                      :filter="filter2" :loading="loading" :pagination.sync="pagination"
                      :visible-columns="visibleColumns2" no-data-label="tambah dulu barangnya"
                      class="bg-white text-secondary" no-results-label="Yang kamu cari ga ada">

                      <template v-slot:header-cell-aksi="props">
                        <q-th :props="props">
                          <q-icon name="ion-bulb" size="2em" />
                          {{ props.col.label }}
                        </q-th>
                      </template>
                      <template v-slot:header-cell-nama_penerima="props">
                        <q-th :props="props">
                          <q-icon name="ion-cube" size="2em" />
                          {{ props.col.label }}
                        </q-th>
                      </template>
                      <template v-slot:header-cell-email_penerima="props">
                        <q-th :props="props">
                          <q-icon name="ion-hourglass" size="2em" />
                          {{ props.col.label }}
                        </q-th>
                      </template>

                      <template v-slot:body="props">
                        <!-- {{props.row}} -->
                        <q-tr :props="props">

                          <q-td key="action">
                            <div class=" q-gutter-sm">
                              <q-btn push round color="blue-5" icon="ion-create" size='sm' @click="edit_dialog(props)">
                                <q-tooltip content-class="bg-blue-5" :offset="[10, 10]">
                                  Edit!
                                </q-tooltip>
                              </q-btn>

                              <q-btn push round color="red-5" icon="ion-trash" size='sm' @click="delete_dialog(props)">
                                <q-tooltip content-class="bg-red-5" :offset="[10, 10]">
                                  Delete
                                </q-tooltip>
                              </q-btn>

                            </div>
                          </q-td>

                          <!-- <q-td key="index" :props="props">
                          <q-badge color="primary">
                            {{ props.row.__index+1 }}
                          </q-badge>
                        </q-td> -->

                          <q-td key="nama_penerima" :props="props">
                            <q-badge color="primary">
                              {{ props.row.nama_penerima }}
                            </q-badge>
                          </q-td>

                          <q-td key="email_penerima" :props="props">
                            <q-badge color="primary">
                              {{ props.row.email_penerima }}
                            </q-badge>
                          </q-td>

                          <q-td key="tanggal" :props="props">
                            <q-badge color="primary">
                              {{ props.row.time }}
                            </q-badge>
                          </q-td>
                        </q-tr>
                      </template>

                      <template v-slot:top-right>
                        <q-select v-model="visibleColumns2" multiple borderless dense options-dense
                          :display-value="$q.lang.table.columns2" emit-value map-options :options="columns2"
                          option-value="name" style="min-width: 150px" />

                        <q-input borderless dense debounce="300" v-model="filter2" placeholder="Search">
                          <q-space />

                          <template v-slot:append>
                            <q-icon name="search" />
                          </template>

                        </q-input>

                      </template>

                      <template v-slot:top-right>
                        <q-select v-model="visibleColumns2" multiple borderless dense options-dense
                          :display-value="$q.lang.table.columns" emit-value map-options :options="columns2"
                          option-value="name" style="min-width: 150px" />
                        <q-input borderless dense debounce="300" v-model="filter2" placeholder="Search">
                          <q-icon slot="append" name="search" />
                        </q-input>
                      </template>

                      <template v-slot:no-data="{ icon, message, filter2 }">
                        <div class="full-width row flex-center text-secondary q-gutter-sm">
                          <q-icon size="2em" name="sentiment_dissatisfied" />
                          <span>
                            Hmm ga ada apa-apa... {{ message }}
                          </span>
                          <q-icon size="2em" :name="filter2 ? 'filter_b_and_w' : icon" />
                        </div>
                      </template>
                    </q-table>
                  </div>
                </template>

              </q-card-section>

            </q-card>
            <!-- Delete -->
            <q-dialog v-model="confirm_delete" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <q-avatar icon="ion-trash" color="primary" text-color="white" />
                  <span class="q-ml-sm">Kamu akan menghapusnya untuk selama - lamanya ?</span>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Ga jadi deh" color="primary" v-close-popup />
                  <q-btn flat label="Iya beneran" color="primary" v-close-popup @click="deleteku(id)" />
                </q-card-actions>
              </q-card>
            </q-dialog>

          </div>

          <div class="col-sm-4">

            <q-card class="my-card shadow-7">
              <q-card-section>
                <div class="text-h6 text-primary ubuntu">Tambah Penerima</div>
                <!-- <div class="text-subtitle2">by John Doe</div> -->
              </q-card-section>
              <q-separator inset color="primary" />
              <q-card-section>

                <template>
                  <div class="q-pa-md">
                    <!-- {{this.nama_barang + '   ' + this.satuan}} -->
                    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                      <q-input filled v-model="nama_penerima" label="Nama *" hint="Nama Penerimanya siapa ? :)"
                        lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']" />

                      <q-input filled v-model="email_penerima" label="Email *" hint="Emailnya apa ? :)" lazy-rules
                        type="email" :rules="[ val => val && val.length > 0 || 'Please type something']" />

                      <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

                      <div>
                        <q-btn no-caps class="text-weight-light" label="Submit" type="submit" color="primary" />
                        <q-btn no-caps label="Reset" type="reset" color="primary" flat
                          class="q-ml-sm text-weight-light" />
                      </div>
                    </q-form>

                  </div>
                </template>

              </q-card-section>

            </q-card>
          </div>
        </div>

      </div>
    </transition>

    <!-- //edit -->
    <q-dialog v-model="medium">
      <q-card class="text-white ">
        <q-bar class="bg-primary">

          <div>Edit Data</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-form @submit="updateData(id)" @reset="onResetEdit" class="q-gutter-md">
            <q-input filled label="Nama Penerima *" hint="Penerimanya siapa? :)" lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']" v-model="edited_nama_penerima" />

            <q-input filled label="Email *" hint="Emailnya apa? :)" lazy-rules type="email"
              :rules="[ val => val && val.length > 0 || 'Please type something']" v-model="edited_email_penerima" />

            <q-card-actions align="right">

              <q-btn no-caps class="text-weight-light" flat label="Reset" type="reset" color="primary"
                text-color="primary" />
              <q-btn no-caps label="Update" type="submit" color="primary" text-color="white"
                class="q-ml-sm text-weight-light" />
            </q-card-actions>
          </q-form>
        </q-card-section>

      </q-card>
    </q-dialog>

    <!-- Delete -->
    <q-dialog v-model="confirm_delete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="ion-trash" color="primary" text-color="white" />
          <span class="q-ml-sm">Kamu akan menghapusnya untuk selama - lamanya ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Ga jadi deh" color="primary" v-close-popup />
          <q-btn flat label="Iya beneran" color="primary" v-close-popup @click="delete_final(id)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
// export default {
//   name: 'PageIndex'
// }
export default {
  data () {
    return {
      // penerima
      nama_penerima: '',
      email_penerima: '',

      // delete
      id: null,
      confirm_delete: false,

      // edit
      medium: false,
      edited_nama_penerima: '',
      edited_email_penerima: '',

      // dispo surat
      medium_surat: false,
      penerima_surat: '',

      data: [],
      model: null,
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      filter: '',
      nama_barang: '',
      satuan: '',

      loading: false,
      pagination: {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage: 5
      },

      columns: [{
        name: 'action',
        align: 'center',
        label: 'Aksi',
        field: 'action',
        sortable: true
      },

      {
        name: 'judul_surat',
        label: 'Judul Surat',
        align: 'left',
        field: 'judul_surat',
        sortable: true
      },
      {
        name: 'dari',
        label: 'Dari',
        align: 'left',
        field: 'dari',
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
      },

      {
        name: 'untuk',
        align: 'center',
        label: 'Untuk',
        field: 'untuk',
        sortable: true
      },
      {
        name: 'file',
        align: 'center',
        label: 'File',
        field: 'file',
        sortable: true
      },
      {
        name: 'tanggal',
        align: 'center',
        label: 'Waktu (M-D-Y)',
        field: 'time',
        sortable: true
      },
      {
        name: 'status',
        align: 'center',
        label: 'Status Disposisi',
        field: 'status',
        sortable: true
      }

      ],
      visibleColumns: [
        'action',
        // 'index',
        // 'nama_barang',
        // 'satuan',
        'judul_surat',
        'dari',
        'untuk',
        'file',
        'tanggal',
        'status'
      ],

      // tabel2
      columns2: [{
        name: 'action',
        align: 'center',
        label: 'Aksi',
        field: 'action',
        sortable: true
      },

      {
        name: 'nama_penerima',
        label: 'Penerima',
        align: 'left',
        field: 'nama_penerima',
        sortable: true
      },
      {
        name: 'email_penerima',
        label: 'Email',
        align: 'left',
        field: 'email_penerima',
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
      },

      {
        name: 'tanggal',
        align: 'center',
        label: 'Waktu (M-D-Y)',
        field: 'time',
        sortable: true
      }

      ],
      visibleColumns2: [
        'action',
        // 'index',
        // 'nama_barang',
        // 'satuan',
        'nama_penerima',
        'email_penerima',

        'tanggal'

      ],
      filter2: ''

    }
  },
  created () {
    this.$q.addressbarColor.set('#7861a9')
  },
  firestore () {
    var user = this.$firebase.auth().currentUser
    return {
      user_surat: this.$firebase.firestore().collection('surat_masuk').where('user_id', '==', user.uid).orderBy(
        'time', 'desc'),
      daftar_penerima: this.$firebase.firestore().collection('daftar_penerima'),
      kirim_email: this.$firebase.firestore().collection('kirim_email'),
      user_daftar_penerima: this.$firebase.firestore().collection('daftar_penerima').where('user_id', '==', user.uid)
        .orderBy('nama_penerima')
    }
  },
  methods: {
    async updateData (id) {
      await this.$firebase.firestore().collection('daftar_penerima').doc(this.id.row['.key']).update({
        nama_penerima: this.edited_nama_penerima,
        email_penerima: this.edited_email_penerima
      }).then(
        //   }
        // })
        this.medium = false
      )
      this.$q.notify({
        color: 'positive',
        position: 'top',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Yeay, item berhasil diupdate :)'
      })
    },
    async disposisi (id) {
      var user = this.$firebase.auth().currentUser
      console.log(this.penerima_surat)
      console.log(id, id.row.file_scan)
      await this.$firebase.firestore().collection('surat_masuk').doc(this.id.row['.key']).update({
        status: this.penerima_surat.nama_penerima

      }).then(
        this.$firestore.kirim_email.add({
          user_id: user.uid,
          nama_penerima: this.penerima_surat.nama_penerima,
          email_penerima: this.penerima_surat.email_penerima,
          file_scan: id.row.file_scan

        }).then(
          this.medium_surat = false
        )
        // this.$firebase.firestore().document
        //   }
        // })
        // this.medium_surat = false
      )
      this.$q.notify({
        color: 'positive',
        position: 'top',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Yeay, surat berhasil didisposisi :)'
      })
    },
    edit_dialog (id) {
      this.id = id
      // console.log(id)
      this.medium = true
      // console.log(id)
      // this.id_stoks_log = id.row
      this.edited_nama_penerima = id.row.nama_penerima
      this.edited_email_penerima = id.row.email_penerima

      // this.edited_data.output = this.user_arsip[index].output
      // this.edited_data.komponen = this.user_arsip[index].komponen
    },
    edit_dialog_dispo (id) {
      this.id = id
      // console.log(id)
      this.medium_surat = true
    },
    delete_dialog (id) {
      this.confirm_delete = true
      this.id = id
    },
    async delete_final (id) {
      await this.$firebase.firestore().collection('daftar_penerima').doc(this.id.row['.key']).delete()

      this.$q.notify({
        position: 'top',
        color: 'negative',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Yeay penerima telah dihapus :)'
      })
    },
    onSubmit () {
      this.$q.loadingBar.start()
      var user = this.$firebase.auth().currentUser

      this.$firestore.daftar_penerima.add({
        user_id: user.uid,
        nama_penerima: this.nama_penerima,
        email_penerima: this.email_penerima,
        time: new Date().toISOString()
      })

      this.$q.notify({
        color: 'positive',
        position: 'top',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Yeay, penerima berhasil ditambahkan :)'
      })
      this.onReset()
    },

    onReset () {
      this.nama_penerima = null
      this.email_penerima = null
    },
    onResetEdit () {
      this.edited_nama_penerima = null
      this.edited_email_penerima = null
    }

  }
}

</script>

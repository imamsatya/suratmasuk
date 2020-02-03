<template>
  <!-- <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
  </q-page> -->
  <div>
    <transition appear enter-active-class="animated zoomIn" leave-active-class="animated fadeOut">
      <!-- <div class="q-pa-md" style="max-width: 400px"> -->
      <div class="q-pa-md ubuntu ">
        <div class="row items-start q-col-gutter-lg">
          <div class="col-sm-4">
            <q-card class="my-card shadow-7">
              <q-card-section>
                <div class="text-h6 text-primary ubuntu">Input Surat</div>
                <!-- <div class="text-subtitle2">by John Doe</div> -->
              </q-card-section>

              <!-- <q-separator inset /> -->
              <q-card-section>

                <!-- {{data_stoks_log}} -->
                <!-- filled use-input fill-input input-debounce="0"  -->
                <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">

                  <!-- tambahan -->
                  <q-input filled color="primary" v-model="judul_surat" label="Nomor Agenda/Registrasi" hint="Nomor Agenda/Registrasi"
                    lazy-rules :rules="[ val => val && val.length > 0 || 'Jangan lupa diisi yaa :)']" />

                    <!-- <q-input filled color="primary" v-model="judul_surat" label="" hint="Judul Surat"
                    lazy-rules :rules="[ val => val && val.length > 0 || 'Jangan lupa diisi yaa :)']" /> -->

                    <!-- <q-input filled color="primary" v-model="judul_surat" label="Judul Surat" hint="Judul Surat"
                    lazy-rules :rules="[ val => val && val.length > 0 || 'Jangan lupa diisi yaa :)']" /> -->
                    <!-- tambahan -->
                  <q-input filled color="primary" v-model="judul_surat" label="Tanggal dan No Surat" hint="Tanggal dan No Surat"
                    lazy-rules :rules="[ val => val && val.length > 0 || 'Jangan lupa diisi yaa :)']" />

                  <q-input filled color="primary" v-model="darimana" label="Dari" hint="Dari" lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Jangan lupa diisi yaa :)']" />

                  <q-input filled color="primary" v-model="untuk_siapa" label="Ringkasan Isi" hint="Ringkasan Isi" lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Jangan lupa diisi yaa :)']" />

                  <!-- <q-file color="teal" filled v-model="file_scan" type="file" @input="val => { file = val[0] }" @change="uploadImage" label="Upload Hasil Scan">
                    <template v-slot:prepend>
                      <q-icon name="cloud_upload" />
                    </template>
                  </q-file> -->

                  <q-input @input="val => { file = val[0] }" filled type="file" hint="File Scan" @change="uploadFile" />

                  <p>{{this.file_scan}}</p>
                  <div>
                    <q-btn label="Submit" type="submit" color="primary" text-color="white" />
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                  </div>
                </q-form>
              </q-card-section>

            </q-card>
          </div>

          <div class="col-sm-8">

            <q-card class="my-card shadow-7">
              <q-card-section>
                <div class="text-h6 text-primary ubuntu">Daftar Surat</div>
                <!-- <div class="text-subtitle2">by John Doe</div> -->
              </q-card-section>
              <q-card-section>

                <template>
                  <div class="q-pa-md">
                    <!-- {{user_stoks_log}} -->
                    <q-table title="Surat Masuk" :data="user_surat" :columns="columns" row-key="name" :filter="filter"
                      :loading="loading" :pagination.sync="pagination" :visible-columns="visibleColumns"
                      no-data-label="pilih dulu barangnya dan tambah catatannya " class="bg-white text-secondary"
                      no-results-label="Yang kamu cari ngga ada">

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

                          <!-- <q-td key="nama_barang" :props="props">
                            <q-badge color="primary">
                              {{ model.nama_barang }}
                            </q-badge>
                          </q-td> -->

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
                            Hmm ga ada apa apa... {{ message }}
                          </span>
                          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
                        </div>
                      </template>
                    </q-table>
                  </div>
                </template>

              </q-card-section>

            </q-card>
          </div>

          <!-- <div class="col-sm-3">

          halo 3
        </div> -->
        </div>
      </div>

    </transition>
    <!-- Edit -->
    <q-dialog v-model="medium">
      <q-card class="text-white">
        <q-bar class="bg-primary">

          <div>Edit Data</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-form @submit="updateData(id)" @reset="onReset" class="q-gutter-md">
            <q-input filled label="Judul *" hint="Judul suratnya apa? :)" lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']" v-model="edited_judul_surat" />

            <q-input filled label="Darimana"  hint="Darimana? :)" lazy-rules
              :rules="[ val => val && val.length > 0 || 'kalau kosong diisi 0 aja']" v-model="edited_dari" />

            <q-input filled  label="Untuk" hint="Untuk siapa ?"  lazy-rules
              :rules="[ val => val && val.length > 0 || 'kalau kosong diisi 0 aja']" v-model="edited_untuk" />

            <q-card-actions align="right">

              <q-btn no-caps class="text-weight-light" flat label="Reset" type="reset" color="white"
                text-color="primary" />
              <q-btn no-caps label="Update" type="submit" color="primary" text-color="white"
                class="q-ml-sm text-weight-light" v-close-popup />
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
          <q-btn flat label="Iya beneran" color="primary" v-close-popup @click="delete_final(id_stoks_log)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>

</template>

<script>
// export default {
//   name: 'PageIndex'
// }
// const userStoksX = this.user_stoks
export default {
  data () {
    return {
      // delete
      confirm_delete: false,
      id: '',

      // edit
      medium: false,
      edited_judul_surat: '',
      edited_dari: '',
      edited_untuk: '',

      //
      judul_surat: '',
      darimana: '',
      untuk_siapa: '',
      file_scan: null,
      spinner: false,
      pesan_upload: '',

      data: [],
      data_stoks_log: [],
      model: null,

      filter: '',

      loading: false,
      pagination: {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage: 5
      },

      // stringOptions,
      options: [],
      // userStoksX,
      // options: userStoksX,

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
        label: 'Status',
        field: 'status',
        sortable: true
      }
        // { name: 'protein', label: 'Protein (g)', field: 'protein' },
        // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
      visibleColumns: [
        'action',
        // 'index',
        // 'nama_barang',
        // 'satuan',
        'judul_surat',
        'dari',
        'untuk',

        'tanggal',
        'file',
        'status'
      ]
    }
  },
  created () {
    this.$q.addressbarColor.set('#7861a9')
  },
  firestore () {
    var user = this.$firebase.auth().currentUser
    return {
      // stoks: this.$firebase.firestore().collection('stoks'),
      user_surat: this.$firebase.firestore().collection('surat_masuk').where('user_id', '==', user.uid).orderBy(
        'time', 'desc'),
      surat_masuk: this.$firebase.firestore().collection('surat_masuk')
      // user_stoks_log: this.$firebase.firestore().collection('stoks_log').where('user_id', '==', user.uid)
    }
  },

  methods: {
    uploadFile (e) {
      // Transaction_Receipt_6.pdf
      // this.spinner = true
      // this.pesan_upload = 'tunggu yaa'
      let file = e.target.files[0]
      var storageRef = this.$firebase.storage().ref('file_scan/' + file.name)
      let uploadTask = storageRef.put(file)
      uploadTask.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          // this.image.push(downloadURL)

          this.file_scan = downloadURL

          // console.log('File available at', downloadURL)
          // console.log(this.gambar)
        })
      })
    },

    async updateData (id) {
      await this.$firebase.firestore().collection('surat_masuk').doc(this.id).update({
        judul_surat: this.edited_judul_surat,
        darimana: this.edited_dari,
        untuk_siapa: this.edited_untuk

      })
      this.$q.notify({
        color: 'positive',
        position: 'top',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Yeay, surat masuk berhasil diupdate :)'
      })
    },
    edit_dialog (id) {
      // console.log(id)
      this.medium = true
      this.id = id.row['.key']
      this.edited_judul_surat = id.row.judul_surat
      this.edited_dari = id.row.darimana
      this.edited_untuk = id.row.untuk_siapa
      // this.edited_data.output = this.user_arsip[index].output
      // this.edited_data.komponen = this.user_arsip[index].komponen
    },
    delete_dialog (id) {
      this.confirm_delete = true
      this.id = id.row['.key']
    },
    async delete_final (id) {
      // // update stoks
      // // console.log(this.data_stoks_log[0].id)

      this.$firebase.firestore().collection('surat_masuk').doc(this.id).delete()
      this.$q.notify({
        position: 'top',
        color: 'negative',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Yeay surat telah dihapus :)'
      })

      this.sisaStokX()
    },
    onSubmit (id) {
      this.$q.loadingBar.start()
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      var currentTime = new Date().toLocaleString('en-US', {
        timeZone: timezone
      })
      var user = this.$firebase.auth().currentUser
      // console.log(this.stok_masuk)
      // console.log(this.stok_keluar)

      this.$firestore.surat_masuk.add({
        user_id: user.uid,
        judul_surat: this.judul_surat,
        darimana: this.darimana,
        untuk_siapa: this.untuk_siapa,
        file_scan: this.file_scan,
        status: 'belum disposisi',
        time: currentTime
      })
        .then(
          this.$q.notify({
            position: 'top',
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Yeay surat masuk telah ditambahkan :)'
          })
        )
      this.$q.loadingBar.stop()
      this.onReset()
      // }
    },

    onReset () {
      this.judul_surat = null
      this.darimana = null
      this.untuk_siapa = null
      this.file_scan = null
    },
    async selectedStok () {
      var user = this.$firebase.auth().currentUser
      var tes = []

      this.$firebase.firestore().collection('stoks_log').where('user_id', '==', user.uid).where('item_id', '==',
        this
          .model['.key']).orderBy('time', 'desc').onSnapshot(ref => {
        ref.forEach(doc => {
          var data = {
            item_id: doc.data().item_id,
            penerima: doc.data().penerima,
            stok_keluar: doc.data().stok_keluar,
            stok_masuk: doc.data().stok_masuk,
            time: doc.data().time,
            id: doc.id
          }
          tes.push(data)
        })
        this.data_stoks_log = tes
      })
    },
    async sisaStokX () {
      this.id = this.model
      // console.log('id saat selected', this.id)
      await this.selectedStok()
    }

  }
}

</script>

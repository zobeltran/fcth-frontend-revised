<template>
  <v-container>
    <v-layout align-center justify-space-around row fill-height/>
    <v-flex>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Update Hotel</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-container grid-list-4>
              <v-layout row wrap>
                <v-flex xs12 sm4 md4>
                  <v-text-field
                    v-model="name"
                    v-validate="'required'"
                    :error-messages="errors.collect('name')"
                    data-vv-name="name"
                    label="Room Name"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4 md4>
                  <v-text-field
                    v-model="roomType"
                    v-validate="'required'"
                    :error-messages="errors.collect('roomType')"
                    data-vv-name="roomType"
                    label="Room Type"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4 md4>
                  <v-text-field
                    v-model="capacity"
                    v-validate="'required'"
                    :error-messages="errors.collect('capacity')"
                    data-vv-name="capacity"
                    label="Room Capacity"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4 md4>
                  <v-text-field
                    v-model="details"
                    v-validate="'required'"
                    :error-messages="errors.collect('details')"
                    data-vv-name="details"
                    label="Room Details"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="price"
                    v-validate="'required'"
                    :error-messages="errors.collect('price')"
                    data-vv-name="price"
                    label="Price"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="remainingRooms"
                    v-validate="'required'"
                    :error-messages="errors.collect('remainingRooms')"
                    data-vv-name="remainingRooms"
                    label="Remaining Rooms"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-menu
                    ref="checkIn"
                    :close-on-content-click="false"
                    v-model="menu1"
                    :nudge-right="40"
                    :return-value.sync="date1"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="checkIn"
                      label="Check-In Date"
                      prepend-icon="event"
                      readonly
                      v-validate="'required'"
                      :error-messages="errors.collect('checkIn')"
                    ></v-text-field>
                    <v-date-picker v-model="checkIn" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="$refs.checkIn.save(date1)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-menu
                    ref="checkOut"
                    :close-on-content-click="false"
                    v-model="menu2"
                    :nudge-right="40"
                    :return-value.sync="date2"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="checkOut"
                      label="Check-Out Date"
                      prepend-icon="event"
                      readonly
                      v-validate="'required'"
                      :error-messages="errors.collect('checkOut')"
                    ></v-text-field>
                    <v-date-picker v-model="checkOut" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="$refs.checkOut.save(date2)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-menu
                    ref="expirationDate"
                    :close-on-content-click="false"
                    v-model="menu3"
                    :nudge-right="40"
                    :return-value.sync="date3"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="expirationDate"
                      label="Expiration Date"
                      prepend-icon="event"
                      v-validate="'required'"
                      :error-messages="errors.collect('expirationDate')"
                    ></v-text-field>
                    <v-date-picker v-model="expirationDate" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="$refs.expirationDate.save(date3)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-spacer></v-spacer>

                <v-flex xs12 sm6 md4>
                  <v-switch :label="`Packaged`" v-model="isPackaged"></v-switch>
                </v-flex>

                <v-card-actions>
                  <v-flex xs12 sm6 md4>
                    <v-btn
                      block
                      round
                      color="primary"
                      @click.native="loader = 'load'"
                      :loading="load"
                      :disabled="load"
                      @click.exact="updateHotel()"
                    >Update</v-btn>
                  </v-flex>
                </v-card-actions>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-snackbar
          v-model="snackbar.isError"
          :color="snackbar.color"
          :bottom="snackbar.y"
          :multi-line="snackbar.mode"
          :right="snackbar.x"
          :timeout="snackbar.timeout"
        >
          {{snackbar.text}}
          <v-btn flat @click="snackbar.isError = false">Close</v-btn>
        </v-snackbar>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      valid: false,
      loader: null,
      load: false,
      snackbar: {
        isError: false,
        y: true,
        x: true,
        mode: true,
        timeout: 6000,
        text: null,
        color: "error"
      },
      id: this.$route.params.id,
      name: null,
      roomType: null,
      capacity: null,
      details: null,
      checkIn: null,
      checkOut: null,
      price: null,
      expirationDate: null,
      remainingRooms: null,
      isExpired: false,
      isPackaged: false,
      menu1: null,
      date1: null,
      menu2: null,
      date2: null,
      menu3: null,
      date3: null
    };
  },
  created() {
    axios
      .get(process.env.VUE_APP_ROOT_API + "/api/v1/hotels/id=" + this.id)
      .then(response => {
        console.log(response);
        this.name = response.data.hotel.name;
        this.roomType = response.data.hotel.room.type;
        this.capacity = response.data.hotel.room.capacity;
        this.details = response.data.hotel.details;
        this.checkIn = response.data.hotel.checkDates.in;
        this.checkOut = response.data.hotel.checkDates.out;
        this.price = response.data.hotel.price;
        this.expirationDate = response.data.hotel.expirationDate;
        this.remainingRooms = response.data.hotel.remainingRooms;
        this.isPackaged = response.data.hotel.isPackaged;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    fetchData() {
      this.$store
        .dispatch("viewHotelId", {
          id: this.id
        })
        .then(response => {
          this.name = response.data.hotelDetails.name;
          this.roomType = response.data.hotelDetails.room.type;
          this.capacity = response.data.hotelDetails.room.capacity;
          this.details = response.data.hotelDetails.details;
          this.checkIn = response.data.hotelDetails.checkDates.in;
          this.checkOut = response.data.hotelDetails.checkDates.out;
          this.price = response.data.hotelDetails.price;
          this.expirationDate = response.data.hotelDetails.expirationDate;
          this.remainingRooms = response.data.hotelDetails.remainingRooms;
          this.isPackaged = response.data.hotelDetails.isPackaged;
        });
    },
    updateHotel() {
      if (this.$refs.form.validate()) {
        this.load = true;
        this.$store
          .dispatch("updateHotel", {
            id: this.id,
            name: this.name,
            roomType: this.roomType,
            capacity: this.capacity,
            details: this.details,
            checkIn: this.checkIn,
            checkOut: this.checkOut,
            price: this.price,
            expirationDate: this.expirationDate,
            remainingRooms: this.remainingRooms,
            isPackaged: this.isPackaged,
            isExpired: this.isExpired
          })
          .then(response => {
            this.load = false;
            if (response.status === 200) {
              this.snackbar.color = "success";
              this.snackbar.isError = true;
              this.snackbar.text = "Hotel Successfully Updated!";
              setTimeout(
                () => this.$router.push({ path: "/hotels/customerview" }),
                2000
              );
            }
          })
          .catch(error => {
            console.log(JSON.stringify(error.response.status));
            if (error.response.status === 500) {
              this.load = false;
              this.snackbar.isError = true;
              this.snackbar.text =
                "Sorry, we're slightly having a server error. Please hang on there.";
            }
            if (error.status === 404) {
              this.laod = false;
              this.snackbar.isError = true;
              this.snackbar.text =
                "Sorry, I'm afraid we can't communicate with the server right now.";
            }
            if (error.status === 401) {
              this.snackbar.isError = true;
              this.snackbar.text =
                "Session Ended Please Relogin. Will logout in 3 Seconds";
              this.$router.push("logout");
            } else {
              this.load = false;
              this.snackbar.isError = true;
              this.snackbar.text =
                error.data.errors.errorCode + " " + error.data.errors.message;
            }
          });
      }
    }
  }
};
</script>

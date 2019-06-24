<template>
  <v-container>
    <v-layout align-center justify-space-around row fill-height/>
    <v-flex>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Update Flight</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-container grid-list-6>
              <v-layout row wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="flightNo"
                    v-validate="'required'"
                    :error-messages="errors.collect('flightNo')"
                    data-vv-name="flightNo"
                    label="Flight Number"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="origin"
                    v-validate="'required'"
                    :error-messages="errors.collect('origin')"
                    data-vv-name="origin"
                    label="Origin"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="arrival"
                    v-validate="'required'"
                    :error-messages="errors.collect('arrival')"
                    data-vv-name="arrival"
                    label="Arrival"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md3>
                  <v-menu
                    ref="departureDate"
                    :close-on-content-click="false"
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
                      v-model="departureDate"
                      label="Departure Date"
                      prepend-icon="event"
                      readonly
                      v-validate="'required'"
                      :error-messages="errors.collect('departureDate')"
                      data-vv-name="departureDate"
                    ></v-text-field>
                    <v-date-picker v-model="departureDate" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="$refs.departureDate.save(date1)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>

                <v-flex xs12 sm6 md3>
                  <v-dialog
                    ref="departuretime"
                    v-model="departureTime"
                    :return-value.sync="DepartureTime"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="DepartureTime"
                      label="Departure Time"
                      prepend-icon="access_time"
                      readonly
                    ></v-text-field>
                    <v-time-picker v-if="departureTime" v-model="DepartureTime" actions full-width>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="departureTime = false">Cancel</v-btn>
                      <v-btn
                        flat
                        color="primary"
                        @click="$refs.departuretime.save(DepartureTime)"
                      >OK</v-btn>
                    </v-time-picker>
                  </v-dialog>
                </v-flex>

                <v-flex xs12 sm6 md3>
                  <v-menu
                    ref="returnDate"
                    :close-on-content-click="false"
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
                      v-model="returnDate"
                      label="Return Date"
                      prepend-icon="event"
                      readonly
                      v-validate="'required'"
                      :error-messages="errors.collect('returnDate')"
                      data-vv-name="returnDate"
                    ></v-text-field>
                    <v-date-picker v-model="returnDate" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="$refs.returnDate.save(date2)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>

                <v-flex xs12 sm6 md3>
                  <v-dialog
                    ref="returntime"
                    v-model="returnTime"
                    :return-value.sync="ReturnTime"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="ReturnTime"
                      label="Return Time"
                      prepend-icon="access_time"
                      readonly
                    ></v-text-field>
                    <v-time-picker v-if="returnTime" v-model="ReturnTime" actions full-width>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="returnTime = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.returntime.save(ReturnTime)">OK</v-btn>
                    </v-time-picker>
                  </v-dialog>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="remainingSlots"
                    v-validate="'required'"
                    :error-messages="errors.collect('remainingSlots')"
                    data-vv-name="remainingSlots"
                    label="Remaining Slots"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-menu
                    ref="expirationDate"
                    :close-on-content-click="false"
                    v-model="ExpirationDate"
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
                      data-vv-name="expirationDate"
                    ></v-text-field>
                    <v-date-picker v-model="expirationDate" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="$refs.expirationDate.save(date3)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-spacer></v-spacer>

                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="price"
                    v-validate="'required'"
                    :error-messages="errors.collect('price')"
                    data-vv-name="price"
                    label="Price"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4 align-content-center>
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
                      @click.exact="updateFlight()"
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
          <v-btn flat @click="snackbar.isError = false"></v-btn>
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
      flightNo: null,
      origin: null,
      arrival: null,
      departureDate: null,
      DepartureDate: null,
      departureTime: true,
      arrivalDate: null,
      arrivalTime: true,
      returnDate: null,
      returnTime: true,
      returnTime: null,
      remainingSlots: null,
      expirationDate: null,
      price: null,
      departureTime: null,
      arrivalTime: true,
      isPackaged: false,
      date1: null,
      DepartureTime: null,
      ArrivalTime: null,
      date2: null,
      ReturnTime: null,
      date3: null,
      ExpirationDate: null
    };
  },
  mounted() {
    // console.log(process.env.VUE_APP_ROOT_API + '/api/v1/flights/id=' + this.id)
    axios
      .get(process.env.VUE_APP_ROOT_API + "/api/v1/flights/id=" + this.id)
      .then(response => {
        console.log(response);
        this.flightNo = response.data.flightDetails.flightNo;
        this.origin = response.data.flightDetails.origin;
        this.arrival = response.data.flightDetails.arrival;
        this.departureDate = response.data.flightDetails.departureDate;
        this.DepartureTime = response.data.flightDetails.departureTime;
        this.arrivalDate = response.data.flightDetails.arrivalDate;
        this.arrivalTime = response.data.flightDetails.arrivalTime;
        this.returnDate = response.data.flightDetails.returnDate;
        this.ReturnTime = response.data.flightDetails.returnTime;
        this.remainingSlots = response.data.flightDetails.remainingSlots;
        this.expirationDate = response.data.flightDetails.expirationDate;
        this.price = response.data.flightDetails.price;
        this.isPackaged = response.data.flightDetails.isPackaged;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    updateFlight() {
      if (this.$refs.form.validate()) {
        this.load = true;
        this.$store
          .dispatch("updateFlight", {
            id: this.id,
            flightNo: this.flightNo,
            origin: this.origin,
            arrival: this.arrival,
            departureDate: this.departureDate,
            departureTime: this.DepartureTime,
            arrivalDate: this.arrivalDate,
            arrivalTime: this.arrivalTime,
            returnDate: this.returnDate,
            returnTime: this.ReturnTime,
            remainingSlots: this.remainingSlots,
            expirationDate: this.expirationDate,
            price: this.price,
            isPackaged: this.isPackaged,
            isExpired: false
          })
          .then(response => {
            this.load = false;
            if (response.status === 200) {
              this.snackbar.color = "success";
              this.snackbar.isError = true;
              this.snackbar.text = "Flight Successfully Updated!";
              setTimeout(
                () => this.$router.push({ path: "/flights/view" }),
                2000
              );
            }
          })
          .catch(error => {
            if (error.status === 500) {
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

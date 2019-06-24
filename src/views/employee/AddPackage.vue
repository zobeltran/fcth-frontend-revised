<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Add Package</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-container grid-list-4>
                <v-layout row wrap>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      v-model="destination"
                      v-validate="'required'"
                      :error-messages="errors.collect('Destination')"
                      data-vv-name="Destination"
                      label="Destination"
                    ></v-text-field>
                  </v-flex>
                  <!-- <v-flex xs12 sm4 md4>
                    <v-text-field
                      v-model="price"
                      v-validate="'required'"
                      :error-messages="errors.collect('Price')"
                      data-vv-name="Price"
                      label="Price"
                    ></v-text-field>
                  </v-flex> -->
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      v-model="days"
                      v-validate="'required'"
                      :error-messages="errors.collect('Days')"
                      data-vv-name="Days"
                      label="Days"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6 v-for="(itenerary, key) in iteneraries" :key="key">
                    <v-layout row>
                      <v-flex xs12 >
                        <v-text-field
                          v-model="itenerary.value"
                          v-validate="'required'"
                          :error-messages="errors.collect('Itenerary')"
                          data-vv-name="Itenerary"
                          label="Itenerary"
                        ></v-text-field>
                      </v-flex>
                      <v-flex>
                        <v-icon style="padding-top: 20px;" @click="add('itenerary')">add</v-icon>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="inclusions"
                      v-validate="'required'"
                      :error-messages="errors.collect('Inclusions')"
                      data-vv-name="Inclusions"
                      label="Inclusions"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="remainingSlots"
                      v-validate="'required'"
                      :error-messages="errors.collect('Remaining Slots')"
                      data-vv-name="Remaining Slots"
                      label="Remaining Slots"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6>
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
                  <v-flex xs6>
                    <v-menu
                      ref="expirationDate"
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
                        v-model="expirationDate"
                        label="Expiration Date"
                        prepend-icon="event"
                        readonly
                        v-validate="'required'"
                        :error-messages="errors.collect('expirationDate')"
                        data-vv-name="expirationDate"
                      ></v-text-field>
                      <v-date-picker v-model="expirationDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="$refs.expirationDate.save(date2)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>

                  <v-flex xs6>
                    <v-select
                      :items="tickets"
                      item-text="flightNo"
                      v-validate="'required'"
                      item-value="id"
                      :error-messages="errors.collect('Flight Number')"
                      data-vv-name="Flight Number"
                      v-model="ticketId"
                      label="Tickets"
                    ></v-select>
                  </v-flex>
                  <v-flex xs6>
                    <v-select
                      :items="hotels"
                      item-text="name"
                      v-validate="'required'"
                      item-value="id"
                      :error-messages="errors.collect('Hotel')"
                      data-vv-name="Hotel"
                      v-model="hotelId"
                      label="Hotels"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="note"
                      v-validate="'required'"
                      :error-messages="errors.collect('Note')"
                      data-vv-name="Note"
                      label="Note"
                    ></v-text-field>
                  </v-flex>
                  <v-card-actions>
                    <v-flex xs4 offset-xs4>
                      <v-btn
                        block
                        round
                        color="primary"
                        @click.native="loader = 'load'"
                        :loading="load"
                        :disabled="load"
                        @click.exact="addPackage()"
                      >Add Package</v-btn>
                    </v-flex>
                  </v-card-actions>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-snackbar
            v-model="snackbar.isError"
            :auto-height="true"
            :color="snackbar.color"
            :bottom="snackbar.y"
            :multi-line="snackbar.mode"
            :right="snackbar.x"
            :timeout="snackbar.timeout"
          >
            {{snackbar.text}}
            <ul>
              <li
                v-for="errorMessage in snackbar.errorMessages"
                :key="errorMessage"
              >{{errorMessage}}</li>
            </ul>
            <v-btn flat @click="snackbar.isError = false">Close</v-btn>
          </v-snackbar>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
li {
  list-style: none;
}

</style>


<script>
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
        errorMessages: [],
        color: "error"
      },
      destination: null,
      // price: null,
      days: null,
      // itenerary: null,
      inclusions: null,
      remainingSlots: null,
      expirationDate: null,
      note: null,
      ticketId: null,
      hotelId: null,
      tickets: [],
      hotels: [],
      departureDate: null,
      date1: null,
      expirationDate: null,
      date2: null,
      iteneraries: [{value: null}]
    };  
  },
  created() {
    this.fetchTickets();
    this.fetchHotels();
  },
  methods: {
    async addPackage() {
      await this.$validator.validateAll().then(valid => {
        if (valid) {
          this.load = true;
          this.$store
            .dispatch("addPackageVersion2", {
              name: this.destination,
              // price: this.price,
              days: this.days,
              itinerary: this.iteneraries,
              inclusions: this.inclusions,
              remainingSlots: this.remainingSlots,
              // departureDate: this.departureDate,
              expirationDate: this.expirationDate,
              notes: this.note,
              ticket: this.ticketId,
              hotel: this.hotelId
            })
            .then(response => {
              this.load = false;
              if (response.status === 201) {
                this.snackbar.color = "success";
                this.snackbar.isError = true;
                this.snackbar.text = "Package Successfully Added!";
                this.snackbar.errorMessages = [];
                // setTimeout(
                //   () => this.$router.push({ path: "/packages/viewpackages" }),
                //   3000
                // );
              }
            })
            .catch(error => {
              console.log(error);
              if (error.status === 400) {
                this.load = false;
                this.snackbar.isError = true;
                this.snackbar.text = error.data.errors.errorCode;
                this.snackbar.errorMessages = error.data.errors.message;
              }
              if (error.status === 500) {
                this.load = false;
                this.snackbar.isError = true;
                this.snackbar.text = error.data.errors.errorCode;
                this.snackbar.text =
                  "Sorry, we're slightly having a server error. Please hang on there.";
              }
              if (error.status === 404) {
                this.laod = false;
                this.snackbar.isError = true;
                this.snackbar.text = error.data.errors.errorCode;
                this.snackbar.text =
                  "Sorry, I'm afraid we can't communicate with the server right now.";
              }
              if (error.status === 401) {
                this.snackbar.isError = true;
                this.snackbar.text =
                  "Session Ended Please Relogin. Will logout in 3 Seconds";
                setTimeout(this.$router.push("logout"), 3000);
              }
            });
        }
      }); // let isValid = this.$refs.form.validate();
    },
    fetchTickets() {
      this.$store.dispatch("getPackagedFlight").then(response => {
        console.log(response);
        this.tickets = response.data.flights;
      });
    },
    fetchHotels() {
      this.$store.dispatch("getPackagedHotel").then(response => {
        console.log(response);
        this.hotels = response.data.hotels;
      });
    },
    add(item) {
      if (item === 'itenerary') {
        this.iteneraries.push({value: null})
      }
    }
  }
};
</script>

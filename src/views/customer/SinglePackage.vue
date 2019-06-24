<template>
  <v-container grid-list-md>
    <v-layout row wrap>
	 <div id="package">
      <v-flex xs12 sm6 md4 lg4   v-model="packageid">
        <v-container>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{package_alias.name}}</h3>
                <div>
                  Iteneraries: 
                  <br>
                    <ol start="1" v-for="itinerary in package_alias.itinerary" :key="itinerary">
                      <li>{{itinerary.itinerary}}</li>
                    </ol>
                  Days: {{package_alias.details.days}}
                  <br>
                  Prices 
                  <ul>
                    <li>Tickets: {{package_alias.price.ticket}}</li>
                    <li>Hotel: {{package_alias.price.hotel}}</li>
                    <li>Service Charge: {{package_alias.price.serviceCharge}}</li>
                    <li>VAT: {{package_alias.price.vat}}</li>
                    <li>Total: {{ package_alias.price.ticket + package_alias.price.hotel + package_alias.price.serviceCharge + package_alias.price.vat}}</li>
                  </ul>
                  Flight Ticket: {{package_alias.ticket.flightNo}} ({{package_alias.ticket.origin}} - {{package_alias.ticket.destination}})
                  <br>
                  Hotel: {{package_alias.hotel.name}}
                  <br>
                  Slots Available: {{package_alias.remainingSlots}}
                  <br>
                  Departure Date: {{package_alias.departureDate}}
                  <br>
                  Expiration Date: {{package_alias.expirationDate}}
                  <br>
                  Note: {{package_alias.details.notes}}
                  <br>
                </div>
              </div>
            </v-card-title>

            <v-card-actions>
          <v-btn flat color="blue" @click.exact="book(package_alias.id)">Book</v-btn>
          <router-link :to="{ name: 'customerSuggest', params: { id: package_alias.id } }" tag="button" color="blue">
            SUGGEST
          </router-link>
        </v-card-actions>
      </v-card>
    </v-container>
    </v-flex>
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
        <li v-for="errorMessage in snackbar.errorMessages" :key="errorMessage">{{errorMessage}}</li>
      </ul>
      <v-btn flat @click="snackbar.isError = false">Close</v-btn>
    </v-snackbar>
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
  name: "packages",
  data() {
    return {
      viewPackages: [],
      snackbar: {
        isError: false,
        y: true,
        x: true,
        mode: true,
        timeout: 6000,
        text: null,
        errorMessages: [],
        color: "error"
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    book(id) {
      this.$store
        .dispatch("packageBooking", { package: id })
        .then(response => {
          this.fetchData();
          if (response.status === 201) {
            this.snackbar.color = "success";
            this.snackbar.isError = true;
            this.snackbar.errorMessages = [];
            this.snackbar.text = "Successfuly Booked";
          }
        })
        .catch(error => {
          console.log(error);
          if (error.status === 400) {
            this.snackbar.isError = true;
            this.snackbar.text = error.data.errors.errorCode;
            this.snackbar.errorMessages = error.data.errors.message;
          } else if (error.status === 500) {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Sorry, we're slightly having a server error. Please hang on there.";
          } else if (error.status === 404) {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Sorry, I'm afraid we can't communicate with the server right now.";
          } else if (error.status === 401) {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Session Ended Please Relogin. Will logout in 3 Seconds";
            setTimeout(this.$router.push("logout"), 3000);
          }
        });
    },
    payPackage(id) {
      this.$router.push({ name: "checkoutCustomer", params: { 'id': id } });
    },
    suggest( id ) {
      console.log( 'clicked suggest with id: ' + id )
    },
    fetchData() {
      this.$store
        .dispatch("viewPackageVersion2")
        .then(response => {
          this.viewPackages = response.data.packages;
        })
        .catch(response => {
          if (error.status === 400) {
            this.snackbar.isError = true;
            this.snackbar.text = error.data.errors.errorCode;
            this.snackbar.errorMessages = error.data.errors.message;
          }
          else if (error.status === 500) {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Sorry, we're slightly having a server error. Please hang on there.";
          }
          else if (error.status === 404) {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Sorry, I'm afraid we can't communicate with the server right now.";
          }
          else if (error.status === 401) {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Session Ended Please Relogin. Will logout in 3 Seconds";
            setTimeout(this.$router.push("logout"), 3000);
          } else {
            this.snackbar.isError = true;
            this.snackbar.text = error.data.errors.errorCode;
            this.snackbar.errorMessages = error.data.errors.message;
          }
        });
    }
  }
};
</script>
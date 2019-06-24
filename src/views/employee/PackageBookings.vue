<template>
  <v-layout>
    <v-flex xs12 sm6 md4 lg4>
      <v-card v-for="bookings in viewFlightsBookings" :key="bookings">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Reference Number: {{bookings.referenceNumber}}</h3>
            <div>
              Itenerary: {{bookings.package.details.itinerary}}
                  <br>
                  Inclusions: {{bookings.package.details.inclusions}}
                  <br>
                  Days: {{bookings.package.details.days}}
                  <br>
                  Price: {{bookings.package.price}}
                  <br>
                  Flight Ticket: {{bookings.package.ticket.flightNo}} ({{bookings.package.ticket.origin}} - {{bookings.package.ticket.destination}})
                  <br>
                  Hotel: {{bookings.package.hotel.name}}
                  <br>
                  Slots Available: {{bookings.package.remainingSlots}}
                  <br>
                  Departure Date: {{package_alias.departureDate}}
                  <br>
                  Expiration Date: {{bookings.package.expirationDate}}
                  <br>
                  Note: {{bookings.package.details.notes}}
              <br>
              User: {{package_alias.users.email}}
              <br>
            </div>
          </div>
        </v-card-title>
      </v-card>
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
</template>

<script>
export default {
  name: "packageBooking",
  data() {
    return {
      viewpackageBookings: [],
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
    fetchData() {
      this.$store
        .dispatch("viewpackageBookings")
        .then(response => {
          console.log(response.data.package);
          this.viewpackageBookings = response.data.package;
        })
        .catch(response => {
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
<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg4 v-for="(flight_alias, index) in viewFlights" :key="index">
        <v-container>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3
                  class="headline mb-0"
                >{{flight_alias.origin.location}} - {{flight_alias.return.location}}</h3>
                <br>
                <div>
                  Flight No: {{flight_alias.flightNo}}
                  <br>
                  Departure Date: {{flight_alias.origin.date}}
                  <br>
                  Departure Time: {{flight_alias.origin.time}}
                  <br>
                  Return Date: {{flight_alias.return.date}}
                  <br>
                  Return Time: {{flight_alias.return.time}}
                  <br>
                  Remaining Slots: {{flight_alias.remainingSlots}}
                  <br>
                  Price: {{flight_alias.price}}
                  <br>
                  Valid Until: {{flight_alias.expirationDate}}
                  <br>
                </div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="blue" @click.exact="book(flight_alias.id)">Book</v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      viewFlights: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store
        .dispatch("viewFlights")
        .then(response => {
          console.log(response);
          this.viewFlights = response.data.flights;
        })
        .catch(error => {
          console.log(error.data);
        });
    },
    book(id) {
      this.$store
        .dispatch("ticketBooking", { ticket: id })
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
            // setTimeout(this.$router.push("logout"), 3000);
          }
        });
    }
  }
};
</script>
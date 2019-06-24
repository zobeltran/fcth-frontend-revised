<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex
        xs12
        sm6
        md4
        lg4
        v-for="flight_alias in viewFlightsForApproval"
        :key="flight_alias.id"
      >
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
              <v-btn
                fab
                dark
                small
                color="green"
                class="btn btn-info btn-block"
                @click="approveFlights(flight_alias.id)"
              >
                <v-icon>check_circle</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                small
                color="red"
                class="btn btn-danger"
                @click="deleteTicket(flight_alias.id)"
              >
                <v-icon>delete</v-icon>
              </v-btn>
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
  name: "tickets",
  data() {
    return {
      viewFlightsForApproval: [],
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
        .dispatch("viewFlightsForApproval")
        .then(response => {
          console.log(response);
          this.viewFlightsForApproval = response.data.flights;
        })
        .catch(response => {
          if (error.status === 400) {
            this.snackbar.isError = true;
            this.snackbar.text = error.data.errors.errorCode;
            this.snackbar.errorMessages = error.data.errors.message;
          }
          if (error.status === 500) {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Sorry, we're slightly having a server error. Please hang on there.";
          }
          if (error.status === 404) {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Sorry, I'm afraid we can't communicate with the server right now.";
          }
          if (error.status === 401) {
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
    },
    deleteFlight(id) {
      this.$store
        .dispatch("deleteFlight", { id: id })
        .then(response => {
          this.fetchData();
          if (response.status === 200) {
            this.snackbar.color = "success";
            this.snackbar.isError = true;
            this.snackbar.text = "Successfully Deleted!";
          }
        })
        .catch(error => {
          if (error.status === 400) {
            this.snackbar.isError = true;
            this.snackbar.text = error.data.errors.errorCode;
            this.snackbar.errorMessages = error.data.errors.message;
          }
          if (error.status === 500) {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Sorry, we're slightly having a server error. Please hang on there.";
          }
          if (error.status === 404) {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Sorry, I'm afraid we can't communicate with the server right now.";
          } else {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Session Ended Please Relogin. Will logout in 3 Seconds";
            setTimeout(this.$router.push("logout"), 3000);
          }
        });
    },
    approveFlights(id) {
      this.$store
        .dispatch("approveFlights", { id: id,  isApproved: true })
        .then(response => {
          this.fetchData();
          if (response.status === 200) {
            this.snackbar.color = "Success";
            this.snackbar.isError = true;
            this.snackbar.text = "Ticket has been approve. Refreshing list in 3 seconds";
          }
        })
        .catch(error => {
          if (error.status === 400) {
            this.snackbar.isError = true;
            this.snackbar.text = error.data.errors.errorCode;
            this.snackbar.errorMessages = error.data.errors.message;
          }
          if (error.status === 500) {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Sorry, we're slightly having a server error. Please hang on there.";
          }
          if (error.status === 404) {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Sorry, I'm afraid we can't communicate with the server right now.";
          } else {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Session Ended Please Relogin. Will logout in 3 Seconds";
            setTimeout(this.$router.push("logout"), 3000);
          }
        });
    }
  }
};
</script>
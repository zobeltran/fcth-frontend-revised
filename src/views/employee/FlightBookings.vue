<template>
  <v-layout>
    <v-flex xs12 sm6 md4 lg4>
      <v-card v-for="bookings in viewticketsBookings" :key="bookings">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Reference Number: {{bookings.referenceNumber}}</h3>
            <div>
              Flight No: {{bookings.ticket.flightNo}}
              <br>
              Departure Date: {{bookings.ticket.origin.date}}
              <br>
              Departure Time: {{bookings.ticket.origin.time}}
              <br>
              Return Date: {{bookings.ticket.return.date}}
              <br>
              Return Time: {{bookings.ticket.return.time}}
              <br>
              Remaining Slots: {{bookings.ticket.remainingSlots}}
              <br>
              Price: {{bookings.ticket.price}}
              <br>
              Valid Until: {{bookings.ticket.expirationDate}}
              <br>
              User: {{package_alias.users.email}}
              <br>
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
  
  name: "ticketsBooking",
  data() {
    return {
      amount: null,
      referenceNumber: null,
      description: null,
      paymentFor: "Tickets",
      viewticketsBookings: [],
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
        .dispatch("viewFlightBookings")
        .then(response => {
          console.log(response.data.tickets);
          this.viewticketsBookings = response.data.tickets;
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
    },
    async checkout(referenceNumber, amount, description) {
      // token - is the token object
      // args - is an object containing the billing and shipping address if enabled
      console.log("working");
      console.log(this.$refs[referenceNumber]);
      this.referenceNumber = referenceNumber;
      this.amount = amount;
      this.description = description;
      const { token, args } = await this.$refs[referenceNumber][0].open();
    },
    done({ token, args }) {
      this.charge(token.id, token.email);
    },
    opened() {
      // do stuff
    },
    closed() {
      this.fetchData();
    },
    canceled() {
      // do stuff
    }
  }
};
</script>
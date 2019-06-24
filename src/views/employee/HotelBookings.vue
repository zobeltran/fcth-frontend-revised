<template>
  <v-layout>
    <v-flex xs12 sm6 md4 lg4>
      <v-card v-for="bookings in viewHotelsBookings" :key="bookings">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Reference Number: {{bookings.referenceNumber}}</h3>
            <div>
              Name: {{bookings.hotel.name}}
              <br>
              Room Type: {{bookings.hotel.room.type}}
              <br>
              Capacity: {{bookings.hotel.room.capacity}}
              <br>
              Details: {{bookings.hotel.details}}
              <br>
              Check-In Date: {{bookings.hotel.checkDates.in}}
              <br>
              Check-Out Date: {{bookings.hotel.checkDates.out}}
              <br>
              Price: {{bookings.hotel.price}}
              <br>
              Valid Until: {{bookings.hotel.expirationDate}}
              <br>
              Remaining Rooms: {{bookings.hotel.remainingRooms}}
              <br>
              User: {{package_alias.users.email}}
              <br>
              <br>
            </div>
          </div>
          
        </v-card-title>
        <v-flex>
        </v-flex>
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
  name: "hotelsBooking",
  data() {
    return {
      amount: null,
      referenceNumber: null,
      description: null,
      paymentFor: "Hotels",
      viewHotelsBookings: [],
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
        .dispatch("viewHotelBookings")
        .then(response => {
          console.log(response.data.hotels);
          this.viewHotelsBookings = response.data.hotels;
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
    charge(token, email) {
      this.$store
        .dispatch("payBooking", {
          referenceNumber: this.referenceNumber,
          token: token,
          email: email,
          amount: this.amount,
          description: this.description,
          paymentFor: this.paymentFor
        })
        .then(response => {
          console.log(response.data);
          if (response.status === 200) {
            this.snackbar.color = "success";
            this.snackbar.isError = true;
            this.snackbar.errorMessages = [];
            this.snackbar.text = "Successfuly Booked";
          }
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
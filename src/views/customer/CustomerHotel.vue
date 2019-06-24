<template>
<v-container grid-list-md>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3>
      <v-card v-for="(hotel_alias, index) in viewHotels" :key="index">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{hotel_alias.name}} - {{hotel_alias.room.type}}</h3>
            <div>
              Name: {{hotel_alias.name}}
              <br>
              Room Type: {{hotel_alias.room.type}}
              <br>
              Capacity: {{hotel_alias.room.capacity}}
              <br>
              Details: {{hotel_alias.details}}
              <br>
              Check-In Date: {{hotel_alias.checkDates.in}}
              <br>
              Check-Out Date: {{hotel_alias.checkDates.out}}
              <br>
              Price: {{hotel_alias.price}}
              <br>
              Valid Until: {{hotel_alias.expirationDate}}
              <br>
              Remaining Rooms: {{hotel_alias.remainingRooms}}
              <br>
            </div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="blue" @click.exact="book(hotel_alias.id)">Book</v-btn>
        </v-card-actions>
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
</v-container>
</template>

<script>
export default {
  name: "hotels",
  data() {
    return {
      viewHotels: [],
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
        .dispatch("hotelBookings", { hotel: id })
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
    payHotel(id) {
      this.$router.push({ name: "checkoutCustomer", params: { 'id': id } });
    },
    fetchData() {
      this.$store
        .dispatch("viewHotels")
        .then(response => {
          this.viewHotels = response.data.hotels;
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
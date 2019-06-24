<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg4 v-for="hotel_alias in viewHotels" :key="hotel_alias">
        <v-container>
          <v-card>
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
              <v-btn
                fab
                dark
                small
                color="green"
                class="btn btn-info btn-block"
                @click="editHotel(hotel_alias.id)"
              >
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                small
                color="red"
                class="btn btn-danger"
                @click="deleteHotel(hotel_alias.id)"
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
    deleteHotel(id) {
      this.$store
        .dispatch("deleteHotel", { id: id })
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
    editHotel(id) {
      this.$router.push({ name: "updateHotels", params: { id: id } });
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
    }
  }
};
</script>
<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg4 v-for="hotel_alias in viewHotels" :key="hotel_alias.id">
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
              Status: {{flight_alias.status}}
              <br>
                </div>
              </div>
            </v-card-title>

            <v-card-actions>
                  <v-flex xs12 sm6 md4>
                    <v-btn
                      block
                      round
                      color="primary"
                      @click.native="loader = 'load'"
                      :loading="load"
                      :disabled="load"
                      @click.exact="payment()"
                    >Pay Reservation</v-btn>
                  </v-flex>
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
    
  }
};
</script>
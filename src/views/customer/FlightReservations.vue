<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg4 v-for="flight_alias in viewFlights" :key="flight_alias.id">
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
  name: "tickets",
  data() {
    return {
      viewFlights: [],
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
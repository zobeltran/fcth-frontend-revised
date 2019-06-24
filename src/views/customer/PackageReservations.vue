<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg4 v-for="package_alias in viewPackages" :key="package_alias">
        <v-container>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{package_alias.name}}</h3>
                <div>
                  Itenerary: {{package_alias.details.itinerary}}
                  <br>
                  Inclusions: {{package_alias.details.inclusions}}
                  <br>
                  Days: {{package_alias.details.days}}
                  <br>
                  Price: {{package_alias.price}}
                  <br>
                  Flight Ticket: {{package_alias.ticket.flightNo}} ({{package_alias.ticket.origin}} - {{package_alias.ticket.destination}})
                  <br>
                  Hotel: {{package_alias.hotel.name}}
                  <br>
                  Slots Available: {{package_alias.remainingSlots}}
                  <br>
                  Expiration Date: {{package_alias.expirationDate}}
                  <br>
                  Note: {{package_alias.details.notes}}
                  <br>
                  Status: {{package_alias.status}}
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
    
  }
};
</script>
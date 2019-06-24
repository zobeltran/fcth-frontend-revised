<template>
  <v-layout>
    <v-flex xs12 sm6 md4 lg4>
      <v-card v-for="bookings in viewPackageBookings" :key="bookings">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Reference Number: {{bookings.referenceNumber}}</h3>
            <div>
            Iteneraries: 
                  <br>
                    <ol start="1" v-for="itinerary in bookings.itinerary" :key="itinerary">
                      <li>{{itinerary}}</li>
                    </ol>
                  Days: {{package_alias.details.days}}
                  <br>
                  Prices 
                  <ul>
                    <li>Tickets: {{bookings.package_alias.price.ticket}}</li>
                    <li>Hotel: {{bookings.package_alias.price.hotel}}</li>
                    <li>Service Charge: {{bookings.package_alias.price.serviceCharge}}</li>
                    <li>VAT: {{bookings.package_alias.price.vat}}</li>
                    <li>Total: {{ bookings.package_alias.price.ticket + bookings.package_alias.price.hotel + bookings.package_alias.price.serviceCharge + package_alias.price.vat}}</li>
                  </ul>
                  Flight Ticket: {{bookings.package_alias.ticket.flightNo}} ({{bookings.package_alias.ticket.origin}} - {{bookings.package_alias.ticket.destination}})
                  <br>
                  Hotel: {{bookings.package_alias.hotel.name}}
                  <br>
                  Slots Available: {{bookings.package_alias.remainingSlots}}
                  <br>
                  Departure Date: {{bookings.package_alias.departureDate}}
                  <br>
                  Expiration Date: {{bookings.package_alias.expirationDate}}
                  <br>
                  Note: {{bookings.package_alias.details.notes}}
                  <br>
                </div>
              </div>
          <div class="caption">by agreeing to pay, you are subjected to agree our policies and terms and conditions</div>
        </v-card-title>
        <v-flex>
          <TermsAgreement />
        </v-flex>
        <v-card-actions>
          <vue-stripe-checkout
            :ref="bookings.referenceNumber"
            :allow-remember-me="false"
            :name="bookings.package.packageNo + ' - ' + bookings.referenceNumber"
            currency="PHP"
            :amount="bookings.package.price * 100"
            @done="done"
            @opened="opened"
            @closed="closed"
            @canceled="canceled"
          ></vue-stripe-checkout>
          <v-btn
            v-if="!bookings.isPaid"
            flat
            color="blue"
            @click.exact="checkout(bookings.referenceNumber, bookings.package.price * 100, bookings.package.packageNo + ' - ' + bookings.referenceNumber)"
          >Pay via Credit Card</v-btn>
          <v-btn v-else flat color="blue" disabled>PAID</v-btn>
          <v-btn
            v-if="!bookings.isPaid"
            flat
            color="red"
            @click="cancelReservation(package_alias.id)"
          >Cancel</v-btn>
          <v-btn v-else flat color="blue" disabled>PAID</v-btn>
          <v-btn
            v-if="!bookings.isPaid"
            flat
            color="blue"
            @click="payviaBank(ticket_alias.id)"
          >Pay via Bank</v-btn>
          <v-btn v-else flat color="blue" disabled>PAID</v-btn>
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
</template>

<script>
import TermsAgreement from './TermsAgreement.vue'
export default {
  components: { TermsAgreement },
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
    book(id) {
      this.$store
        .dispatch("packageBookings", { package: id })
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
          } else {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Session Ended Please Relogin. Will logout in 3 Seconds";
            setTimeout(this.$router.push("logout"), 3000);
          }
        });
    },
    paypackage(id) {
      this.$router.push({ name: "checkoutCustomer", params: { id: id } });
    },
    fetchData() {
      this.$store
        .dispatch("viewPackageBooking")
        .then(response => {          
          console.log(response.data.package);
          this.viewPackageBookings = response.data.package;
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
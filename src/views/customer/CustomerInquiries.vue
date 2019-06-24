<template>
<v-container grid-list-md text-xs-center>
  <v-layout>
   <v-flex xs12>
    <v-card class='elevation-12'>
    <v-container>  
    <v-toolbar-title>Hotel Inquiry</v-toolbar-title> 
            <v-flex xs12>
                <v-text-field 
                v-model="hfirstName"
                v-validate="'required'"
                :error-messages="errors.collect('First Name')"
                data-vv-name="First Name"
                label="First Name"></v-text-field>
            </v-flex>

            <v-flex xs12>
                <v-text-field 
                v-model="hlastName"
                v-validate="'required'"
                :error-messages="errors.collect('Last Name')"
                data-vv-name="Last Name"
                label="Last Name"></v-text-field>
            </v-flex>

            <v-flex xs12>
                <v-text-field 
                v-model="hinquiryEmail" 
                v-validate="'required'"
                :error-messages="errors.collect('Email')"
                data-vv-name="Email"
                label="Email"></v-text-field>
            </v-flex>
            
            <v-flex xs12>
                <v-text-field 
                v-model="hlocation"
                v-validate="'required'"
                :error-messages="errors.collect('Location ')"
                data-vv-name="Location"
                label="Location"></v-text-field>
            </v-flex>

            <v-flex xs12>
                <v-text-field 
                v-model="hbudget"
                v-validate="'required'"
                :error-messages="errors.collect('Budget')"
                data-vv-name="Budget"
                label="Budget"></v-text-field>
            </v-flex>
                    
            <v-flex xs12>
                <v-text-field 
                v-model="hguest"
                v-validate="'required'"
                :error-messages="errors.collect('Guest')"
                data-vv-name="Guest"
                label="Number of Guest"></v-text-field>
            </v-flex>

            <v-flex xs12>
                                        <v-menu
                                            ref="checkIn"
                                            :close-on-content-click="false"
                                            v-model="menu1"
                                            :nudge-right="40"
                                            :return-value.sync="date1"
                                            lazy
                                            transition="scale-transition"
                                            offset-y
                                            full-width
                                            min-width="290px"
                                        >
                                            <v-text-field
                                            slot="activator"
                                            v-model="checkIn"
                                            label="Check-In Date"
                                            prepend-icon="event"
                                            readonly
                                            v-validate="'required'"
                                            :error-messages="errors.collect('checkIn')"
                                            ></v-text-field>
                                            <v-date-picker v-model="checkIn" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="$refs.checkIn.save(date1)">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu>
            </v-flex>

            <v-flex xs12>
                                        <v-menu
                                            ref="checkOut"
                                            :close-on-content-click="false"
                                            v-model="menu2"
                                            :nudge-right="40"
                                            :return-value.sync="date2"
                                            lazy
                                            transition="scale-transition"
                                            offset-y
                                            full-width
                                            min-width="290px"
                                        >
                                            <v-text-field
                                            slot="activator"
                                            v-model="checkOut"
                                            label="Check-Out Date"
                                            prepend-icon="event"
                                            readonly
                                            v-validate="'required'"
                                            :error-messages="errors.collect('checkOut')"
                                            ></v-text-field>
                                            <v-date-picker v-model="checkOut" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="$refs.checkOut.save(date2)">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu>
            </v-flex>

            <v-flex xs12>
                <v-text-field 
                v-model="hnote"
                v-validate="'required'"
                :error-messages="errors.collect('Note')"
                data-vv-name="Note"
                label="Notes"></v-text-field>
            </v-flex>

            <v-card-actions>
            <v-flex xs12 sm6>
            <v-btn block round color="primary" @click.native="loader = 'load'" :loading="load" :disabled="load" @click.exact="addHotelinquiry()"> Submit Hotel Inquiry</v-btn>
            </v-flex>
            </v-card-actions>
    </v-container>
    </v-card>
   </v-flex>


   
   <v-flex xs12>
    <v-card class='elevation-12'>
    <v-container>
    <v-toolbar-title>Flight Inquiry</v-toolbar-title>

            <v-flex xs12>
                <v-text-field 
                v-model="ffirstName"
                v-validate="'required'"
                :error-messages="errors.collect('First Name')"
                data-vv-name="First Name"
                label="First Name"></v-text-field>
            </v-flex>

            <v-flex xs12>
                <v-text-field 
                v-model="flastName"
                v-validate="'required'"
                :error-messages="errors.collect('Last Name')"
                data-vv-name="Last Name"
                label="Last Name"></v-text-field>
            </v-flex>

            <v-flex xs12>
                <v-text-field 
                v-model="finquiryEmail" 
                v-validate="'required'"
                :error-messages="errors.collect('Email')"
                data-vv-name="Email"
                label="Email"></v-text-field>
            </v-flex>
            
            <v-flex xs12>
                <v-text-field 
                v-model="finquiryOrigin"
                v-validate="'required'"
                :error-messages="errors.collect('InquiryOrigin')"
                data-vv-name="InquiryOrigin"
                label="Origin"></v-text-field>
            </v-flex>

            <v-flex xs12>
                <v-text-field 
                v-model="finquiryArrival"
                v-validate="'required'"
                :error-messages="errors.collect('InquiryArrival')"
                data-vv-name="InquiryArrival"
                label="Arrival"></v-text-field>
            </v-flex>

            <v-flex xs12>
                                        <v-menu
                                            ref="inquiryDepartureDate"
                                            :close-on-content-click="false"
                                            v-model="menu3"
                                            :nudge-right="40"
                                            :return-value.sync="date3"
                                            lazy
                                            transition="scale-transition"
                                            offset-y
                                            full-width
                                            min-width="290px"
                                        >
                                            <v-text-field
                                            slot="activator"
                                            v-model="inquiryDepartureDate"
                                            label="Departure Date"
                                            prepend-icon="event"
                                            readonly
                                            v-validate="'required'"
                                            :error-messages="errors.collect('inquiryDepartureDate')"
                                            ></v-text-field>
                                            <v-date-picker v-model="inquiryDepartureDate" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="$refs.inquiryDepartureDate.save(date3)">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu>
            </v-flex>

            <v-flex xs12>
                                        <v-menu
                                            ref="inquiryArrivalDate"
                                            :close-on-content-click="false"
                                            v-model="menu4"
                                            :nudge-right="40"
                                            :return-value.sync="date4"
                                            lazy
                                            transition="scale-transition"
                                            offset-y
                                            full-width
                                            min-width="290px"
                                        >
                                            <v-text-field
                                            slot="activator"
                                            v-model="inquiryArrivalDate"
                                            label="Arrival Date"
                                            prepend-icon="event"
                                            readonly
                                            v-validate="'required'"
                                            :error-messages="errors.collect('inquiryArrivalDate')"
                                            ></v-text-field>
                                            <v-date-picker v-model="inquiryArrivalDate" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="$refs.inquiryArrivalDate.save(date4)">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu>
            </v-flex>

            <v-flex xs12>
                                            <v-dialog
                                                ref="inquiryTime"
                                                v-model="inquiryTime"
                                                :return-value.sync="InquiryTime"
                                                persistent
                                                lazy
                                                full-width
                                                width="290px"
                                            >
                                                <v-text-field
                                                slot="activator"
                                                v-model="InquiryTime"
                                                label="Time"
                                                prepend-icon="access_time"
                                                readonly
                                                ></v-text-field>
                                                <v-time-picker
                                                v-if="inquiryTime"
                                                v-model="InquiryTime"
                                                actions
                                                full-width
                                                >
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="inquiryTime = false">Cancel</v-btn>
                                                <v-btn flat color="primary" @click="$refs.inquiryTime.save(InquiryTime)">OK</v-btn>
                                                </v-time-picker>
                                            </v-dialog>
            </v-flex>

            <v-flex xs12>
                <v-text-field 
                v-model="fadult"
                v-validate="'required'"
                :error-messages="errors.collect('Adult')"
                data-vv-name="Adult"
                label="Number of Adult"></v-text-field>
            </v-flex>

            <v-flex xs12>
                <v-text-field 
                v-model="fchild"
                v-validate="'required'"
                :error-messages="errors.collect('Child')"
                data-vv-name="Child"
                label="Number of Child"></v-text-field>
            </v-flex>

            <v-flex xs12>
                <v-text-field 
                v-model="finfant"
                v-validate="'required'"
                :error-messages="errors.collect('Infant')"
                data-vv-name="Infant"
                label="Number of Infant"></v-text-field>
            </v-flex>


            <v-flex xs12>
                <v-text-field 
                v-model="fnote"
                v-validate="'required'"
                :error-messages="errors.collect('Note')"
                data-vv-name="Note"
                label="Notes"></v-text-field>
            </v-flex>

            <v-card-actions>
            <v-flex xs12 sm6>
            <v-btn block round color="primary" @click.native="loader = 'load'" :loading="load" :disabled="load" @click.exact="addFlightinquiry()"> Submit Flight Inquiry</v-btn>
            </v-flex>
            </v-card-actions>

    </v-container>
    </v-card>
   </v-flex>
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
    $_veeValidate: {
      validator: 'new',
    },

    data() {
        return {
            valid: false,
            loader: null,
            load: false,
            snackbar: {
                isError: false,
                y: true,
                x: true,
                mode: true,
                timeout: 6000,
                text: null,
                errorMessages: [],
                color: 'error',
            },
            hfirstName: null,
            hlastName: null,
            hemail: null,
            hlocation: null,
            hbudget: null,
            hguest: null,
            hnote: null,
            
            ffirstName: null,
            flastName: null,
            femail: null,
            forigin: null,
            farrival: null,
            fadult: null,
            fchild: null,
            finfant: null,
            fnote: null,


            menu1: null,
            date1: null,
            checkIn: null,
            menu2: null,
            date2: null,
            checkOut: null,
            menu3: null,
            date3: null,
            inquiryDepartureDate: null,
            inquiryArrivalDate: null,
            inquiryTime: false,
            InquiryTime: null,

            fisArchived: false,
            hisArchived: false,


        };
    },
    methods: 
    {
        async addFlightinquiry() 
        {
            const isValid = await this.$refs.form.validate();
            this.$validator.validateAll()
            if (!isValid) {
                this.load = true;
                this.$store.dispatch('addFlightinquiry', 
                {
                    ffirstName: this.ffirstName,
                    flastName: this.flastName,
                    femail: this.femail,
                    forigin: this.forigin,
                    farrival: this.farrival,
                    fdepartureDate: this.fdepartureDate,
                    farrivalDate: this.farrivalDate,
                    ftime: this.ftime,
                    fadult: this.fadult,
                    fchild: this.fchild,
                    finfant: this.finfant,
                    fnote: this.fnote,
                    fisArchived: this.fisArchived,
                })
                .then((response) => {
                    this.load = false;
                    if (response.status === 200) {
                        this.snackbar.color = 'success';
                        this.snackbar.isError = true;
                        this.snackbar.text = 'Successfully Submitted!;'
                    }
                })
                .catch((error) => {
                    console.log(error);
                    if (error.status === 400) {
                        this.load = false;
                        this.snackbar.isError = true;
                        this.snackbar.text = error.data.errors.errorCode;
                        this.snackbar.errorMessages = error.data.errors.message;
                    }
                    if (error.status === 500) {
                        this.load = false;
                        this.snackbar.isError = true;
                        this.snackbar.text = 'Sorry, we\'re slightly having a server error. Please hang on there.';
                    }
                    if (error.status === 404) {
                        this.laod = false;
                        this.snackbar.isError = true;
                        this.snackbar.text = 'Sorry, I\'m afraid we can\'t communicate with the server right now.';
                    } else {
                        this.load = false;
                        this.snackbar.isError = true;
                        this.snackbar.text = error.data.errors.errorCode;
                        this.snackbar.errorMessages = error.data.errors.message;
                    }
                });
            }
        }
    },
        methods: 
    {
        async addHotelinquiry() 
        {
            const isValid = await this.$refs.form.validate();
            this.$validator.validateAll()
            if (!isValid) {
                this.load = true;
                this.$store.dispatch('addHotelinquiry', 
                {
                    hfirstName: this.hfirstName,
                    hlastName: this.hlastName,
                    hemail: this.hemail,
                    hlocation: this.hlocation,
                    hbudget: this.hbudget,
                    hguest: this.hguest,
                    hcheckIn: this.hcheckIn,
                    hckeckOut: this.hckeckOut,
                    hnote: this.hnote,
                    hisArchived: this.hisArchived,
                })
                .then((response) => {
                    this.load = false;
                    if (response.status === 200) {
                        this.snackbar.color = 'success';
                        this.snackbar.isError = true;
                        this.snackbar.text = 'Successfully Submitted!;'
                    }
                })
                .catch((error) => {
                    console.log(error);
                    if (error.status === 400) {
                        this.load = false;
                        this.snackbar.isError = true;
                        this.snackbar.text = error.data.errors.errorCode;
                        this.snackbar.errorMessages = error.data.errors.message;
                    }
                    if (error.status === 500) {
                        this.load = false;
                        this.snackbar.isError = true;
                        this.snackbar.text = 'Sorry, we\'re slightly having a server error. Please hang on there.';
                    }
                    if (error.status === 404) {
                        this.laod = false;
                        this.snackbar.isError = true;
                        this.snackbar.text = 'Sorry, I\'m afraid we can\'t communicate with the server right now.';
                    } else {
                        this.load = false;
                        this.snackbar.isError = true;
                        this.snackbar.text = error.data.errors.errorCode;
                        this.snackbar.errorMessages = error.data.errors.message;
                    }
                });
            }
        }
    },
};
</script>

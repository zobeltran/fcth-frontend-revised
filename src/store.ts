import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const apiUrl: string = process.env.VUE_APP_ROOT_API;

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
  },
  mutations: {
    retrieveToken(state: any, data: any) {
      state.token = data.token;
      state.role = data.role;
    },
    destroyToken(state: any) {
      state.token = null;
    },
  },
  actions: {
    // API Calls
    // *------ USER API CALLS ------* //
    /**
     * Method that handles Authentication
     * 
     * @param context
     * @param credentials Credentials inputed by User in the form
     * @returns Promise containing a resolve or reject
     */
    retrieveToken(context: any, credentials: any) {
      return new Promise((resolve, reject) => {
        axios.post(apiUrl + 'api/v1/users/auth', {
          // username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        })
          .then((response) => {
            console.log(response.data);
            const data = response.data.data;
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('userID', data.id);
            context.commit('retrieveToken', data);
            resolve(response);
          })
          .catch((error) => {
            if (!error.response) {
              reject('Network Error');
            } else {
              localStorage.removeItem('token');
              reject(error.response);
            }
          });
      });
    },
    /**
     * Method that handles Registration
     * 
     * @param context
     * @param data Inputs from form
     * @returns Promise containing a resolve or reject
     */
    registerEmployee(context: any, data: any) {
      return new Promise((resolve, reject) => {
        axios.post(apiUrl + 'api/v1/users/employee',
          {
            name: {
              first: data.firstName,
              middle: data.middleName,
              last: data.lastName,
            },
            details: {
              email: data.email,
              role: data.role,
            },
            // username: data.username,
            password: data.password,
            // webUrl: window.location.hostname + ':' + window.location.port + '/confirmpassword/',
            webUrl: window.location.hostname + '/confirmpassword/',
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            if (!error.response) {
              reject('Network Error');
            } else {
              reject(error.response);
            }
          });
      });
    },
    verifyEmployee(context: any, data: any) {
      return new Promise((resolve, reject) => {
        axios.put(apiUrl + 'api/v1/users/employee/id=' + data.id,
        {
          password: data.password,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (!error.response) {
            reject('Network Error');
          } else {
            reject(error.response);
          }
        });
      });
    },
    // *------ TICKET API CALLS ------* //
    /**
     * Method that handles Getting
     * the approve tickets for customer
     * to see
     * 
     * @returns Promise containing a resolve or reject
     */
    viewUserId(context: any, data: any) {
      return new Promise((resolve, reject) => {
        console.log(apiUrl + 'api/v1/users/employee?id=' + data.id);
        axios.get(apiUrl + 'api/v1/users/employee?id=' + data.id,
        {
          headers: { 'x-client-token': localStorage.getItem('token') },
        })
          .then((response: any) => {
            resolve(response);
          })
          .catch((error: any) => {
            reject(error.response);
          });
      });
    },
    viewFlights() {
      return new Promise((resolve, reject) => {
        axios.get(apiUrl + 'api/v1/tickets')
          .then((response: any) => {
            resolve(response);
          })
          .catch((error: any) => {
            reject(error.response);
          });
      });
    },
    /**
     * Method that handles getting
     * the tickets for approval
     * for the admin to see
     * 
     * @returns Promise containing a resolve or reject
     */
    viewFlightsForApproval() {
      return new Promise((resolve, reject) => {
        axios.get(apiUrl + 'api/v1/tickets/approval', { headers: { 'x-client-token': localStorage.getItem('token') } })
          .then((response: any) => {
            resolve(response);
          })
          .catch((error: any) => {
            reject(error.response);
          });
      });
    },
    /**
     * Method that handles updating
     * the tickets to approved or not
     * 
     * @param context 
     * @param data Inputs from form
     * @returns Promise containing results from PUT
     * api/v1/tickets/approval
     */
    approveFlights(context: any, data: any) {
      return new Promise((resolve, reject) => {
        axios.put(apiUrl + 'api/v1/tickets/approval',
          {
            isApproved: data.isApproved,
          },
          {
            headers: { 'x-client-token': localStorage.getItem('token') },
            params: { id: data.id },
          })
          .then((response: any) => {
            resolve(response);
          })
          .catch((error: any) => {
            reject(error.response);
          });
      });
    },
    /**
     * Method that handles post request 
     * of creating new tickets
     * 
     * @param context 
     * @param data Input from Form
     * @returns Promise containing a resolve or reject
     */
    addFlight(context: any, data: any) {
      return new Promise((resolve, reject) => {
        axios.post(apiUrl + 'api/v1/tickets',
          {
            flightNo: data.flightNo,
            origin: {
              location: data.origin,
              date: data.departureDate,
              time: data.departureTime,
            },
            return: {
              location: data.arrival,
              date: data.returnDate,
              time: data.returnTime,
            },
            remainingSlots: data.remainingSlots,
            price: data.price,
            expirationDate: data.expirationDate,
            isPackaged: data.isPackaged,
          },
          {
            headers: { 'x-client-token': localStorage.getItem('token') },
          },
        )
          .then((response: any) => {
            resolve(response);
          })
          .catch((error: any) => {
            reject(error.response);
          });
      });
    },
    /**
     * Method that handles updating flights
     * 
     * @param context 
     * @param data Inputs from form
     * @returns Promise compromising a resolve and reject
     */
    updateFlight(context: any, data: any) {
      return new Promise((resolve, reject) => {
        axios.put(apiUrl + 'api/v1/tickets',
          {
            flight: data.flightNo,
            origin: {
              location: data.origin,
              date: data.departureDate,
              time: data.departureTime,
            },
            return: {
              location: data.arrival,
              date: data.arrivalDate,
              time: data.arrivalTime,
            },
            remainingSlots: data.remainingSlots,
            price: data.price,
            expirationDate: data.expirationDate,
            isPackaged: data.isPackaged,
          },
          {
            headers: { 'x-client-token': localStorage.getItem('token') },
            params: { id: data.id },
          })
          .then((response: any) => {
            resolve(response);
          })
          .catch((error: any) => {
            reject(error.response);
          });
      });
    },
    /**
     * Method that handles deleting of flights
     * 
     * @param context 
     * @param data Inputs from form
     * @returns Promise compromising a resolve and reject
     */
    deleteFlight(context: any, data: any) {
      return new Promise((resolve, reject) => {
        axios.delete(process.env.VUE_APP_ROOT_API + 'api/v1/tickets',
          {
            headers: { 'x-client-token': localStorage.getItem('token') },
            params: { id: data.id },
          })
          .then((response) => resolve(response))
          .catch((error) => reject(error.response));
      });
    },
    /**
     * Method that handles booking a customer
     * for a ticket
     * 
     * @param context 
     * @param data values recieved from View Page
     * @returns Promise containing the results from
     * POST api/v1/bookings/ticket
     */
    ticketBooking(context: any, data: any) {
      return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_ROOT_API + 'api/v1/bookings/ticket',
          {
            ticket: data.ticket,
          },
          {
            headers: { 'x-client-token': localStorage.getItem('token') },
          })
          .then((response: any) => {
            console.log(response);
            resolve(response);
          })
          .catch((error: any) => {
            console.log(error);
            reject(error.response);
          });
      });
    },
    // *------ HOTEL API CALLS ------* //
    /**
     * Method that handles creating
     * new hotels
     * 
     * @param context 
     * @param data Inputs from form
     * @returns Promise compromising a resolve and reject
     */
    addHotel(context: any, data: any) {
      return new Promise((resolve, reject) => {
        axios.post(apiUrl + 'api/v1/hotels',
          {
            name: data.name,
            room: {
              type: data.roomType,
              capacity: data.capacity,
            },
            details: data.details,
            checkDates: {
              in: data.checkIn,
              out: data.checkOut,
            },
            price: data.price,
            expirationDate: data.expirationDate,
            remainingRooms: data.remainingRooms,
            isPackaged: data.isPackaged,
          },
          {
            headers: { 'x-client-token': localStorage.getItem('token') },
          })
          .then((response: any) => {
            resolve(response);
          })
          .catch((error: any) => {
            reject(error.response);
          });
      });
    },
    /**
     * Method that handles updating
     * the Hotels
     * 
     * @param context 
     * @param data Inputs from form
     * @returns Promise containing the results from PUT
     * api/v1/hotels
     */
    updateHotel(context: any, data: any) {
      return new Promise((resolve: any, reject: any) => {
        axios.put(apiUrl + 'api/v1/hotels',
          {
            name: data.name,
            room: {
              type: data.roomType,
              capacity: data.capacity,
            },
            details: data.details,
            checkDates: {
              in: data.checkIn,
              out: data.checkOut,
            },
            price: data.price,
            expirationDate: data.expirationDate,
            remainingRooms: data.remainingRooms,
            isPackaged: data.isPackaged,
          },
          {
            headers: { 'x-client-token': localStorage.getItem('token') },
            params: { id: data.id },
          })
          .then((response: any) => {
            resolve(response);
          })
          .catch((error: any) => {
            reject(error.response);
          });
      });
    },
    /**
     * Method that handles getting the
     * hotel details depending on the hotel ID
     * 
     * @param context 
     * @param data items passed by method
     * @returns Promise containing the results from
     * GET api/v1/hotels/id=param
     */
    viewHotelId(context: any, data: any) {
      return new Promise((resolve, reject) => {
        axios.get(apiUrl + 'api/v1/hotels/id=' + data.id,
          {
            headers: { 'x-client-token': localStorage.getItem('token') },
          })
          .then((response) => {
            console.log(response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error.response);
          });
      });
    },
    /**
     * Method that handles viewing of
     * approved hotels for customers to
     * see
     * 
     * @returns Promise containing the results from GET
     * api/v1/hotels
     */
    viewHotels() {
      return new Promise((resolve, reject) => {
        axios.get(apiUrl + 'api/v1/hotels')
          .then((response) => {
            console.log(response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error.response);
          });
      });
    },
    /**
     * Method that handles approving
     * the hotels
     * 
     * @param context 
     * @param data Inputs provided from form
     */
    approveHotels(context: any, data: any) {
      return new Promise((resolve, reject) => {
        axios.put(apiUrl + 'api/v1/hotels/approval',
          {
            isApproved: data.isApproved,
          },
          {
            headers: { 'x-client-token': localStorage.getItem('token') },
            params: { id: data.id },
          })
          .then((response: any) => {
            resolve(response);
          })
          .catch((error: any) => {
            reject(error.response);
          });
      });
    },
    /**
     * Method that handles deleting of hotels
     * 
     * @param context 
     * @param data Passed data by view
     * @returns Promise containing the results from
     * DELETE api/v1/hotels
     */
    deleteHotel(context: any, data: any) {
      return new Promise((resolve, reject) => {
        axios.delete(apiUrl + 'api/v1/hotels',
          {
            headers: { 'x-client-token': localStorage.getItem('token') },
            params: { id: data.id },
          })
          .then((response) => resolve(response))
          .catch((error) => reject(error.response));
      });
    },
    /**
     * Method that handles viewing of 
     * hotels for approval
     * 
     * @returns Promise containing the results from
     * GET api/v1/hotels/approval
     */
    viewHotelsForApproval() {
      return new Promise((resolve, reject) => {
        axios.get(apiUrl + 'api/v1/hotels/approval', { headers: { 'x-client-token': localStorage.getItem('token') } })
          .then((response: any) => {
            console.log(response);
            resolve(response);
          })
          .catch((error: any) => {
            reject(error.response);
          });
      });
    },

    inviteAFriend( context: any, data: any ) {
      return new Promise(( resolve, reject ) => {
        axios.post( apiUrl + "api/v1/invite", {
          email: data.email
        }, {
          headers: {
            'x-client-token': localStorage.getItem( 'token' )
          }
        }).then(( response: any ) => {
          resolve( response )
        }).catch(( error: any ) => {
          reject( error.response )
        })
      })
    },

    suggestPackage( context: any, data: any ) {
      return new Promise(( resolve, reject ) => {
        axios.post( apiUrl + "api/v1/invite/suggest", {
          email: data.email,
          id: data.id
        }, {
          headers: {
            'x-client-token': localStorage.getItem( 'token' )
          }
        }).then(( response: any ) => {
          resolve( response )
        }).catch(( error: any ) => {
          reject( error.response )
        })
      })
    },
    /**
     * Method that handles booking a customer
     * for a hotel
     * 
     * @param context 
     * @param data values recieved from View Page
     * @returns Promise containing the results from
     * POST api/v1/bookings/hotel
     */
    hotelBookings(context: any, data: any) {
      return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_ROOT_API + 'api/v1/bookings/hotel',
          {
            hotel: data.hotel,
          },
          {
            headers: { 'x-client-token': localStorage.getItem('token') },
          })
          .then((response: any) => {
            console.log(response);
            resolve(response);
          })
          .catch((error: any) => {
            console.log(error);
            reject(error.response);
          });
      });
    },
    viewHotelBookings() {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_ROOT_API + 'api/v1/bookings/hotel',
          { headers: { 'x-client-token': localStorage.getItem('token') },
        })
        .then((response: any) => {
          console.log(response);
          resolve(response);
        })
        .catch((error: any) => {
          console.log(error);
          reject(error.response);
        });
      });
    },
    viewFlightBookings() {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_ROOT_API + 'api/v1/bookings/ticket',
          { headers: { 'x-client-token': localStorage.getItem('token') },
        })
        .then((response: any) => {
          console.log(response);
          resolve(response);
        })
        .catch((error: any) => {
          console.log(error);
          reject(error.response);
        });
      });
    },
    viewPackageBookings() {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_ROOT_API + 'api/v2/packages/booking',
          { headers: { 'x-client-token': localStorage.getItem('token') },
        })
        .then((response: any) => {
          console.log(response);
          resolve(response);
        })
        .catch((error: any) => {
          console.log(error);
          reject(error.response);
        });
      });
    },
    /**
     * ! WARNING: Depreciated
     * 
     * FIXME: Fix or delete this function
     * @param context 
     * @param data 
     */
    addCustomers(context, data) {
      return new Promise((resolve, reject) => {
        axios.post(apiUrl + 'api/v1/customers',
          {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            contactNo: data.contactNo,
            hotelBooking: data.hotelBooking,
            flightBooking: data.flightBooking,
            packageBooking: data.packageBooking,
          },
          {
            headers: { 'x-client-token': localStorage.getItem('token') },
          })
          .then((response: any) => {
            resolve(response);
          })
          .catch((error: any) => {
            reject(error.response);
          });
      });
    },
    // *------ Package API CALLS ------* //
    /**
     * Method that handles getting
     * packaged tickets
     * 
     * @returns Promise containing the results from GET
     * api/v1/packages/approval/tickets
     * 
     */
    getPackagedFlight() {
      return new Promise((resolve, reject) => {
        axios.get(apiUrl + 'api/v1/packages/tickets',
          {
            headers: { 'x-client-token': localStorage.getItem('token') },
          })
          .then((response) => {
            console.log(response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error.response);
          });
      });
    },
    /**
     * Method that handles getting
     * the packaged hotels
     * 
     * @returns Promise containing the results from GET
     * api/v1/packages/approval/hotels
     */
    getPackagedHotel() {
      return new Promise((resolve, reject) => {
        axios.get(apiUrl + 'api/v1/packages/hotels',
          {
            headers: { 'x-client-token': localStorage.getItem('token') },
          })
          .then((response) => {
            console.log(response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error.response);
          });
      });
    },
    /**
     * Method that handles adding
     * new packages
     * 
     * @param context 
     * @param data Inputs from form
     * @returns Promise containing the results from
     * POST api/v1/packages
     * 
     * !DEPRECIATED
     */
    addPackage(context: any, data: any) {
      console.log(data);
      return new Promise((resolve, reject) => {
        axios.post(apiUrl + 'api/v1/packages',
          {
            details: {
              days: data.days,
              itinerary: data.itenerary,
              notes: data.notes,
              inclusions: data.inclusions,
            },
            name: data.name,
            price: data.price,
            ticket: data.ticket,
            hotel: data.hotel,
            remainingSlots: data.remainingSlots,
            departureDate: data.departureDate,
            expirationDate: data.expirationDate,
          },
          {
            headers: { 'x-client-token': localStorage.getItem('token') },
          })
          .then((response: any) => {
            console.log(response);
            resolve(response);
          })
          .catch((error: any) => {
            console.log(error);
            reject(error.response);
          });
      });
    },
    /**
     * Method that handles adding
     * new packages
     * 
     * @param context 
     * @param data Input from from
     * @returns Promise containing the results from
     * POST api/v2/packages
     */
    addPackageVersion2(context: any, data: any) {
      return new Promise((resolve, reject) => {
        axios.post(apiUrl + 'api/v2/packages',
        {
          details: {
            days: data.days,
            notes: data.notes,
            inclusions: data.inclusions,
          },
          itinerary: data.itinerary,
          name: data.name,
          ticket: data.ticket,
          hotel: data.hotel,
          remainingSlots: data.remainingSlots,
          expirationDate: data.expirationDate,
        },
        {
          headers: { 'x-client-token': localStorage.getItem('token') },
        })
        .then((response: any) => {
          console.log(response);
          resolve(response);
        })
        .catch((error: any) => {
          console.log(error);
          reject(error.response);
        });
      });
    },
    /**
     * Method that handles approving
     * pakcages
     * 
     * @param context 
     * @param data Inputs from form
     * @returns Promise containing the results from
     * PUT api/v1/packages/approval
     */
    approvePackage(context: any, data: any) {
      return new Promise((resolve, reject) => {
        axios.put(apiUrl + 'api/v1/packages/approval',
          {
            isApproved: data.isApproved,
          },
          {
            headers: { 'x-client-token': localStorage.getItem('token') },
            params: { id: data.id },
          })
          .then((response: any) => {
            console.log(response);
            resolve(response);
          })
          .catch((error: any) => {
            console.error(error.response);
            reject(error.response);
          });
      });
    },
    /**
     * Method that handles viewing of
     * approved packages
     * 
     * @returns Promise containing the results from
     * GET api/v1/packages
     * 
     * !DEPRECIATED
     */
    viewPackage() {
      return new Promise((resolve, reject) => {
        axios.get(apiUrl + 'api/v1/packages')
          .then((response) => {
            console.log(response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    /**
     * Method that handles viewing of
     * approved packages
     * 
     * @returns Promise containing the results from
     * GET api/v2/packages
     */
    viewPackageVersion2(context: any, data: any) {
      let url: string = apiUrl + 'api/v2/packages';
      if( data ) {
        url = url + "?package=" + data.id
      }
      return new Promise((resolve, reject) => {        
        axios.get( url,
          {
            headers: { 'x-client-token': localStorage.getItem('token') },
          })
          .then((response) => {
            console.log( "BACKEND RESPONSE:", response )
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    viewPackagesForApproval() {
      return new Promise((resolve, reject) => {
        axios.get(apiUrl + 'api/v1/packages/approval',
          {
            headers: { 'x-client-token': localStorage.getItem('token') },
          })
          .then((response) => {
            console.log(response);
            resolve(response);
          })
          .catch((error) => {
            console.error(error);
            reject(error.response);
          });
      });
    },
    /**
     * Method that handles booking a customer
     * for a package
     * 
     * @param context 
     * @param data values recieved from View Page
     * @returns Promise containing the results from
     * POST api/v2/packages/booking
     */
    packageBooking(context: any, data: any) {
      return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_ROOT_API + 'api/v1/bookings/package',
          {
            package: data.package,
          },
          {
            headers: { 'x-client-token': localStorage.getItem('token') },
          })
          .then((response: any) => {
            console.log(response);
            resolve(response);
          })
          .catch((error: any) => {
            console.log(error);
            reject(error.response);
          });
      });
    },
    // *------ PAYMENT API ------* //
    /**
     * Handles payments for booking
     * 
     * @param context 
     * @param data data recieved from response of checkout
     * @returns Promise containing the results from
     * POST api/v1/payments
     */
    payBooking(context: any, data: any) {
      return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_ROOT_API + 'api/v1/payments',
        {
          referenceNumber: data.referenceNumber,
          token: data.token,
          email: data.email,
          amount: data.amount,
          description: data.description,
          paymentFor: data.paymentFor,
        },
        {
          headers: { 'x-client-token': localStorage.getItem('token') },
        })
        .then((response: any) => {
          console.log(response);
          resolve(response);
        })
        .catch((error: any) => {
          console.log(error);
          reject(error.response);
        });
      });
    },
    // *------ FRONT-END FUNCTION CALLS ------* //
    destroyToken(context) {
      if (context.getters.loggedIn) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        context.commit('destroyToken');
      }
    },
  },
  getters: {
    // Checks if logged in
    loggedIn(state: any) {
      return state.token !== null;
    },
    // Checks if the logged User Role is Admin
    loggedAdmin(state: any) {
      return state.role === 'AD' && state.role !== null;
    },
    // Checks if the logged User Role is Reservation Officer
    loggedReservationOfficer(state: any) {
      return state.role === 'RO' && state.role !== null;
    },
    // Checks if the logged User Role is Financial Offier
    loggedFinancialOfficer(state: any) {
      return state.role === 'FO' && state.role !== null;
    },
    // Checks if the logged User Role is Customer
    loggedCustomer(state: any) {
      return state.role === 'CU' && state.role !== null;
    },
    loggedRole(state: any) {
      return state.role;
    },
  },
});

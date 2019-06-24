import Vue from 'vue';
import VueRouter from 'vue-router';
import {RouterMode, RouteConfig } from 'vue-router';
// import Home from './views/Home.vue';

Vue.use(VueRouter);

const mode: RouterMode = 'history';

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "customer" */ './views/customer/CustomerHome.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "auth" */ './views/Login.vue'),
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import(/* webpackChunkName: "auth" */ './views/Logout.vue'),
  },
  {
    path: '/editprofile/',
    name: 'editprofile',
    component: () => import(/* webpackChunkName: "auth" */ './views/customer/EditProfile.vue'),
  },
  {
    path: '/employee',
    name: 'employeeHome',
    component: () => import(/* webpackChunkName: "employee" */ './views/employee/EmployeeHome.vue'),
    meta: {
      requiresAuth: true,
      roles: ['AD', 'RO', 'FO'],
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "employee" */ './views/employee/Register.vue'),
    meta: {
      requiresAuth: true,
      roles: ['AD', 'RO'],
    },
  },
  {
    path: '/confirmPassword/:id',
    name: 'confirmPassword',
    component: () => import(/* webpackChunkName: "employee" */ './views/employee/ConfirmPassword.vue'),
  },
  {
    path: '/packages',
    name: 'customerPackage',
    component: () => import(/* webpackChunkName: "customer" */ './views/customer/CustomerPackage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['CU'],
    },
  },
  {
    path: '/invite',
    name: 'customerInvite',
    component: () => import(/* webpackChunkName: "customer" */ './views/customer/CustomerInvite.vue'),
    meta: {
      requiresAuth: true,
      roles: ['CU'],
    },
  },
  {
    path: '/suggest',
    name: 'customerSuggest',
    component: () => import( './views/customer/CustomerSuggest.vue' ),
    meta: {
      requiresAuth: true,
      roles: [ 'CU' ]
    }
  },
  {
    path: '/tickets',
    name: 'customerTicket',
    component: () => import(/* webpackChunkName: "customer" */ './views/customer/CustomerTicket.vue'),
    meta: {
      requiresAuth: true,
      roles: ['CU'],
    },
  },
  {
    path: '/hotels',
    name: 'customerHotel',
    component: () => import(/* webpackChunkName: "customer" */ './views/customer/CustomerHotel.vue'),
    meta: {
      requiresAuth: true,
      roles: ['CU'],
    },
  },
  {
    path: '/inquiries/tickets',
    name: 'customerflightInquiries',
    component: () => import(/* webpackChunkName: "customer" */ './views/customer/CustomerFlightInquiries.vue'),
    meta: {
      requiresAuth: true,
      roles: ['CU'],
    },
  },
  {
    path: '/inquiries/hotels',
    name: 'customerhotelInquiries',
    component: () => import(/* webpackChunkName: "customer" */ './views/customer/CustomerHotelInquiries.vue'),
    meta: {
      requiresAuth: true,
      roles: ['CU'],
    },
  },
  {
    path: '/customer/bookings/flight',
    name: 'flightBooking',
    component: () => import(/* webpackChunkName: "customer" */ './views/customer/FlightBooking.vue'),
    meta: {
      requiresAuth: true,
      roles: ['CU'],
    },
  },
  {
    path: '/flights/add',
    name: 'addFlights',
    component: () => import(/* webpackChunkName: "employee" */ './views/employee/AddFlights.vue'),
    meta: {
      requiresAuth: true,
      roles: ['AD', 'RO'],
    },
  },
  {
    path: '/flights/update/:id',
    name: 'updateFlights',
    component: () => import(/* webpackChunkName: "employee" */ './views/employee/UpdateFlights.vue'),
    meta: {
      requiresAuth: true,
      roles: ['AD', 'RO'],
    },
  },
  {
    path: '/flights/view',
    name: 'approveFlights',
    component: () => import(/* webpackChunkName: "employee" */ './views/employee/FlightsApproval.vue'),
    meta: {
      requiresAuth: true,
      roles: ['AD'],
    },
  },
  {
    path: '/flights/view',
    name: 'viewFlights',
    component: () => import(/* webpackChunkName: "employee" */ './views/employee/ViewTicket.vue'),
    meta: {
      requiresAuth: true,
      roles: ['AD', 'RO'],
    },
  },
  {
    path: '/flights/bookings',
    name: 'flightBookings',
    component: () => import(/* webpackChunkName: "employee" */ './views/customer/FlightBooking.vue'),
    meta: {
      requiresAuth: true,
      roles: ['CU', 'AD', 'RO'],
    },
  },
  {
    path: '/flights/approval',
    name: 'flightApproval',
    component: () => import(/* webpackChunkName: "employee" */ './views/employee/FlightsApproval.vue'),
    meta: {
      requiresAuth: true,
      roles: ['AD'],
    },
  },
  {
    path: '/hotels/add',
    name: 'addHotels',
    component: () => import(/* webpackChunkName: "employee" */ './views/employee/AddHotels.vue'),
    meta: {
      requiresAuth: true,
      roles: ['AD', 'RO'],
    },
  },
  {
    path: '/hotels/update/:id',
    name: 'updateHotels',
    component: () => import(/* webpackChunkName: "employee" */ './views/employee/UpdateHotels.vue'),
    meta: {
      requiresAuth: true,
      roles: ['AD', 'RO'],
    },
  },
  {
    path: '/hotels/approvals',
    name: 'hotelsForApproval',
    component: () => import(/* webpackChunkName: "employee" */ './views/employee/HotelsApproval.vue'),
    meta: {
      requiresAuth: true,
      roles: ['AD'],
    },
  },
  {
    path: '/hotels/customerview',
    name: 'viewHotels',
    component: () => import(/* webpackChunkName: "employee" */ './views/employee/ViewHotel.vue'),
    meta: {
      requiresAuth: true, 
      roles: ['AD', 'RO'],
    },
  },
  {
    path: '/customer/bookings/hotels',
    name: 'hotelBookings',
    component: () => import(/* webpackChunkName: "customer" */ './views/customer/HotelBooking.vue'),
    meta: {
      requiresAuth: true,
      roles: ['CU'],
    },
  },

  // ------- PACKAGES
  //  {
  //    path: '/packages/customeradd',
  //    name: 'addPackages',
  //    component: () => import (/* webpackChunkName: "employee" */ './views/employee/AddPackage.vue'),
  //  },
  {
    path: '/packages/addpackage',
    name: 'addPackage',
    component: () => import(/* webpackChunkName: "employee" */ './views/employee/AddPackage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['AD', 'RO'],
    },
  },
  {
    path: '/packages/viewpackages',
    name: 'viewPackages',
    component: () => import(/* webpackChunkName: "employee" */ './views/employee/ViewPackages.vue'),
    meta: {
      requiresAuth: true,
      roles: ['AD', 'RO'],
    },
  },

  {
    path: '/packages/approvals',
    name: 'packageForApproval',
    component: () => import(/* webpackChunkName: "employee" */ './views/employee/PackageApproval.vue'),
    meta: {
      requiresAuth: true,
      roles: ['AD'],
    },
  },
  {
    path: '/customer/bookings/packages',
    name: 'packageBooking',
    component: () => import(/* webpackChunkName: "employee" */ './views/customer/PackageBooking.vue'),
    meta: {
      requiresAuth: true,
      roles: ['CU'],
    },
  },
  //  {
  //   path: '/packages/viewpackage',
  //    name: 'viewPackage',
  //    component: () => import (/* webpackChunkName: "employee" */ './views/employee/ViewPackage.vue'),
  //  },
  // ------- PACKAGE END

  {
    path: '/customer/registercustomer',
    name: 'registerCustomer',
    component: () => import(/* webpackChunkName: "customer" */ './views/customer/CustomerRegistration.vue'),
  },
  {
    path: '/customer/checkout/:id',
    name: 'checkoutCustomer',
    component: () => import(/* webpackChunkName: "customer" */ './views/customer/CheckOut.vue'),
  },
  // {
  //   path: '/inquiries/tickets',
  //   name: 'FlightInquiries',
  //   component: () => import(/* webpackChunkName: "employee" */ './views/employee/FlightInquiries.vue'),
  //   meta: {
  //     requiresAuth: true,
  //     roles: ['RO'],
  //   },
  // },
  //  {
  //   path: '/inquiries/hotels',
  //   name: 'HotelInquiries',
  //   component: () => import(/* webpackChunkName: "employee" */ './views/employee/HotelInquiries.vue'),
  //   meta: {
  //     requiresAuth: true,
  //     roles: ['RO'],
  //   },
  // },
];

export default new VueRouter({
  mode,
  routes,
});

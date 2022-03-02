import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import { Store } from 'vuex';
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $$refs: any

    $showSuccess: any;
    $showError: any;
    $showWarn: any;
    $showSuccess: any;
    $loading: any;
    $msgbox: any;
    $alert: any;
    $confirm: any;
    $prompt: any;
    $notify: any;
  }
}

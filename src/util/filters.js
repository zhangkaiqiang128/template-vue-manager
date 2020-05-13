import Vue from 'vue';

export const dateTimeFormat = (val, format) => {}
export const numberFormat = (val) => {}
export const emptyFormat = (val) => {}

Vue.filter('dateTimeFormat', dateTimeFormat);
Vue.filter('numberFormat', numberFormat);
Vue.filter('emptyFormat', emptyFormat);

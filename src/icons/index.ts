import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue';

Vue.component('SvgIcon', SvgIcon);

const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext: any) => requireContext.keys().map(requireContext);

requireAll(req);
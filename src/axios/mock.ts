import axiosInstance from './intercept';
import MockAdapter from 'axios-mock-adapter';

import adapter from '../../mock';

const mock = new MockAdapter(axiosInstance, { delayResponse: 2000 });


adapter.install(mock);



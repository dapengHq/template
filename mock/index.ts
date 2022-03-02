import MockAdapter from 'axios-mock-adapter';
import userMock from './user';

export default {
  install(mock: MockAdapter) {
    userMock(mock);
  }
};
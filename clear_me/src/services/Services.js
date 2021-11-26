import ApiService from './ApiService';

export default class Services {
  api;

  constructor() {
    this.init();
  }

  init() {
    this.api = new ApiService();
  }
}

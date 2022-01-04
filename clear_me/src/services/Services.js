import Validations from '../validations/Validations';
import ApiService from './ApiService';
import AppService from './AppService';

export default class Services {
  api;
  validations;
  app;

  constructor() {
    this.init();
  }

  init() {
    this.api = new ApiService();
    this.validations = new Validations();
    this.app = new AppService();
  }
}

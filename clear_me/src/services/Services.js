import Validations from '../validations/Validations';
import ApiService from './ApiService';

export default class Services {
  api;
  validations;

  constructor() {
    this.init();
  }

  init() {
    this.api = new ApiService();
    this.validations = new Validations();
  }
}

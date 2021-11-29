export default class Validations {
  validateZipCode(zipCode) {
    const pattern = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

    return pattern.test(zipCode);
  }
}

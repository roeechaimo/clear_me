export default class ApiService {
  #baseUrl = 'https://5fe220547a9487001768215e.mockapi.io/api/v1/';

  // TODO - refactor

  getOrganizations(callback) {
    fetch(`${this.#baseUrl}organization`)
      .then((res) => res.json())
      .then(
        (result) => {
          return callback(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getOrganizationDetails(OrganizationId, callback) {
    fetch(`${this.#baseUrl}organization/${OrganizationId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          return callback(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}

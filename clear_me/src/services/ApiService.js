// const usZipCodes =
//   'https://gist.githubusercontent.com/erichurst/7882666/raw/5bdc46db47d9515269ab12ed6fb2850377fd869e/US%2520Zip%2520Codes%2520from%25202013%2520Government%2520Data';

export default class ApiService {
  #baseUrl = 'https://5fe220547a9487001768215e.mockapi.io/api/v1/';
  #zipCodeApiKey = 'PevE06UaIpAoGaA65tO9z0F2SdW8Vwk1';
  #zipCodesUrl = `http://www.mapquestapi.com/geocoding/v1/batch?key=${this.#zipCodeApiKey}`;

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

  getMemebers(callback) {
    fetch(`${this.#baseUrl}members`)
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

  // getZipCodes(callback) {
  //   fetch(`${usZipCodes}`)
  //     .then((res) => res.text())
  //     .then(
  //       (result) => {
  //         return callback(result);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }
  async getZipCodes(data = {}) {
    // Default options are marked with *
    const response = await fetch(this.#zipCodesUrl, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    return response.json(); // parses JSON response into native JavaScript objects
  }
}

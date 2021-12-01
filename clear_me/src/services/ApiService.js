export default class ApiService {
  #baseUrl = 'https://61a689cf8395690017be9324.mockapi.io/api/v1/';
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

  getOrganizationDetails(organizationId, callback) {
    fetch(`${this.#baseUrl}organization/${organizationId}`)
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

  getMemeberDetails(memberId, callback) {
    fetch(`${this.#baseUrl}members/${memberId}`)
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

  async getZipCodes(data = {}) {
    const response = await fetch(this.#zipCodesUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });

    return response.json();
  }

  async updateMember(memberId, data = {}) {
    const response = await fetch(`${this.#baseUrl}members/${memberId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });

    return response.json();
  }
}

import { API } from '../constants/api.constants';

export default class ApiService {
  #baseUrl;
  #zipCodeApiKey;
  #zipCodesUrl;

  constructor() {
    this.#baseUrl = API.BASE_URL;
    this.#zipCodeApiKey = API.ZIP_CODE_API_KEY;
    this.#zipCodesUrl = `${API.ZIP_CODE_URL}${this.#zipCodeApiKey}`;
  }

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

  async getOrganizationDetails(organizationId) {
    try {
      const response = await fetch(
        `${process.env.NODE_ENV === 'test' ? API.BASE_URL : this.#baseUrl}organization/${organizationId}`
      );

      const result = await response.json();

      return result;
    } catch (e) {
      console.log(e);
    }
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

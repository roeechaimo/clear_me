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

  async getOrganizations() {
    try {
      const response = await fetch(`${process.env.NODE_ENV === 'test' ? API.BASE_URL : this.#baseUrl}organization`);

      const result = await response.json();

      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async getOrganizationDetails(organizationId) {
    try {
      if (organizationId) {
        const response = await fetch(
          `${process.env.NODE_ENV === 'test' ? API.BASE_URL : this.#baseUrl}organization/${organizationId}`
        );

        const result = await response.json();

        return result;
      }

      return null;
    } catch (e) {
      console.log(e);
    }
  }

  async getMembers() {
    try {
      const response = await fetch(`${process.env.NODE_ENV === 'test' ? API.BASE_URL : this.#baseUrl}members`);

      const result = await response.json();

      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async getMemeberDetails(memberId) {
    try {
      const response = await fetch(
        `${process.env.NODE_ENV === 'test' ? API.BASE_URL : this.#baseUrl}members/${memberId}`
      );

      const result = await response.json();

      return result;
    } catch (e) {
      console.log(e);
    }
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
    try {
      const response = await fetch(
        `${process.env.NODE_ENV === 'test' ? API.BASE_URL : this.#baseUrl}members/${memberId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(data),
        }
      );

      return response.json();
    } catch (e) {
      console.log(e);
    }
  }
}

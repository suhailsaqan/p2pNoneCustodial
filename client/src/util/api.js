const baseUrl = "http://localhost:9000";

const methods = {
  get: async function (endpoint, token = null) {
    const options = {
      method: "GET",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    const json = await response.json();

    if (!response.ok) throw Error(json.message);

    return json;
  },

  post: async function (endpoint, body, token = null) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    const json = await response.json();

    if (!response.ok) {
      if (response.status === 422) {
        json.errors.forEach((error) => {
          throw Error(`${error.param} ${error.msg}`);
        });
      }

      throw Error(json.message);
    }

    return json;
  },

  delete: async function (endpoint, token = null) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    const json = await response.json();

    if (!response.ok) {
      if (response.status === 401) throw Error("unauthorized");
      throw Error(json.message);
    }

    return json;
  },
};

export async function getContract(id) {
  return await methods.get(`contract/${id}`);
}

export async function getContracts() {
  return await methods.get(`contract`);
}

export async function createContract(body) {
  console.log(body);
  return await methods.post(`contract`, body);
}

export async function getStatus(id, party) {
  return await methods.get(`status/${id}/${party}`);
}

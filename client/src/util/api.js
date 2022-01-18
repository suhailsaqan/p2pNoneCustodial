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

export async function login(username, password) {
  const json = await methods.post("login", { username, password });
  return json.token;
}

export async function signup(username, password, email) {
  const json = await methods.post("register", { username, password, email });
  return json.token;
}

export async function changePassword(oldPwd, newPwd, token) {
  const json = await methods.post(
    "changepassword",
    {
      oldpassword: oldPwd,
      newpassword: newPwd,
    },
    token
  );

  return json;
}

export async function getContract(id, token) {
  return await methods.get(`contract/${id}`, token);
}

export async function getContracts(token) {
  return await methods.get(`contract`, token);
}

export async function createContract(body, token) {
  return await methods.post(`contract`, body, token);
}

export async function getStatus(id, party, token) {
  return await methods.get(`status/${id}/${party}`, token);
}

export async function settleContract(id, party, token) {
  return await methods.post(`settle`, { id, party }, token);
}

export async function cancelContract(id, party, token) {
  return await methods.post(`cancel`, { id, party }, token);
}

export async function addInvoice(id, party, invoice, token) {
  return await methods.post(`invoice`, { id, party, invoice }, token);
}

export async function getSettleStatus(id, party, token) {
  return await methods.get(`settle/status/${id}/${party}`, token);
}

export async function getCancelStatus(id, party, token) {
  return await methods.get(`cancel/status/${id}/${party}`, token);
}

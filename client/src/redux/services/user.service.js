import axios from "axios";

export const userServices = {
  loadUser,
  getUsers,
  getById,
  createUser,
  updateUser,
  deleteUser,
};

// loadUser
async function loadUser() {
  return axios.get(`/api/users`).then(handleResponse).catch(handleError);
}

// getUsers
function getUsers() {
  return axios.get(`/api/users/getAll`).then(handleResponse).catch(handleError);
}

function getById(id) {
  return axios.get(`/api/users/${id}`).then(handleResponse).catch(handleError);
}

// update
function updateUser(id, user) {
  return axios
    .post(`/api/users/${id}`, JSON.stringify(user))
    .then(handleResponse)
    .catch(handleError);
}

// createUser
function createUser(user) {
  return axios
    .post("/api/users", JSON.stringify(user))
    .then(handleResponse)
    .catch(handleError);
}

// deleteUSer
function deleteUser(id) {
  return axios.delete(`/api/users/${id}`).then(handleResponse).catch(handleError);
}

// handleResponse
function handleResponse(response) {
  return response.data;
}

//handleError
function handleError(error) {
  throw (
    (error.response.data && error.response.data.message) || error.response.status
  );
}

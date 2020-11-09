import axios from "axios";

export const teamServices = {
  addTeam,
  updateTeam,
  registerTeam,
  getTeams,
  getTeamById,
  deleteTeam,
  addScore,
  updateScore,
  deleteScore,
};

async function addTeam(team) {
  return axios
    .post("/api/teams", JSON.stringify(team))
    .then(handleResponse)
    .catch(handleError);
}

async function updateTeam(id, team) {
  return axios
    .post(`/api/teams/${id}`, JSON.stringify(team))
    .then(handleResponse)
    .catch(handleError);
}

async function registerTeam(id) {
  return axios
    .put(`/api/teams/register/${id}`)
    .then(handleResponse)
    .catch(handleError);
}

async function getTeams(query) {
  return axios
    .get(`/api/teams`, { params: query })
    .then(handleResponse)
    .catch(handleError);
}

async function getTeamById(id) {
  return axios.get(`/api/teams/${id}`).then(handleResponse).catch(handleError);
}

async function deleteTeam(id) {
  return axios.delete(`/api/teams/${id}`).then(handleResponse).catch(handleError);
}

async function addScore(id, params) {
  return axios
    .post(`/api/teams/addscore/${id}`, JSON.stringify(params))
    .then(handleResponse)
    .catch(handleError);
}
async function updateScore(scoreId, params) {
  return axios
    .post(`/api/teams/updatescore/${scoreId}`, JSON.stringify(params))
    .then(handleResponse)
    .catch(handleError);
}

async function deleteScore(scoreId) {
  return axios
    .delete(`/api/teams/deletescore/${scoreId}`)
    .then(handleResponse)
    .catch(handleError);
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

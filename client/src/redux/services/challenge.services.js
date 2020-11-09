import axios from "axios";

export const challengeServices = {
  addChallenge,
  updateChallenge,
  getChallenges,
  getChallengeById,
  getChallengeBySlug,
  deleteChallenge,
};

function addChallenge(challenge) {
  return axios
    .post("/api/challenges", JSON.stringify(challenge))
    .then(handleResponse)
    .catch(handleError);
}

function updateChallenge(id, challenge) {
  return axios
    .post(`/api/challenges/${id}`, JSON.stringify(challenge))
    .then(handleResponse)
    .catch(handleError);
}

function getChallenges(query) {
  return axios
    .get("/api/challenges", { params: query })
    .then(handleResponse)
    .catch(handleError);
}

function getChallengeById(id) {
  return axios.get(`/api/challenges/${id}`).then(handleResponse).catch(handleError);
}

function getChallengeBySlug(slug) {
  return axios
    .get(`/api/challenges/?slug=${slug}`)
    .then(handleResponse)
    .catch(handleError);
}

function deleteChallenge(id) {
  return axios
    .delete(`/api/challenges/${id}`)
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

import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { challengeActions, alertActions } from "../../../redux/actions";
import { CategoriesType } from "../../../helpers";
import { Spinner } from "react-bootstrap";
import ButtonBack from "../../layout/ButtonBack";
import Select from "react-select";
import ChallengeTaskItem from "./ChallengeTaskItem";
import ChallengeTaskForm from "./ChallengeTaskForm";

const initialState = {
  name: "",
  slug: "",
  imageURL: "",
  description: "",
  maxTeams: 0,
  maxTurns: 0,
  topMaxTurns: 0,
  playoffs: false,
  finalTeams: 0,
  categories: [],
  available: "",
  maxTime: 0,
  tasks: [],
  taskSecuence: true,
  stopTime: true,
  bonusType: "",
};

const ChallengeForm = ({
  challenge: { challenge, loading },
  getChallengeById,
  addChallenge,
  updateChallenge,
  setAlert,
  match,
}) => {
  useEffect(() => {
    if (match.params.id) {
      getChallengeById(match.params.id);
    }
  }, [getChallengeById, match.params.id]);

  useEffect(() => {
    if (!loading && match.params.id) {
      const challengeData = { ...initialState };
      for (const key in challenge) {
        if (key in challengeData) {
          challengeData[key] = challenge[key];
        }
      }
      // load to form
      setFormData(challengeData);

      // load selected Categories to Select Component options
      const categories = challengeData.categories;
      setSelectedCategory(
        categoryOptions
          .filter((option) => categories.includes(option.label))
          .map((elm) => elm.value)
      );
    }
    // eslint-disable-next-line
  }, [loading, challenge, match.params.id]);

  //form data use State
  const [formData, setFormData] = useState(initialState);
  const {
    name,
    slug,
    imageURL,
    description,
    maxTeams,
    maxTurns,
    topMaxTurns,
    tasks,
    taskSecuence,
    stopTime,
    bonusType,
    maxTime,
    playoffs,
    finalTeams,
    available,
  } = formData;

  // selecet Categories use State
  const categoryOptions = CategoriesType.map((elm, index) => ({
    value: index,
    label: elm,
  }));
  const [selectedCategory, setSelectedCategory] = useState([]);

  // load to update
  const challengeUpdate = Object.keys(challenge).length !== 0;

  // handle input chages
  const handleChange = (e) => {
    if (e.target.name === "slug") {
      setFormData({ ...formData, slug: e.target.value.trim() });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.isArray(e) ? e.map((option) => option.value) : [];
    setSelectedCategory(selectedOptions);

    setFormData({
      ...formData,
      categories: categoryOptions
        .filter((option) => selectedOptions.includes(option.value))
        .map((elm) => elm.label),
    });
  };

  // add tasks
  const addTask = (task) => {
    setFormData({ ...formData, tasks: [...tasks, task] });
  };

  const updateTask = (index, task) => {
    console.log(index, task);
    let newTasks = tasks;
    newTasks[index] = task;
    console.log(newTasks);
    setFormData({ ...formData, tasks: newTasks });
  };

  const deleteTask = (e, index) => {
    e.preventDefault();
    let newTasks = tasks;
    newTasks.splice(index, 1);
    setFormData({ ...formData, tasks: newTasks });
  };

  // handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (challengeUpdate) {
      updateChallenge(challenge._id, formData);
    } else {
      addChallenge(formData);
      setFormData(initialState);
      setSelectedCategory([]);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Fragment>
          <ButtonBack className="btn btn-primary mr-1 my-2">Atrás</ButtonBack>
          <div className="card  my-2">
            <div className="card-header">
              <h2 className="text-primary">
                {!challengeUpdate ? "Agregar Reto" : "Editar Reto"}
              </h2>
            </div>
            <div className="card-body">
              <h4>Information</h4>
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label" htmlFor="available">
                    Enable{" "}
                  </label>
                  <div className="col-sm">
                    <input
                      id="available"
                      name="available"
                      type="checkbox"
                      checked={available}
                      className="form-control-custom"
                      onChange={() =>
                        setFormData({
                          ...formData,
                          available: !formData.available,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label" htmlFor="name">
                   Challenge name: (*):
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label" htmlFor="slug">
                    Challenge Slug  (*):
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="slug"
                      name="slug"
                      value={slug}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label" htmlFor="imageURL">
                    URL Image:
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="imageURL"
                      name="imageURL"
                      value={imageURL}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label" htmlFor="description">
                    Description:
                  </label>
                  <div className="col-sm-9">
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={description}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label" htmlFor="categories">
                    Categories:{" "}
                  </label>
                  <div className="col-sm">
                    <Select
                      isMulti
                      className="dropdown"
                      placeholder="Selecciona las categorías permitidas"
                      options={categoryOptions}
                      onChange={handleCategoryChange}
                      value={categoryOptions.filter((elm) =>
                        selectedCategory.includes(elm.value)
                      )}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label" htmlFor="maxTeams">
                  Maximum number of teams allowed(*)
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="Number"
                      className="form-control"
                      id="maxTeams"
                      name="maxTeams"
                      value={maxTeams}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <hr />
                <h4>Turns</h4>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label" htmlFor="maxTeams">
                  Number of turns per team (*)
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="Number"
                      className="form-control"
                      id="maxTurns"
                      name="maxTurns"
                      value={maxTurns}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label" htmlFor="maxTeams">
                  Number of turns add top to classify (*)
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="Number"
                      className="form-control"
                      id="topMaxTurns"
                      name="topMaxTurns"
                      value={topMaxTurns}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <hr />
                <h4>Finals </h4>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label" htmlFor="playoffs">
                    PlayOffs
                  </label>
                  <div className="col-sm">
                    <input
                      type="checkBox"
                      name="playoffs"
                      checked={playoffs}
                      onChange={(e) =>
                        setFormData({ ...formData, playoffs: e.target.checked })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label" htmlFor="maxTeams">
                  Number of finalist teams
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="Number"
                      className="form-control"
                      id="finalTeams"
                      name="finalTeams"
                      value={finalTeams}
                      onChange={handleChange}
                      disabled={!playoffs}
                    />
                  </div>
                </div>

                <hr />
                <h4>Tasks</h4>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label" htmlFor="maxTime">
                    Max time (seconds)
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="Number"
                      className="form-control"
                      id="maxTime"
                      name="maxTime"
                      value={maxTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group table-responsive">
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>Task</th>
                        <th>Points</th>
                        <th>Penalty</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task, index) => (
                        <ChallengeTaskItem
                          key={index}
                          task={task}
                          order={index}
                          deleteTask={deleteTask}
                          updateTask={updateTask}
                        />
                      ))}
                      <ChallengeTaskForm addTask={addTask} textButton="Añadir" />
                    </tbody>
                  </table>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label" htmlFor="taskSecuence">
                  Tasks in sequence
                  </label>
                  <div className="col-sm">
                    <input
                      type="checkBox"
                      name="taskSecuence"
                      checked={taskSecuence}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          taskSecuence: e.target.checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label" htmlFor="stopTime">
                  Stop time on last task
                  </label>
                  <div className="col-sm">
                    <input
                      type="checkBox"
                      name="stopTime"
                      checked={stopTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stopTime: e.target.checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label" htmlFor="bonusType">
                  Bonus score
                  </label>
                  <div className="col-sm-6">
                    <select
                      className="form-control"
                      name="bonusType"
                      id="bonustype"
                      value={bonusType}
                      onChange={handleChange}
                    >
                      <option value="">None</option>
                      <option value="timer">Add remaining time</option>
                      <option value="manual">Enter manually</option>
                    </select>
                  </div>
                </div>

                <hr />

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary mr-2 mb-2"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Save
                  </button>
                  <ButtonBack className="btn btn-outline-primary mr-2 mb-2">
                    Cancel
                  </ButtonBack>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  challenge: state.challenge,
});

const actionCreators = {
  getChallengeById: challengeActions.getChallengeById,
  addChallenge: challengeActions.addChallenge,
  updateChallenge: challengeActions.updateChallenge,
  setAlert: alertActions.setAlert,
};

export default connect(mapStateToProps, actionCreators)(ChallengeForm);

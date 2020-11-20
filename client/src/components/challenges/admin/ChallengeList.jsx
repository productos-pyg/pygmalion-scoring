import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { challengeActions } from "../../../redux/actions";
import { Spinner } from "react-bootstrap";
import ChallengeListItem from "./ChallengeListItem";

const ChallengesList = ({
  challenge: { challenges, loading },
  getChallenges,
  deleteChallenge,
  match,
}) => {
  const { path } = match;

  useEffect(() => {
    getChallenges();
  }, [getChallenges]);

  return (
    <Fragment>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Fragment>
          <div className="card  mb-4">
            <div className="card-header">
              <h2 className="text-primary">Manage challenges</h2>
            </div>

            <div className="card-body ">
              <Link className="btn btn-sm btn-primary mb-2" to={`${path}/add`}>
                Add Challenge
              </Link>
              <div className="table-responsive">
                <table className="table table-striped ">
                  <thead className="thead-dark">
                    <tr>
                      <th>Challenge name</th>
                      <th>Slug</th>
                      <th>Enabled</th>
                      <th>Categories enabled</th>
                      <th>Edit/Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {challenges &&
                      challenges.map((challenge) => (
                        <ChallengeListItem
                          key={challenge._id}
                          challenge={challenge}
                          actionConfirm={deleteChallenge}
                          path={path}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
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
  getChallenges: challengeActions.getChallenges,
  deleteChallenge: challengeActions.deleteChallenge,
};

export default connect(mapStateToProps, actionCreators)(ChallengesList);

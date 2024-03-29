import React, {useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({getCurrentProfile, deleteAccount, auth: { user }, profile: { profile }}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile])

  return (
    <section className="container">
      <h1 className='large text-primary'>Dashboard</h1>
      <p className="lead">
      <i className='fas fa-user'></i> Welcome { user && user.name}
      </p>
      {profile !== null ? (
      <section>
        <DashboardActions />
        <Experience experience={profile.experience}/>
        <Education education={profile.education}/>
        <div className='my-2'>
          <button className='btn btn-danger' onClick={() => deleteAccount()}>
          <i className='fas fa-user'></i> Delete My Account
          </button>
        </div>
      </section>
      ) : (
      <section>
        <p>You have not yet setup a profile, please add some info</p>
        <Link to="/create-profile" className="btn btn-primary my-1">
          Create Profile
        </Link>
      </section>
      )}
    </section>
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state =>({
  auth: state.authReducer,
  profile: state.profileReducer
}); 
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);

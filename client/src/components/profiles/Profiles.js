import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
  <section>
    { loading ? <Spinner /> : 
    <section>
      <h1 className='large text-primary'>Developers</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop'></i>
        Browse and Connect with Developers
      </p>
      <div className='profiles'>
        {profiles.length > 0 ? (
          profiles.map(profile =>(
            <ProfileItem key={profile._id} profile={profile} />
          ))
        ) : <h4>No profiles found....</h4>}
      </div>
    </section>}
  </section>
  );
}

Profiles.propTypes = {
getProfiles: PropTypes.func.isRequired,
profile: PropTypes.object.isRequired, 
}

const mapStateToProps = state => ({
  profile: state.profileReducer
})

export default connect(mapStateToProps, { getProfiles })(Profiles);

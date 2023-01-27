import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';

const Profile = ({ getProfileById, profile: {profile, loading}, auth}) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);
  return (
    <section>
      {profile === null || loading ? <Spinner /> : <section>
        <Link to='/profiles' className='btn btn-light'>
          Back To Profiles
        </Link>
        {auth.isAuthenticated 
        && auth.loading === false 
        && auth.user._id === profile.user._id
        && (<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)}
        </section>
        }
    </section>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profileReducer,
  auth: state.authReducer
});

export default connect(mapStateToProps, { getProfileById })(Profile);

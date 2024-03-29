import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Alert = ({ alerts }) => (
  <div className="alert-wrapper">
    { alerts.map((alert) => {
      return <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    })}
  </div>
)

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  alerts: state.alertReducer
});

export default connect(mapStateToProps)(Alert);

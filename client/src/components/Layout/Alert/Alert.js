import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AlertStyle from './Alert.style';

const Alert = ({ alert }) => {
  return (
    Object.keys(alert).length !== 0 && (
      <AlertStyle alertType={alert.alertType}>{alert.msg}</AlertStyle>
    )
  );
};

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  alert: state.alert,
});
export default connect(mapStateToProps)(Alert);

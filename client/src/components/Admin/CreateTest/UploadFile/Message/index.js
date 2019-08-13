import React from 'react';
import PropTypes from 'prop-types';
import MessageStyle from './index.style';

const Message = ({ msg }) => {
  return (
    <MessageStyle>
      <div
        className="alert alert-warning alert-dismissible fade show width"
        role="alert"
      >
        {msg}
      </div>
    </MessageStyle>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Message;

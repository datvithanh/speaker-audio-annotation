import styled from 'styled-components';

const AlertStyle = styled.div`
  padding: 0.8rem;
  opacity: 0.9;
  max-width: 730px;
  margin: 1rem auto;
  font-style: italic;
  border-radius: 7px;
  background: ${props => {
    switch (props.alertType) {
      case 'primary':
        return '#17a28';
      case 'ligt':
        return '#f4f4f4';
      case 'dark':
        return '#343a40';
      case 'danger':
        return '#f8d7da';
      case 'warning':
        return '#fff3cd';
      case 'success':
        return '#d4edda';
      default:
        return '#f4f4f4';
    }
  }};
  color: ${props => {
    switch (props.alertType) {
      case 'primary':
        return '#fff';
      case 'ligt':
        return '#333';
      case 'dark':
        return '#fff';
      case 'danger':
        return '#721c24';
      case 'warning':
        return '#856404';
      case 'success':
        return '#155724';
      default:
        return '#333';
    }
  }};
  border-color: ${props => {
    switch (props.alertType) {
      case 'primary':
        return '#17a28';
      case 'ligt':
        return '#f4f4f4';
      case 'dark':
        return '#343a40';
      case 'danger':
        return '#f5c6cb';
      case 'warning':
        return '#ffeeba';
      case 'success':
        return '#c3e6cb';
      default:
        return '#f4f4f4';
    }
  }};
`;

export default AlertStyle;

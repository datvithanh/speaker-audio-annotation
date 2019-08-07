import styled from 'styled-components';

const AlertStyle = styled.div`
  padding: 0.8rem;
  opacity: 0.9;
  max-width: 730px;
  margin: 1rem auto;
  font-style: italic;
  background: ${props => {
    switch (props.alertType) {
      case 'primary':
        return '#17a28';
      case 'ligt':
        return '#f4f4f4';
      case 'dark':
        return '#343a40';
      case 'danger':
        return '#dc3545';
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
        return '#fff';
      default:
        return '#333';
    }
  }};
`;

export default AlertStyle;

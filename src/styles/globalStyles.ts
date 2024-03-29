import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  /* * { margin: 0; padding: 0; box-sizing: border-box; outline: none; }
  body {
    background: #FFFFFF;
  }
  body, input, button, select, option {
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
  } */

  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);

    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .react-modal-content {
    width: 100%;
    height: 560px;
    max-width: 980px;
    padding: 0;
    position: relative;
    border-radius: 0.25rem;

    outline: none;
    overflow-y:scroll ;

  }

  .boLHFp table td {
    border: 0;
    background: transparent !important;
    color: #FFF;
  }
`;

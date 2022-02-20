import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
`;

export const Form = styled.form`
  max-width: 570px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  input {
    max-width: 350px;
    width: 50%;
    border: 1px solid #9aa3b8;
    padding: 17px;
    font-size: .9em;
    color: #0e3355;
    outline: none;
    margin-top: 7px;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;

    :hover{ border: 1px solid #0087eb; }
  }

  button {
    max-width: 350px;
    width: 50%;
    height: 50px;
    color: #FFFFFF;
    margin-top: 7px;
    font-size: .9em;
    font-weight: 600;
    border: 0;
    cursor: pointer;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    background: #0087eb;
  }
`;

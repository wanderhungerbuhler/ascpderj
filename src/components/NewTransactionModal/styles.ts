import styled from 'styled-components';

export const Container = styled.form`
  h2 {
    color: #0e3355;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  input {
    width: auto;
    padding: 0 1rem;
    margin: 0 5px;
    height: 3rem;
    border-radius: 0.25rem;

    border: 1px solid #e0e0e0;
    background: #e7e9ee;

    color: #0e3355;
    font-weight: 400;
    font-size: 1rem;

    & + input {
      margin-top: 1rem;
    }
  }

  button[type="submit"] {
    width: 50%;
    padding: 0 1.5rem;
    height: 3rem;
    background: #0087eb;
    color: #FFFFFF;
    border: 0;
    border-radius: 0.25rem;
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1.5rem;

    transition: 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

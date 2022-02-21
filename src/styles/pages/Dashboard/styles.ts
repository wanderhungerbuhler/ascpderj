import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: #9aa3b8;
      font-weight: 500;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: #e0e0e0;
      color: #0e3355;
      border-radius: 0.25rem;
    }
  }
`;

export const Content = styled.div`
  max-width: 980px;
  width: 100%;
  height: 700px;
  margin: 70px auto;
`;

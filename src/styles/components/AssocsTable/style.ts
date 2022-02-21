import styled from 'styled-components';

export const Container = styled.div`

  table {
    width: 100%;
    border-spacing: 0 0.5rem;
    border: 0;

    th {
      color: #9aa3b8;
      font-weight: 500;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
      border: 0;
    }

    td {
      padding: 1rem 2rem;
      color: #0e3355;
      font-size: .8em;
      border-radius: 0;
      background: #f0f0f5;

      :nth-child(5) { display: flex; justify-content: space-between; align-items: center; align-content: center; margin-left: -1px; margin-top: -1px;}
    }
  }
`;

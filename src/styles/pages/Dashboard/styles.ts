import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  table {
    width: 100%;
    /* border-spacing: 0 0.5rem; */

    th {
      color: #9aa3b8;
      font-weight: 500;
      /* padding: 1rem 2rem; */
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      /* padding: 1rem 2rem; */
      border: 0;
      background: transparent !important;
      color: #0e3355;
      /* border-radius: 0.25rem; */
    }
  }
`;

export const Content = styled.div`
  max-width: 980px;
  width: 100%;
  height: 700px;
  margin: 70px auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const Search = styled.input`
  width: 50%;
  height: 50px;
  padding: 1rem 2rem;
  border-spacing: 0 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #e0e0e0;
  color: #0e3355;
  font-weight: 600;
`;

export const ListPageSearch = styled.select`
  width: auto;
  height: 50px;
  padding: 1rem .75rem;
  border-spacing: 0 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #e0e0e0;
  color: #0e3355;
  font-weight: 600;
`;

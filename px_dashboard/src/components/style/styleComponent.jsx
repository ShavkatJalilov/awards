import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  // max-width: 100%;
  padding-right: 15px;
  padding-left: 1px;
  margin-right: auto;
  margin-left: auto;
`;
// export cont
export const Title = styled.span`
  font-family: "Roboto", "Arial", sans-serif;
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  text-align: center;
`;

export const Inputs = styled.input`
  display: block;
  width: 100%;
  background-color: #f2f2f2;
  border: 1px solid green;
  border-radius: 6px;
  outline: none;
  fontsize: 14px;
  padding: 8px 2px;
  font-size: 14px;
  font-weight: 400;
`;
export const Selects = styled.select`
  display: block;
  width: 100%;
  minheigth: 100px;
  text-align: center;
  background-color: #f2f2f2;
  border: 1px solid green;
  border-radius: 6px;
  outline: none;
  padding: 8px 1px;
  fontsize: 14px;
`;
export const Textareas = styled.textarea`
  display: block;
  width: 100%;

  height: 90px;
  background-color: #f2f2f2;
  border: 1px solid green;
  border-radius: 6px;
  outline: none;
  font-size: 14px;
  padding: 8px 2px;
`;

export const Buttons = styled.button`
  width: 120px;
  height: 40px;
  background-color: #f2f2f2;
  border: 1px solid green;
  border-radius: 6px;
  outline: none;
  font-size: 14px;
  padding: 8px 2px;
`;

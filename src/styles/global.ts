import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
:root{
  --background: #f0f2f5;
  --shape:#fff;

  --red: #e52e4d;
  --blue: #5429cc;
  --green: #33cc95;

  --blue-light: #6933ff;

  --text-title: #363f5f;
  --text-body: #969cb3;
}

*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  outline:none;
}

html{
  @media (max-width: 1000px){
  font-size: 93.75%;
  }

  @media (max-width: 720px){
  font-size: 87.5%;
  }
}

body{
  background: var(---background);
  -webkit-font-smoothing: antialiased;
}

body, input, button, textarea{
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  color: var(--text-body);
  background: var(--background);
}

h1, h2, h2, h3, h4, h5, h6, strong{
  font-weight: 600;
  color: var(--text-title);
}

button{
  cursor: pointer;
  border: 0;
}

[disabled]{
  opacity: 0.6;
  cursor: not-allowed;
}
`;

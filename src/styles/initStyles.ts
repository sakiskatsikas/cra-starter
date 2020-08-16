import theme from './theme';

const { font, fontSize, color, spacing, dimension, globals, recipe } = theme;

export default `
  *,
  :after,
  :before {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    scroll-behavior: smooth;
    position: relative;
    overflow-x: hidden;
    font-family: sans-serif;
  }

  body {
    font-size: 16px;
    line-height: 1.3;
    font-family: ${font.body};
    color: ${color.body};
  }

  p {
    margin: ${spacing.body} 0;
  }
  p:first-of-type {
    margin-top: 0;
  }
  p:last-child {
    margin-bottom: 0;
  }

  a {
    color: ${color.primary};
    transition: ${recipe.transition};
  }
  a:hover,
  a:focus {
    color: ${color.primaryActive};
  }
  a:active,
  a:hover {
    outline-width: 0;
  }

  img {
    max-width: 100%;
    margin: 0;
    padding: 0;
    margin-bottom: ${spacing.medium};
  }

  h1,
  h2,
  h3 {
    font-family: ${font.headings};
  }

  h4,
  h5,
  h6 {
    font-family: ${font.body};
  }


  h1 {
    font-size: ${fontSize.xlarge};
    line-height: 1.3;
    margin-bottom: ${spacing.large};
  }

  h2 {
    font-size: ${fontSize.large};
    line-height: 1.2;
    margin-bottom: ${spacing.medium};
    font-weight: 400;
  }

  h3 {
    font-size: ${fontSize.medium};
    line-height: 1.3;
    margin-bottom: ${spacing.body};
    font-weight: 400;
  }

  label {
    display: block;
  }

  input[type="text"],
  input[type="email"],
  input[type="number"],
  input[type="search"],
  input[type="tel"],
  input[type="url"],
  input[type="date"],
  input[type="datetime"],
  input[type="datetime-local"],
  input[type="month"],
  input[type="week"],
  input[type="time"],
  input[type="file"],
  input[type="password"] {
    width: 100%;
    margin-bottom: ${spacing.body};
    height: ${dimension.inputHeight};
    border: ${recipe.border};
    border-radius: ${globals.borderRadius};
    padding: ${spacing.body};
    background-color: white;
    max-width: ${dimension.inputMaxWidth};
  }

  textarea {
    width: 100%;
    padding: ${spacing.body};
    margin-bottom: ${spacing.body};
    height: ${dimension.textareaHeight};
    border-radius: ${globals.borderRadius};
    border: ${recipe.border};
    min-width: ${dimension.textareaMinWidth};
    background-color: white;
    max-width: 30rem;
  }

  pre {
    padding: 1rem;
    background-color: cornsilk;
    font-weight: bold;
    border: 1px solid burlywood;
  }

  dt {
    font-weight: bold;
  }
`;

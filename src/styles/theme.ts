const color = {
  body: '#222222',
  primary: '#663399',
  secondary: '#b4e5db'
}

const colorActive = {
  bodyActive: `${color.body}AA`,
  primaryActive: `${color.primary}AA`,
  secondaryActive: `${color.secondary}AA`
}

export default {
  font: {
    headings: "'Playfair Display', sans-serif;",
    body: "'Montserrat', sans-serif;"
  },
  fontSize: {
    xsmall: '.25rem',
    small: '.5rem',
    body: '1rem',
    medium: '1.5rem',
    large: '2rem',
    xlarge: '3rem',
    xxlarge: '6rem'
  },
  color: {
    ...color,
    ...colorActive
  },
  spacing: {
    xxsmall: '.125rem',
    xsmall: '.25rem',
    small: '.5rem',
    body: '1rem',
    medium: '1.5rem',
    large: '2rem',
    xlarge: '3rem',
    xxlarge: '6rem'
  },
  dimension: {
    inputHeight: '3rem',
    textareaHeight: '9rem',
    textareaMinWidth: '10rem'
  },
  global: {
    borderRadius: '.25rem'
  },
  recipe: {
    border: `1px solid ${color.primary}`,
    transition: 'all 0.3s ease-in-out',
    linkStyle: `
      color: #ffffff99;
      text-decoration: none;
      &:hover,
      &:focus,
      &:active {
        color: #ffffff;
      }
    `
  }
}

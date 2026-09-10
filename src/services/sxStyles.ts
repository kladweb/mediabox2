import { appColors } from "./appColors";

export const sxCardMain = {
  width: '100%',
  m: "1.5em auto",
  display: 'block',
  backgroundColor: appColors.light11,
  transition: '1s',
  border: `solid 3px ${appColors.dark2}`,
  borderRadius: '1em'
}

export const sxHeadMain = {
  width: "fit-content",
  m: '0 auto',
  p: '0.25em',
  display: 'block',
  // textDecoration: 'underline',
  textAlign: 'center',
  fontSize: {xs: '1rem', md: '1.25rem'},
  fontWeight: '600',
  color: appColors.dark2,
  backgroundColor: appColors.mid2,
  borderRadius: '0.25em',
}

export const sxManualText1 = {
  py: '0.5em',
  fontSize: {xs: '1rem', md: '1.25rem'},
  textAlign: 'left',
  color: appColors.light1,
  whiteSpace: 'pre-line',
}

export const sxButtonLinkOperator = {
  display: 'inline-block',
  p: '0.4em 0.5em',
  m: '0.25em 0.5em',
  color: `${appColors.mid2}`,
  fontSize: {xs: '0.8rem', md: '1.1rem'},
  fontWeight: '300',
  backgroundColor: `${appColors.mid1}`,
  borderRadius: '0.5em',
  border: 'none',
  cursor: 'pointer',
  transition: '0.2s',
  ':hover': {
    opacity: '0.8',
    transition: '0.2s'
  }
}

export const sxLink1 = {
  display: 'inline-block',
  p: '0.2em 0.5em 0.4em',
  m: '0.25em 0.5em',
  textDecoration: 'none',
  color: `${appColors.mid2}`,
  fontSize: {xs: '0.8rem', md: '1.1rem'},
  fontWeight: '400',
  backgroundColor: `${appColors.mid1}`,
  borderRadius: '0.5em',
  transition: '0.2s',
  ':hover': {
    opacity: '0.8',
    transition: '0.2s'
  }
}

export const sxToggle1 = {
  px: '1em',
  fontSize: '1em',
  color: '#efedf5',
}

export const sxMainCards = {
  m: '1em auto',
  p: '1em',
  width: 'fit-content',
  textAlign: 'center',
  backgroundColor: appColors.mid2,
  borderRadius: '1em',
  boxShadow: `2px 2px 2px ${appColors.dark2}`,
  transition: '0.3s',
  zIndex: '10',
  ':hover': {
    transform: 'translate(-0.05em, -0.05em)',
    boxShadow: `4px 4px 10px ${appColors.dark2}`,
    transition: '0.3s'
  },
  ':active': {
    transform: 'translate(0, 0)',
    boxShadow: `2px 2px 2px ${appColors.dark2}`
  },
}

export const sxMainDescription = {
  mt: 5,
  mx: 'auto',
  width: '100%',
  fontSize: {xs: '1em', md: '1.25em'},
  fontWeight: '400',
  color: appColors.light1,
  textAlign: 'left',
  textIndent: '2em',
  zIndex: '30'
  // whiteSpace: 'pre-line',
}

export const sxLinksPlugins = {
  my: '0.5rem',
  py: 0,
  fontSize: {
    xs: '0.9rem',
    md: '1.25rem'
  },
  fontWeight: '500',
  color: appColors.mid2
}

export const sxParagraphAbout1 = {
  my: 0, textIndent: '2em'
}

export const sxButtonCoffee = {
  display: 'block',
  width: 'fit-content',
  p: '0.2em 1em 0.4em',
  m: '0.5em auto 1em',
  textDecoration: 'none',
  textIndent: '0',
  color: `${appColors.mid1}`,
  fontSize: {xs: '1rem', md: '1.1rem'},
  fontWeight: '400',
  textAlign: 'center',
  backgroundColor: `${appColors.mid2}`,
  borderRadius: '0.5em',
  transition: '0.2s',
  ':hover': {
    opacity: '0.8',
    transition: '0.2s'
  }
}

export const sxButtonCoffee2 = {
  p: '0 0 0.2em',
  m: '0',
  fontSize: {xs: '0.8rem', md: '0.9rem'},
}

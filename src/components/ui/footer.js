import React from 'react'
import { makeStyles } from '@material-ui/styles'
import footerAdornment from '../../assets/Footer Adornment.svg'
import { Grid, Hidden } from '@material-ui/core'
import { Link } from 'react-router-dom'
import facebook from '../../assets/facebook.svg'
import twitter from '../../assets/twitter.svg'
import instagram from '../../assets/instagram.svg'

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.common.blue,
    width: '100%',
    zIndex: 1302,
    position: 'relative',
  },
  adornment: {
    width: '23rem',
    verticalAlign: 'bottom',
    [theme.breakpoints.down('md')]: {
      width: '18rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '13rem',
    },
  },
  mainContainer: {
    position: 'absolute',
  },
  link: {
    color: 'white',
    fontFamily: 'Arial',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  gridItem: {
    margin: '3rem',
  },
  icon: {
    height: '3rem',
    width: '3rem',
    [theme.breakpoints.down('xs')]: {
      height: '2rem',
      width: '2rem',
    },
  },
  socialContainer: {
    position: 'absolute',
    marginTop: '-5rem',
    right: '1.5rem',
    [theme.breakpoints.down('xs')]: {
      right: '0.5rem',
    },
  },
}))

const LINKS = [
  [{ name: 'Home', path: '/', value: 0 }],
  [
    { name: 'Services', path: '/services', value: 1 },
    {
      name: 'Custom Software Development',
      path: '/customsoftware',
      value: 1,
      index: 0,
    },
    { name: 'Mobile Web Development', path: '/mobileapps', value: 1, index: 1 },
    { name: 'Website Development', path: '/websites', value: 1, index: 2 },
  ],
  [
    { name: 'The Revolution', path: '/revolution', value: 2 },
    { name: 'Vision', path: '/revolution', value: 2 },
    { name: 'Technology', path: '/revolution', value: 2 },
    { name: 'Process', path: '/revolution', value: 2 },
  ],
  [
    { name: 'About us', path: '/about', value: 3 },
    { name: 'History', path: '/about', value: 3 },
    { name: 'Team', path: '/about', value: 3 },
  ],
  [{ name: 'Contact us', path: '/contact', value: 4 }],
]

export const Footer = ({ setValue, setSelectedIndex }) => {
  const classes = useStyles()

  const handleLinkClick = (value, index) => {
    setValue(value)
    if (index) setSelectedIndex(index)
  }

  return (
    <footer className={classes.footer}>
      <Hidden mdDown>
        <Grid container className={classes.mainContainer} justify="center">
          {LINKS.map((rowLinks, idx) => (
            <Grid item key={idx} className={classes.gridItem}>
              {rowLinks.map((columnLink) => (
                <Grid
                  container
                  direction="column"
                  key={columnLink.name}
                  spacing={2}
                >
                  <Grid
                    item
                    className={classes.link}
                    component={Link}
                    to={columnLink.path}
                    onClick={() =>
                      handleLinkClick(columnLink.value, columnLink.index)
                    }
                  >
                    {columnLink.name}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </Hidden>
      <img
        alt="black decorative slash"
        src={footerAdornment}
        className={classes.adornment}
      ></img>

      <Grid
        container
        spacing={2}
        justify="flex-end"
        className={classes.socialContainer}
      >
        <Grid
          item
          component={'a'}
          href="http://www.facebook.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="facebook logo" src={facebook} className={classes.icon} />
        </Grid>
        <Grid
          item
          component={'a'}
          href="http://www.twitter.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="twitter logo" src={twitter} className={classes.icon} />
        </Grid>
        <Grid
          item
          component={'a'}
          href="http://www.instagram.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="instagram logo" src={instagram} className={classes.icon} />
        </Grid>
      </Grid>
    </footer>
  )
}

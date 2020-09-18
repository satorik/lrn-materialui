import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Tabs,
  Tab,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'

const LINKS = [
  { pathname: '/', name: 'Home' },
  {
    pathname: '/services',
    name: 'Services',
    sections: [
      { pathname: '/services', name: 'Services' },
      { pathname: '/customsoftware', name: 'Custom Software' },
      { pathname: '/mobileapps', name: 'Mobile Apps' },
      { pathname: '/websites', name: 'Websites Development' },
    ],
  },
  { pathname: '/revolution', name: 'The Revolution' },
  { pathname: '/about', name: 'About Us' },
  { pathname: '/contact', name: 'Contact Us' },
]

function ElevationScroll(props) {
  const { children } = props

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '5rem',
  },
  logo: {
    height: '9rem',
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px',
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: 0,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
}))

export const Header = () => {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const hadleChange = (e, value) => {
    setValue(value)
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
    setOpen(true)
  }

  const handleClose = (e) => {
    setAnchorEl(null)
    setOpen(false)
  }

  const handleMenuItemClick = (e, i, linkIdx) => {
    setAnchorEl(null)
    setOpen(false)
    setSelectedIndex(i)
    setValue(linkIdx)
  }

  useEffect(() => {
    let rightValue = LINKS.findIndex(
      (link) => link.pathname === window.location.pathname
    )
    let section = 0
    if (rightValue === -1) {
      for (let i = 0; i < LINKS.length; i++) {
        section = LINKS[i].sections?.findIndex(
          (section) => section.pathname === window.location.pathname
        )
        if (section && section !== -1) {
          rightValue = i
          console.log(section)
          break
        }
      }
    }
    if (rightValue !== value) setValue(rightValue)
    if (section !== selectedIndex) setSelectedIndex(section)
  }, [])

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar disableGutters>
            <Button
              className={classes.logoContainer}
              disableRipple
              component={Link}
              to={LINKS[0].pathname}
              onClick={() => setValue(0)}
            >
              <img src={logo} alt="company logo" className={classes.logo} />
            </Button>

            <Tabs
              className={classes.tabContainer}
              value={value}
              onChange={hadleChange}
              indicatorColor="primary"
            >
              {LINKS.map((link, idx) => (
                <Tab
                  key={idx}
                  label={link.name}
                  className={classes.tab}
                  component={Link}
                  to={link.pathname}
                  aria-owns={anchorEl ? 'simple-menu' : undefined}
                  aria-haspopup={anchorEl ? true : undefined}
                  onMouseOver={
                    link.sections?.length > 0 ? (e) => handleClick(e) : null
                  }
                />
              ))}
            </Tabs>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Free Estimate
            </Button>
            {LINKS.map((link, linkIdx) =>
              link.sections?.length > 0 ? (
                <Menu
                  key={linkIdx}
                  id="simple-menu"
                  classes={{ paper: classes.menu }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{ onMouseLeave: handleClose }}
                  elevation={0}
                >
                  {link.sections.map((section, idx) => (
                    <MenuItem
                      key={idx}
                      onClick={(event) =>
                        handleMenuItemClick(event, idx, linkIdx)
                      }
                      selected={idx === selectedIndex && value === linkIdx}
                      component={Link}
                      to={section.pathname}
                      classes={{ root: classes.menuItem }}
                    >
                      {section.name}
                    </MenuItem>
                  ))}
                </Menu>
              ) : null
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  )
}

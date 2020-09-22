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
  useMediaQuery,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/styles'
import MenuIcon from '@material-ui/icons/Menu'

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
    marginBottom: '4rem',
    [theme.breakpoints.down('md')]: {
      marginBottom: '3rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.75rem',
    },
  },
  logo: {
    height: '8rem',
    [theme.breakpoints.down('md')]: {
      height: '7rem',
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5rem',
    },
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
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawerIcon: {
    height: '50px',
    width: '50px',
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
    opacity: 0.7,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1,
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
}))

export const Header = ({
  value,
  setValue,
  selectedIndex,
  setSelectedIndex,
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

  const [anchorEl, setAnchorEl] = useState(null)
  const [openMenu, setOpenMenu] = useState(false)

  const [openDrawer, setOpenDrawer] = useState(false)

  const hadleChange = (e, value) => {
    setValue(value)
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
    setOpenMenu(true)
  }

  const handleClose = (e) => {
    setAnchorEl(null)
    setOpenMenu(false)
  }

  const handleMenuItemClick = (e, i, linkIdx) => {
    setAnchorEl(null)
    setOpenMenu(false)
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
          break
        }
      }
    }
    if (rightValue !== value) setValue(rightValue)
    if (section !== selectedIndex) setSelectedIndex(section)
  }, [])

  const tabs = (
    <>
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
      <Button variant="contained" color="secondary" className={classes.button}>
        Free Estimate
      </Button>
      {LINKS.map((link, linkIdx) =>
        link.sections?.length > 0 ? (
          <Menu
            key={linkIdx}
            id="simple-menu"
            classes={{ paper: classes.menu }}
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{ onMouseLeave: handleClose }}
            elevation={0}
            style={{ zIndex: 1302 }}
            keepMounted
          >
            {link.sections.map((section, idx) => (
              <MenuItem
                key={idx}
                onClick={(event) => handleMenuItemClick(event, idx, linkIdx)}
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
    </>
  )

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {LINKS.map((link, idx) => (
            <ListItem
              key={idx}
              component={Link}
              to={link.pathname}
              divider
              button
              onClick={() => {
                setOpenDrawer(false)
                setValue(idx)
              }}
              selected={value === idx}
              classes={{ selected: classes.drawerItemSelected }}
            >
              <ListItemText disableTypography className={classes.drawerItem}>
                {link.name}
              </ListItemText>
            </ListItem>
          ))}
          <ListItem
            key="free estimate"
            component={Link}
            to="/estimate"
            className={classes.drawerItemEstimate}
            divider
            button
            onClick={() => setOpenDrawer(false)}
          >
            <ListItemText disableTypography className={classes.drawerItem}>
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  )
  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" color="primary" className={classes.appbar}>
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
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  )
}

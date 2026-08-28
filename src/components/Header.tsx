import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { AppBar, Box, Menu, Container, Toolbar, Button, IconButton, MenuItem, Typography } from '@mui/material';
import { nameApp } from "../data/dataIPTV";
import type { ILocales, ITranslateI18n } from "../types/typesBox";
import { appColors } from "../styles/appColors.ts";
import './header.css';

function MenuIcon() {
  return null;
}

function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const {t, i18n}: ITranslateI18n = useTranslation();
  const pages: string[] = [
    `${t('header:menu1')}`,
    `${t('header:menu2')}`,
    `${t('header:menu3')}`,
    `${t('header:menu4')}`,
    `${t('header:menu5')}`,
    `${t('header:menu6')}`
  ];
  const navigation: string[] = ['choose', 'lists', 'iptv', 'media', 'faq', 'about'];
  const locales: ILocales = {
    en: {title: 'English'},
    ru: {title: "Русский"},
  }

  const lang = i18n.language;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };

  const changeLanguage = (locale: string): void => {
    setAnchorElUser(null);
    if (locale && locale !== i18n.language) {
      i18n.changeLanguage(locale);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: appColors.dark2,
        zIndex: '2000'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters variant="dense">
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: {xs: 'none', md: 'flex'},
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
              color: appColors.mid2,
              cursor: 'default',
            }}
          >
            <NavLink id="RouterNavLink" to={'/'} key={0} className='navPages-links navPages-links-first'>
              {nameApp}
            </NavLink>
          </Typography>
          <Box
            sx={{
              display: {xs: 'flex', md: 'none'},
              mr: '0.5rem',
              color: appColors.light1,
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color='inherit'
              onClick={handleOpenNavMenu}
            >
              <MenuIcon/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                mt: '0.5rem',
                display: {xs: 'block', md: 'none'},
              }}
            >
              {pages.map((page: string, index: number) => (
                <NavLink
                  to={`/ru/${navigation[index]}`}
                  key={index}
                  className={`navPages-links navPages-links-${navigation[index]}`}
                >
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography
                      align="center"
                      sx={{color: appColors.mid1}}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: {xs: 'flex', md: 'none'},
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: appColors.mid2,
              textDecoration: 'none',
            }}
          >
            <NavLink to={'/'} key={0} className='navPages-links navPages-links-first'>
              {nameApp}
            </NavLink>
          </Typography>
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {pages.map((page: string, index: number) => (
              <NavLink
                // to={`/ru/${navigation[index]}`}
                to={`/${lang}/${navigation[index]}`}
                key={index}
                className={`navPages-links navPages-links-${navigation[index]}`}
              >
                <Box
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    mx: 2,
                    color: appColors.light1,
                    display: 'block',
                    textTransform: 'uppercase',
                    ':hover': {
                      color: appColors.mid2,
                    },
                  }}
                >
                  {page}
                </Box>
              </NavLink>
            ))}
          </Box>
          <Box sx={{flexGrow: 0}}>
            <Button
              onClick={handleOpenUserMenu}
              sx={{
                my: {xs: 1, md: 1.5},
                color: appColors.light1,
                display: 'block',
                ':hover': {
                  color: appColors.mid2,
                },
              }}
            >
              {t('header:lang')}
            </Button>
            <Menu
              sx={{mt: '45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{vertical: 'top', horizontal: 'right',}}
              keepMounted
              transformOrigin={{vertical: 'top', horizontal: 'right',}}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {Object.keys(locales).map((locale: string) => (
                <MenuItem key={locale} onClick={() => {
                  changeLanguage(locale);
                }}>
                  <Typography align="center">{locales[locale as keyof (typeof locales)].title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

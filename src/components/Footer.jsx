import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Typography, Grid, Link, Divider } from '@mui/material';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#18191A',
    color: 'white',
    padding: theme.spacing(6, 0),
    borderTop: `1px solid ${theme.palette.primary.contrastText}`,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginBottom: theme.spacing(2),
  },
  
  link: {
    color: 'white',
    textDecoration: 'none !important', 
    '&:hover': {
      textDecoration: 'none ', 
      borderBottom: '1px solid white', // Adding bottom border on hover
    },
  },
  
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  icon: {
    fontSize: '1.5rem',
    margin: theme.spacing(0, 2),
    color: 'white',
  },
  resourcesList: {
    listStyle: 'none',
    paddingLeft: 0,
    marginTop: theme.spacing(2),
    color: 'white',
  },
  poweredBy: {
    marginTop: theme.spacing(3),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div className={classes.iconContainer}>
        <FaFacebook className={classes.icon} />
        <FaTwitter className={classes.icon} />
        <FaInstagram className={classes.icon} />
      </div>
      <br></br>
      <Container maxWidth="lg">
      
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className={classes.logo}>
              Game Store
            </Typography>
            <Typography variant="body2">
              Your one-stop shop for all your gaming needs.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Resources</Typography>
            <ul className={classes.resourcesList}>
              <li>
                <Link href="#" className={classes.link}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className={classes.link}>
                  Developers
                </Link>
              </li>
              <li>
                <Link href="#" className={classes.link}>
                  Community Standards
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Support</Typography>
            <ul className={classes.resourcesList}>
              <li>
                <Link href="#" className={classes.link}>
                  Support Hub
                </Link>
              </li>
              <li>
                <Link href="#" className={classes.link}>
                  Password Reset
                </Link>
              </li>
              <li>
                <Link href="#" className={classes.link}>
                  Orders Tracking
                </Link>
              </li>
              <li>
                <Link href="#" className={classes.link}>
                  Feedback
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Contact Us</Typography>
            <Typography variant="body2">
              Have questions? Feel free to contact us at{' '}
              <Link href="mailto:contact@example.com" className={classes.link}>
                contact@example.com
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" className={classes.poweredBy}>
          Powered by{' '}
          <Link href="https://rawg.io/" className={classes.link}>
            RAWG
          </Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
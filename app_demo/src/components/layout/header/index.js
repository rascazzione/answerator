import React, { useContext } from 'react'
import Link from 'next/link'
import cn from 'classnames'

import { AuthContext } from '../../../store/auth'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

import styles from './header.module.css'
import LoginForm from '../../Forms/LoginForm'
import SignupForm from '../../Forms/SignUp';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Header = ({ className, ...props }) => {
  const { isAuthenticated, authState, logout } = useContext(AuthContext)

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [upOpen, setUpOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const upHandleOpen = () => {
    setUpOpen(true);
  };

  const upHandleClose = () => {
    setUpOpen(false);
  };

  return (
    <header className={cn(styles.header, className)} {...props}>
      <div className={styles.container}>
        <p>
          Answerator
          </p>
        <div style={{ flex: 1 }}></div>

        {isAuthenticated() ? (
          <div className={styles.userInfo}>
            <p>
              Hi {' '}
                <a href="/home">{authState.userInfo.username}!</a>
            </p>
            <button style ={{width:'80px'}}onClick={() => logout()}>
              Log out
            </button>
          </div>
        ) : (
            <>
              <button
                className={styles.auth}
                secondary
                onClick={handleOpen}
              >
                Log in
            </button>
              <button
                className={styles.auth}
                primary
               onClick={upHandleOpen}
              >
                Sign up
            </button>
            </>
          )}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <LoginForm handleClose={handleClose}/>
        </div>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={upOpen}
        onClose={upHandleClose}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <SignupForm upHandleClose={upHandleClose}/>
        </div>
      </Modal>
    </header>
  )
}

export default Header

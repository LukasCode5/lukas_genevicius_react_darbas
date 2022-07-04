import { NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import Container from '../UI/Container/Container';
import css from './Header.module.css';

function Header() {
  const ctx = useAuthCtx();

  return (
    <Container>
      <header className={css.header}>
        <img src='' alt='logo' />
        <nav>
          {!ctx.isUserLoggedIn && (
            <>
              <NavLink className={css.navLink} to={'/login'}>
                Login
              </NavLink>
              <NavLink className={css.navLink} to={'/register'}>
                Register
              </NavLink>
            </>
          )}
          {ctx.isUserLoggedIn && (
            <>
              <NavLink className={css.navLink} exact to={'/'}>
                Home
              </NavLink>
              <NavLink className={css.navLink} to={'/add'}>
                Add
              </NavLink>
              <NavLink onClick={ctx.logout} className={css.navLink} to={'/login'}>
                Logout
              </NavLink>
            </>
          )}
        </nav>
      </header>
    </Container>
  );
}

export default Header;

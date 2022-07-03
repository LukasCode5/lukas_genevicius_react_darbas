import { NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import css from './Header.module.css';

function Header() {
  const ctx = useAuthCtx();

  return (
    <header className={css.header}>
      <nav>
        <img src='' alt='logo' />
        {!ctx.isUserLoggedIn && (
          <>
            <NavLink to={'/login'}>Login</NavLink>
            <NavLink to={'/register'}>Register</NavLink>
          </>
        )}
        {ctx.isUserLoggedIn && (
          <>
            <NavLink className={css.navLink} to={'/'}>
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
  );
}

export default Header;

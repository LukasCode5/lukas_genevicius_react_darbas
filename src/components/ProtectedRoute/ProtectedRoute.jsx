import { Route } from 'react-router';
import { useAuthCtx } from '../../store/authContext';

function ProtectedRoute(props) {
  const ctx = useAuthCtx();
  const { children, ...rest } = props;
  return (
    <Route {...rest}>
      {ctx.isUserLoggedIn ? props.children : <h1>Tik prisijungusiems vartotojams</h1>}
    </Route>
  );
}

export default ProtectedRoute;

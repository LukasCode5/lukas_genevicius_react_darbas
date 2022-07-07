import { useFormik } from 'formik';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, myFetch } from '../../utils';
import Notification from '../Notification/Notification';
import css from './LoginForm.module.css';
import officeHd1 from '../../assets/img/officeHd1.jpg';
import Container from '../UI/Container/Container';

const initValues = {
  email: '',
  password: '',
};

function LoginForm({ routeProtection }) {
  const history = useHistory();
  const ctx = useAuthCtx();

  const [backErrors, setBackErrors] = useState('');
  const [successLogin, setSuccessLogin] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      email: Yup.string().email('Patikrinkite savo email').required('Privalomas laukas'),
      password: Yup.string()
        .min(5, 'Mažiausiai 5 simboliai')
        .max(10, 'Ne daugiau kaip 10 simboliu')
        .required('Privalomas laukas'),
    }),
    onSubmit: async (values) => {
      const user = {
        email: values.email,
        password: values.password,
      };
      const loginResult = await myFetch(`${baseUrl}/v1/auth/login`, 'POST', user);
      console.log('registerResult ===', loginResult);
      if (loginResult.status === 400) {
        setSuccessLogin('');
        setBackErrors('Neteisingas Email arbas Slaptažodis');
        setShowNotification(true);
        return;
      }
      if (loginResult.status === 500) {
        setSuccessLogin('');
        setBackErrors('Oi, kažkas įvyko netaip');
        setShowNotification(true);
        return;
      }

      if (!loginResult.data.token) {
        setSuccessLogin('');
        setBackErrors('Oi, kažkas įvyko netaip');
        setShowNotification(true);
        return;
      }
      const userEmail = values.email;
      if (routeProtection) {
        setTimeout(() => ctx.login(loginResult.data.token, userEmail), 3000);
      } else {
        ctx.login(loginResult.data.token, userEmail);
      }
      values.email = '';
      values.password = '';
      setBackErrors('');
      setSuccessLogin('Prisijungimas sekmingas');
      setShowNotification(true);
      if (routeProtection) {
        return;
      }
      setTimeout(() => history.replace('/'), 3000);
    },
  });

  function rightClassesForInput(field) {
    let resultClasses = '';
    if (formik.touched[field]) {
      resultClasses += formik.errors[field] ? 'errorInput' : 'successInput';
    }
    return resultClasses;
  }
  function rightClassesForErrorMessage(field) {
    let resultClasses = '';
    if (formik.touched[field]) {
      resultClasses += formik.errors[field] ? 'errorMessage' : 'successMessage';
    }
    return resultClasses;
  }

  function handleHideNotification() {
    setShowNotification(false);
  }

  return (
    <div className={css.formWrapper}>
      <Container>
        <div className={css.formGroup}>
          <img src={officeHd1} alt='loginOffice' />
          <form onSubmit={formik.handleSubmit} className={css.form}>
            {showNotification && backErrors && (
              <Notification onClick={handleHideNotification} message={backErrors} error />
            )}
            {showNotification && successLogin && (
              <Notification onClick={handleHideNotification} message={successLogin} />
            )}
            {routeProtection && (
              <h2 className={css.usersOnly}>
                Šis puslapis prieinamas tik prisijungusiems vartotojams
              </h2>
            )}
            <h1>Prisijungimas</h1>
            <div className={css.inputGroup}>
              <label htmlFor='email'>Email</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                type='email'
                className={`${css.input} ${css[rightClassesForInput('email')]}`}
                name='email'
                placeholder='Įveskite email čia...'
              />

              {formik.touched.email && (
                <p className={`${css.message} ${css[rightClassesForErrorMessage('email')]}`}>
                  {formik.errors.email ? formik.errors.email : 'Viskas teisinga'}
                </p>
              )}
            </div>

            <div className={css.inputGroup}>
              <label htmlFor='password'>Slaptažodis</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                type='password'
                className={`${css.input} ${css[rightClassesForInput('password')]}`}
                name='password'
                placeholder='Įveskite savo slaptažodi čia...'
              />
              {formik.touched.password && (
                <p className={`${css.message} ${css[rightClassesForErrorMessage('password')]}`}>
                  {formik.errors.password ? formik.errors.password : 'Viskas teisinga'}
                </p>
              )}
            </div>
            <button type='submit' className={css.buttonSubmit}>
              Prisijungti
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default LoginForm;

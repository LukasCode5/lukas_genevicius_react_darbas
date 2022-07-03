import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { baseUrl, myFetch } from '../../utils';
import Notification from '../Notification/Notification';
import css from './RegisterForm.module.css';

const initValues = {
  email: '',
  password: '',
  repeat_password: '',
};

function RegisterForm() {
  const [backErrors, setBackErrors] = useState('');
  const [successRegister, setSuccessRegister] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      email: Yup.string().email('Patikrinkite savo email').required('Privalomas laukas'),
      password: Yup.string()
        .min(5, 'Mažiausiai 5 simboliai')
        .max(10, 'Ne daugiau kaip 10 simboliu')
        .required('Privalomas laukas'),
      repeat_password: Yup.string()
        .min(5, 'Mažiausiai 5 simboliai')
        .max(10, 'Ne daugiau kaip 10 simboliu')
        .required('Privalomas laukas')
        .oneOf([Yup.ref('password'), null], 'Slaptažodžiai turi sutapti'),
    }),
    onSubmit: async (values) => {
      const newUser = {
        email: values.email,
        password: values.password,
      };
      const registerResult = await myFetch(`${baseUrl}/v1/auth/register`, 'POST', newUser);
      console.log('registerResult ===', registerResult);
      if (registerResult.status === 400) {
        setSuccessRegister('');
        setBackErrors('Patikrinkite ivesties laukus');
        setShowNotification(true);
        return;
      }
      if (registerResult.status === 500) {
        setSuccessRegister('');
        setBackErrors('Oi, kažkas įvyko netaip');
        setShowNotification(true);
        return;
      }
      setBackErrors('');
      setSuccessRegister('Vartotojas sekmingai užregistruotas');
      setShowNotification(true);
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
      <form onSubmit={formik.handleSubmit} className={css.form}>
        {showNotification && backErrors && (
          <Notification onClick={handleHideNotification} message={backErrors} error />
        )}
        {showNotification && successRegister && (
          <Notification onClick={handleHideNotification} message={successRegister} />
        )}
        <h1>Register here</h1>
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
        <div className={css.inputGroup}>
          <label htmlFor='repeat_password'>Pakartoti slaptažodį</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeat_password}
            type='password'
            className={`${css.input} ${css[rightClassesForInput('repeat_password')]}`}
            name='repeat_password'
            placeholder='Repeat your password here...'
          />
          {formik.touched.repeat_password && (
            <p className={`${css.message} ${css[rightClassesForErrorMessage('repeat_password')]}`}>
              {formik.errors.repeat_password ? formik.errors.repeat_password : 'Viskas teisinga'}
            </p>
          )}
        </div>
        <button type='submit' className={css.button}>
          Registruotis
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;

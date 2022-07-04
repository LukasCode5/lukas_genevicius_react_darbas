import { useFormik } from 'formik';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, myFetch, myFetchPostAuth } from '../../utils';
import Notification from '../Notification/Notification';
import css from './AddForm.module.css';
import officeHd2 from '../../assets/img/officeHd2.jpg';
import Container from '../UI/Container/Container';

const initValues = {
  title: '',
  description: '',
};

function AddForm() {
  const history = useHistory();
  const ctx = useAuthCtx();
  const userToken = ctx.token;

  const [backErrors, setBackErrors] = useState('');
  const [successAdd, setSuccessAdd] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      title: Yup.string().min(3, 'Mažiausiai 3 simboliai').required('Privalomas laukas'),
      description: Yup.string().min(3, 'Mažiausiai 3 simboliai').required('Privalomas laukas'),
    }),
    onSubmit: async (values) => {
      const newCard = {
        title: values.title,
        description: values.description,
      };
      const addResult = await myFetchPostAuth(`${baseUrl}/v1/content/skills`, userToken, newCard);
      console.log('registerResult ===', addResult);
      if (addResult.status === 400) {
        setSuccessAdd('');
        setBackErrors('Patikrinkite įvesties laukus');
        setShowNotification(true);
        return;
      }
      if (addResult.status === 500) {
        setSuccessAdd('');
        setBackErrors('Oi, kažkas įvyko netaip');
        setShowNotification(true);
        return;
      }
      values.title = '';
      values.description = '';
      setBackErrors('');
      setSuccessAdd('Pridėjimas sekmingas');
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
      <Container>
        <div className={css.formGroup}>
          <img src={officeHd2} alt='addOffice' />
          <form onSubmit={formik.handleSubmit} className={css.form}>
            {showNotification && backErrors && (
              <Notification onClick={handleHideNotification} message={backErrors} error />
            )}
            {showNotification && successAdd && (
              <Notification onClick={handleHideNotification} message={successAdd} />
            )}
            <h1>Prideti naują įgudį</h1>
            <div className={css.inputGroup}>
              <label htmlFor='title'>Pavadinimas</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                type='title'
                className={`${css.input} ${css[rightClassesForInput('title')]}`}
                name='title'
                placeholder='Įveskite pavadinimą čia...'
              />

              {formik.touched.title && (
                <p className={`${css.message} ${css[rightClassesForErrorMessage('title')]}`}>
                  {formik.errors.title ? formik.errors.title : 'Viskas teisinga'}
                </p>
              )}
            </div>

            <div className={css.inputGroup}>
              <label htmlFor='description'>Aprašymas</label>
              <textarea
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                type='description'
                className={`${css.input} ${css[rightClassesForInput('description')]}`}
                name='description'
                placeholder='Įveskite aprašymą čia...'
                rows={7}
              />
              {formik.touched.description && (
                <p className={`${css.message} ${css[rightClassesForErrorMessage('description')]}`}>
                  {formik.errors.description ? formik.errors.description : 'Viskas teisinga'}
                </p>
              )}
            </div>
            <button type='submit' className={css.buttonSubmit}>
              Siųsti
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default AddForm;

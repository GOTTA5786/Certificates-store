import { useParams } from 'react-router-dom'
import styles from './CertificatePage.module.css'
import { useAppSelector } from '../../redux/store'
import { Certificate } from '../../types/certificateReducer'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import InputMask from 'react-input-mask';
import { OSSaleTypes, PaymentTypeId } from '../../types/submit';
import useStateWithValidation from '../../components/hooks/useFormValidate';

enum InputIdTypes{
  INPUT_NAME = 'INPUT_NAME',
  INPUT_EMAIL = "INPUT_EMAIL",
  INPUT_PHONE_NUMBER = 'INPUT_PHONE_NUMBER',
}

const CertificatePage: React.FC = () => {
  const { id } = useParams()
  const { items } = useAppSelector(state => state.certificates)
  const navigate = useNavigate()

  const [message, setMessage] = useState<string>('');

  const [phone, onChangePhone, isPhoneValid, checkPhoneValidity] = useStateWithValidation('+7-___-___-__-__');
  const [email, onChangeEmail, isEmailValid, checkEmailValidity] = useStateWithValidation('');
  const [name, onChangeName, isNameValid, checkNameValidity] = useStateWithValidation('');

  let certificate: Certificate | undefined

  if (id && items){
    certificate = items.get(id)
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    if (certificate && isPhoneValid && isEmailValid && isNameValid){
      const OSSale :OSSaleTypes = {
        "ApiKey": process.env.REACT_APP_API_KEY || '',
        "MethodName": "OSSale",
        'Id': certificate.ID,
        'TableName': certificate.TABLENAME,
        'PrimaryKey': certificate.PRIMARYKEY,
        'Price': certificate.PRICE,
        'Summa': certificate.SUMMA,
        'ClientName': name,
        'Phone': phone,
        'Email': email,
        'PaymentTypeId': PaymentTypeId.SECOND_PAYMENT_TYPE,
        'UseDelivery': false,
        'IsGift': false,
        'MsgText': message,
      }

      try {
        fetch('https://sycret.ru/service/api/api',{
        method: 'post',
        body: JSON.stringify(OSSale)
      })
      .then(res => {
        if (res.ok === true) {navigate('/payment')}
        else{navigate('/error')}
      })
      } catch (error) {
        navigate('/error')
      }
      
      
    }
    else{
      return
    }
  } 
  
  if (certificate){
    return (
    <div className={styles.container}>
        <form className={styles.form} onSubmit={e => onSubmit(e)} noValidate>
          <p className={styles.itemName}>{certificate.NAME}</p>
          <label className={isNameValid ? styles.validInput : styles.invalidInput}>
            ФИО *
            <input 
            id={`${InputIdTypes.INPUT_NAME}`} 
            type='text' 
            placeholder='Введите имя' 
            value={name} 
            onChange={e => onChangeName(e.target)} 
            onBlur={e => checkNameValidity(e.target)}
            required/>
            <p className={isNameValid ? styles.validMessage : styles.invalidMessage}>Это поле должно быть заполнено</p>
          </label>
          <label className={isPhoneValid ? styles.validInput : styles.invalidInput}>
            Телефон *
            <InputMask 
            id={`${InputIdTypes.INPUT_PHONE_NUMBER}`}
            type='tel' 
            mask='+7-999-999-99-99' 
            pattern='\+{1}7{1}[\-][0-9]{3}[\-][0-9]{3}[\-][0-9]{2}[\-][0-9]{2}' 
            placeholder='+7-___-___-__-__' 
            maskChar='_' 
            value={phone} 
            onChange={e => onChangePhone(e.target)} 
            onBlur={e => checkPhoneValidity(e.target)}
            required/>
            <p className={isPhoneValid ? styles.validMessage : styles.invalidMessage}>
              {(phone === '+7-___-___-__-__' || phone === '') ? 'Это поле должно быть заполнено' : 'Вы ввели некорректный номер'}
            </p>
          </label>
          <label className={isEmailValid ? styles.validInput : styles.invalidInput}>
            Почта *
            <input 
            id={`${InputIdTypes.INPUT_EMAIL}`}
            type='email' 
            placeholder='Введите email' 
            value={email} 
            onChange={e => onChangeEmail(e.target)} 
            onBlur={e => checkEmailValidity(e.target)}
            required/>
            <p className={isEmailValid ? styles.validMessage : styles.invalidMessage}>
              {email === '' ? 'Это поле должно быть заполнено' : 'Вы ввели некорректный email'}
            </p>
          </label>
          <label className={styles.userMessage}>Сообщение
            <textarea onChange={e => setMessage(e.target.value)}/>
          </label>
          <input className={styles.submit} type='submit' value='Оплатить'></input>
        </form>
    </div>
    )
  }

  return (
    <div className={styles.error}>
      Что-то пошло не так
    </div>
  )
}
export default CertificatePage
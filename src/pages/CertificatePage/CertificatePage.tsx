import { useParams } from 'react-router-dom'
import styles from './CertificatePage.module.css'
import { useAppSelector } from '../../redux/store'
import { Certificate } from '../../types/certificateReducer'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import InputMask from 'react-input-mask';

const CertificatePage: React.FC = () => {
  const { id } = useParams()
  const { items } = useAppSelector(state => state.certificates)
  const navigate = useNavigate()

  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [phoneValidity, setPhoneValidity] = useState<boolean>(true);
  const [emailValidity, setEmailValidity] = useState<boolean>(true);
  const [nameValidity, setNameValidity] = useState<boolean>(true);

  let certificate: Certificate | undefined

  function handlePhoneValidity(e: React.FocusEvent<HTMLInputElement, Element>){
    if (e.target.validity.valid) setPhoneValidity(true)
    else setPhoneValidity(false)
  }

  function handleEmailValidity(e: React.FocusEvent<HTMLInputElement, Element>){
    if (e.target.validity.valid) setEmailValidity(true)
    else setEmailValidity(false)
  }

  function handleNameValidity(e: React.FocusEvent<HTMLInputElement, Element>){
    if (e.target.value === '') setNameValidity(false)
    else setNameValidity(true)
  }

  function submitValidation(){
    let check = true

    if (!(phone && phoneValidity)){
      setPhoneValidity(false)
      check = false
    }

    if (!(email && emailValidity)){
      setEmailValidity(false)
      check = false
    }

    if (!(name && nameValidity)){
      setNameValidity(false)
      check = false
    }

    return check
  }

  if (id && items){
    certificate = items.get(id)
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!submitValidation()) return
    if (certificate && phoneValidity && nameValidity && emailValidity){
      const OSSale = {
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
        'PaymentTypeId': 2,
        'UseDelivery': 0,
        'IsGift': 0,
        'MsgText': message,
      }

      fetch('https://sycret.ru/service/api/api',{
        method: 'post',
        body: JSON.stringify(OSSale)
      })
      
      navigate('/payment')
    }
  } 
  
  if (certificate){
    return (
    <div className={styles.container}>
        <form className={styles.form} onSubmit={e => onSubmit(e)} noValidate>
          <p className={styles.itemName}>{certificate.NAME}</p>
          <label className={nameValidity ? styles.validInput : styles.invalidInput}>
            ФИО *
            <input 
            id='name' 
            type='text' 
            placeholder='Введите имя' 
            value={name} 
            onChange={e => setName(e.target.value)} 
            onBlur={e => handleNameValidity(e)}
            required/>
            <p className={nameValidity ? styles.validMessage : styles.invalidMessage}>Это поле должно быть заполнено</p>
          </label>
          <label className={phoneValidity ? styles.validInput : styles.invalidInput}>
            Телефон *
            <InputMask 
            type='tel' 
            mask='+7-999-999-99-99' 
            pattern='\+{1}7{1}[\-][0-9]{3}[\-][0-9]{3}[\-][0-9]{2}[\-][0-9]{2}' 
            placeholder='+7-___-___-__-__' 
            maskChar='_' 
            value={phone} 
            onChange={e => setPhone(e.target.value)} 
            onBlur={e => handlePhoneValidity(e)}
            required/>
            <p className={phoneValidity ? styles.validMessage : styles.invalidMessage}>
              {(phone === '+7-___-___-__-__' || phone === '') ? 'Это поле должно быть заполнено' : 'Вы ввели некорректный номер'}
            </p>
          </label>
          <label className={emailValidity ? styles.validInput : styles.invalidInput}>
            Почта *
            <input 
            type='email' 
            placeholder='Введите email' 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            onBlur={e => handleEmailValidity(e)}
            required/>
            <p className={emailValidity ? styles.validMessage : styles.invalidMessage}>
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
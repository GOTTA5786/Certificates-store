import { Link } from 'react-router-dom'
import styles from './CertificateCard.module.css'
import { Certificate } from '../../types/certificateReducer'

const CertificateCard: React.FC<Certificate> = (props) => {
    
  return (
    <Link   to={`/certificate/${props.ID}`}>
            <div className={styles.container}>
                <p>{props.NAME}</p>
                <span>{props.DISCOUNT === ''
                ? <></>
                : <span className={styles.oldPrice}>{props.PRICE}</span>}
                <span> {props.SUMMA} руб.</span>
                </span>
            </div>
    </Link>
  )
}

export default CertificateCard
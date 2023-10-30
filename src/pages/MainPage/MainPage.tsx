import CertificateCard from '../../components/CertificateCard/CertificateCard'
import { useAppSelector } from '../../redux/store'
import styles from './MainPage.module.css'


const MainPage: React.FC = () => {
    const { items, isLoading, error } = useAppSelector(state => state.certificates)

    if (isLoading) return(
        <div className={styles.loading}>
            Загрузка...
        </div>
    )

    if (error) return(
        <div className={styles.loading}>
            Что-то пошло не так...
        </div>
    )

    return (
        <div className={styles.container}>
            {[...items.values()].map(item => <CertificateCard key={item.ID} {...item}/>)}
        </div>
    )
}
export default MainPage
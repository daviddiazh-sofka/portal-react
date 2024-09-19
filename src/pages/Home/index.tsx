import { Link } from 'react-router-dom';
import whiteBackground from '../../assets/background.png';
import styles from './styles.module.css'
import { Typography } from '@mui/material';

const coeUrls = [
  { name: 'AI', url: '#' },
  { name: 'Calidad', url: '#' },
  { name: 'Cloud', url: '#' },
  { name: 'Dev/Arq', url: '#' },
  { name: 'Management', url: '#' },
  { name: 'RPA', url: '#' },
];

export const Home = () => {
  const orangeBars = Array(coeUrls.length + 2).fill(0);
  return (
    <div className={styles.container}>
      <img
        src={whiteBackground}
        alt="Portal AI Sofka"
        width={500}
        height={500}
        className={styles.img}
      />

      <div className={styles['coe-containter']}>
        <div className={styles['coe-list']}>
          {coeUrls.map((coe) => (
            <Link
              key={coe.name}
              to={coe.url}
              className={styles['coe-item']}
            >
              <Typography color='textPrimary'>{coe.name}</Typography>
            </Link>
          ))}
        </div>         
        <div 
          className={styles['coe-list']}
          style={{marginTop: 10}}
        >
          {orangeBars.map((_, index) => (
            <div
              key={index}
              className={styles.orange} 
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

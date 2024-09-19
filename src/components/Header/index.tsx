import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CircularProgress, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import { CiCloudMoon, CiLight, CiSettings, CiUser } from 'react-icons/ci'
import { useTheme } from '../../context/ui/theme/ThemeProvider'
import { ThemeMode } from '../../context/ui/theme/ThemeContext'
import { StyledMenu } from '../StyledMenu'
import logo from '../../assets/logo.png'
import styles from './styles.module.css'
import { useLogin } from '../../hooks/useLogin';
import { useAuth } from '../../context/auth/AuthProvider';

export function Header() {

  const { mode, setThemeMode } = useTheme();
  const { handleSignIn } = useLogin();
  const { user, status, logout } = useAuth();

  const [anchorElTheme, setAnchorElTheme] = useState<null | HTMLElement>(null);
  const openTheme = Boolean(anchorElTheme);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTheme(event.currentTarget);
  };

  const handleClose = (newStatus: ThemeMode) => {
    setThemeMode(newStatus);
    setAnchorElTheme(null);
  };

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const openUser = Boolean(anchorElUser);
  const handleClickUser = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorElUser(null);
    logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to='/'>
          <img src={logo} width={200} />
        </Link>

        <div className={styles.rightContainer}>
          <div>
            <button
              onClick={handleClick}
              className={styles.themeBtn}
            >
              {
                mode === 'light' ? <CiLight style={{fontSize: 20}} /> : <CiCloudMoon style={{fontSize: 20}} />
              }
            </button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorElTheme}
              open={openTheme}
              onClose={() => setAnchorElTheme(null)}
            >
              <MenuItem onClick={() => handleClose('dark')} disableRipple sx={{gap: 1}}>
                <CiCloudMoon />
                <Typography>Modo oscuro</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleClose('light')} disableRipple sx={{gap: 1}}>
                <CiLight />
                <Typography>Modo claro</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleClose('system')} disableRipple sx={{gap: 1}}>
                <CiSettings />
                <Typography>Sistema</Typography>
              </MenuItem>
            </StyledMenu>
          </div>
          <div>
            {
              status === 'authenticated' ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img 
                    src={user?.photoURL ?? ''} 
                    alt={`Foto de ${user?.displayName}`} 
                    className={styles.photoUser}
                    onClick={handleClickUser}
                  />
                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorElUser}
                    open={openUser}
                    onClose={() => setAnchorElUser(null)}
                  >
                    <MenuItem onClick={() => handleCloseUser()} disableRipple sx={{gap: 1}}>
                      <CiUser />
                      <Typography>Cerrar sesión</Typography>
                    </MenuItem>
                  </StyledMenu>
                </div>
              ) : status === 'checking' ? <CircularProgress /> : (
                <button className={styles.loginBtn} onClick={handleSignIn}>
                  <Typography>Acceder</Typography>
                </button>  
              )
            }
          </div>
        </div>
      </div>
    </header>
  )
}

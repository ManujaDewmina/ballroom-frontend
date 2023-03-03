import { useAuthContext } from '@asgardeo/auth-react'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fetchAccessToken } from '../../api/common'
import { useApp } from '../../hooks/useApp'
import { Sidebar, TopBar } from '../organisms'

interface IProps {
  children?: React.ReactNode
}

export const Layout: React.FC<IProps> = ({ children }) => {

  const {appState, setAppState} = useApp();
  const {getAccessToken, signOut, state} = useAuthContext();
  const [idpToken, setIdpToken] = useState<string | null>(null);


  useEffect(()=>{
    if (appState.auth.status === "inactive") {

      const getToken = async () => {
        const token  = await getAccessToken();
        setIdpToken(token);
        return;
      }

      if(idpToken !== null){
        fetchAccessToken(idpToken, setAppState, signOut);
      }else{
        if(state.isAuthenticated){
          getToken();
        }
      }
    }
  }, [])

  return (
    <>
        <main style={{ display: 'flex', flexDirection: 'row' }}>
            <Box
                sx={{
                width: { lg: '20%', xs: 'auto' },
                maxWidth: '20%',
                height: '100vh',
                zIndex: '50',
                }}
            >
                <Sidebar />
            </Box>
            <section style={{ width: '80%', maxWidth: '80%' }}>
                <TopBar />
                {children}
            </section>
        </main>
    </>
  )
}
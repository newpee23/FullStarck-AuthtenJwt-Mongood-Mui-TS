import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import DrawerMenu from '../atoms/DrawerMenu';
import { useState, useEffect } from 'react';
import { getUserToken, handleLogOut } from '../function';

type Props = {}

const AppBarMenu = ({ }: Props) => {


  const [username, setUsername] = useState<string | null>('');

  useEffect(() => {
    setUsername(getUserToken());
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className='text-md'>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Box className='flex items-center justify-between'>
                <Box className="grid grid-cols-[auto,1fr] gap-4 items-center"><AssignmentIndIcon className='flex items-center' />{username}</Box>
                <Box className='hidden sm:block'>
                  <Box className='flex items-center cursor-pointer'onClick={handleLogOut}> <LogoutIcon className='mr-2'/> Log Out</Box>
                </Box>
              </Box>
            </Typography>
            <DrawerMenu />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default AppBarMenu;
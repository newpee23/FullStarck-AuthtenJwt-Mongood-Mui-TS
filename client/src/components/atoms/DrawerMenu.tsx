import { useState } from "react";

import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import { handleLogOut } from "../function";

type Props = {}

const DrawerMenu = ({ }: Props) => {

    const [statusopen, setStatusOpen] = useState<boolean>(false);

    const listData = (): JSX.Element => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setStatusOpen(false)}
            onKeyDown={() => setStatusOpen(false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Sing Out'].map((text, index) => (
                    <ListItem key={text+index} disablePadding>
                        <ListItemButton onClick={handleLogOut}>
                            <ListItemIcon>
                                <LogoutIcon/>
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );


    return (
        <>
            <IconButton
                className="m-0  block sm:hidden"
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setStatusOpen(true)}
            >
                <MenuIcon />
            </IconButton>

            <Drawer
              anchor="left"
              open={statusopen}
              onClose={() => setStatusOpen(false)}
            >
              {listData()}
            </Drawer>
        </>
    )
}

export default DrawerMenu;
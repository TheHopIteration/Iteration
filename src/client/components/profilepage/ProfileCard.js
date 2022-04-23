import React from 'react'
import { Container, List, ListItem, ListItemIcon, ListItemButton, ListItemText, Stack, Paper, Box } from '@mui/material'
import { Email, Home, Edit } from '@mui/icons-material'
import { maxWidth } from '@mui/material/node_modules/@mui/system'
import {useNavigate} from "react-router-dom"

export const ProfileCard = ({ user }) => {

    let navigate=useNavigate()
    const editProfile = () => {
        navigate("/editProfile")
    }

    return (
        <Container
            className="mainprofilecardcontainer"
            sx={
                {p:2,
                pb: 5,
                }
            }
        >
            <Stack direction="column" spacing={2} alignItems="center"
            sx={{
                p:2,
                bgcolor: 'background.paper',
                maxWidth: 500,
                boxShadow: 1
            }}>
                <img src="/img/bunny-profile.png" width="150" height="150"/>
                <h2>{user.first_name} {user.last_name}</h2>
            <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
                <List>
                    <ListItem >
                        <ListItemIcon>
                            <Email />
                        </ListItemIcon>
                        <ListItemText primary={user.email} />
                    </ListItem>
                    <ListItem >
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary={user.home_location} />
                    </ListItem>
                    <ListItem >
                        <ListItemButton onClick={editProfile}>
                        <ListItemIcon>
                            <Edit />
                        </ListItemIcon>
                        <ListItemText primary="Edit Profile" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            </Stack>
        </Container>
    )
}
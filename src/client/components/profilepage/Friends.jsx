import React, { useState, useEffect } from 'react'
import {List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Egg } from '@mui/icons-material'


export const Friends = ({ friends }) => {

  const friendEls = friends.map((friend, index) => {
    return (
      <ListItem key={index}>
        <ListItemIcon>
          <Egg/>
        </ListItemIcon>
        <ListItemText primary={friend} />
      </ListItem>
    )
  })

  return (
    <List>  
      {friendEls}
    </List>
  )
}
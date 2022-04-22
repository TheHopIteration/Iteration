import React, { useState, useEffect } from 'react'


export const Friends = ({ friends }) => {

  const friendEls = friends.map((friend, i) => {
    return (
      <div key={i}>{friend}</div>
    )
  })

  return (
    <div>  
      {friendEls}
    </div>
  )
}
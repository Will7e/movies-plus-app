import React from 'react'
import {Typography} from "@mui/material"

const Logo = ({theme}) => {
    
  return (
    <Typography
    variant="caption"
    component="div"
    fontWeight={"700"}
    fontSize="1.7rem"
  >
    <div>
      Next
      <span
        style={{
          color: theme.palette.primary.main,
        }}
      >
        Flix
      </span>
    </div>
  </Typography>
  )
}

export default Logo
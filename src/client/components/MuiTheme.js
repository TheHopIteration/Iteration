import { createTheme } from '@mui/material'

const MuiTheme = createTheme({
    palette: {
        primary:{
            main: '#ee5d6c',
            contrastText: '#fff'
        },
        action: {
            disabledBackground: '#D3D3D3',
            disabled: '#808080'
        }
    }
})

export default MuiTheme
import React, { useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export default function PageSpinner() {
    const [open, setOpen] = useState(true)
    return (
        <Backdrop open={open} onClick={() => setOpen(false)}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

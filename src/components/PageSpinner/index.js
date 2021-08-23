import React, { useState } from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function PageSpinner() {
    const [open, setOpen] = useState(true)
    return (
        <Backdrop open={open} onClick={() => setOpen(false)}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

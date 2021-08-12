import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function PageSpinner() {
    return (
        <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <CircularProgress />
        </div>
    )
}

import React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

///////////////////////////////////////////
// Alert settings
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    
    
///////////////////////////////////////////
// Return allerts    
interface alert_Interface {
    Severity: "error" | "warning" | "info" | "success",
    Message: string
}

export function returningAlerts(alertSettings:alert_Interface):JSX.Element {

    return <Alert id='alertMessage' severity={alertSettings.Severity}>{alertSettings.Message}</Alert>
}
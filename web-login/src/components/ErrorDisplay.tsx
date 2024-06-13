import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Alert, Typography } from "@mui/material";
import { useEffect } from "react";
import { clearError } from "../store/errorSlice";


const ErrorDisplay = () => {
    const {error} = useSelector((state: RootState) => state?.error)
    const dispatch = useDispatch()


    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 3000); 

            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    return ( <>
        {error && <Alert severity="error">
            <Typography data-testid="error-alert">
            {error?.message}
            </Typography>
            </Alert>
            }
    </> );
}
 
export default ErrorDisplay;
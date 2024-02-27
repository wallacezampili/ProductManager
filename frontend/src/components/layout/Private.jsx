import { useContext, useEffect, useState } from "react";
import {AuthContext} from '../../context/AuthContext';
import {useNavigate} from 'react-router-dom';

function Private({children}) {

    // const {authenticated} = useContext(AuthContext);
    const [token] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate();

    useEffect(() => {
        if(!token)
        {
            navigate('/login', {replace: true});
        }
    }, [token]);


    return children;
}

export default Private;
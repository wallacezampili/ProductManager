import { useEffect, useState } from "react";
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

export function useAuth() {
    const [token] = useState(localStorage.getItem('token') || '');
    const [authenticated, setAuthenticated] = useState(false);
    const { createMessage } = useContext(MessageContext);
    const navigate = useNavigate();


    //Check authentication
    useEffect(() => {
        if (token) {
            setAuthenticated(true);
        }
    }, [token]);

    async function register(user) {

        let msgType = 'success';

        //Register api call
        const data = await api.post('/users/register', user).then((response) => {
            return response.data;
        }).catch((err) => {
            msgType = 'error';
            console.log(err);
            return err.response.data;
        });

        if (data.token) {
            authUser(data.token);
        }

        createMessage(data.message, msgType);

    }

    async function login(user) {
        let msgType = 'success';

        //Login api call
        const data = await api.post('/users/login', user).then((response) => {
            return response.data;
        }).catch((err) => {
            msgType = 'error';
            return err.response.data;
        })

        if (data.token) {
            authUser(data.token);
        }
        createMessage(data.message, msgType);

    }

    async function authUser(token) {
        setAuthenticated(true);
        localStorage.setItem('token', token);
        navigate('/');
    }

    async function logout() {
        //Remove token from storage
        setAuthenticated(false);
        localStorage.removeItem('token');
        createMessage('Succefully logged out!', 'success');
     

    }

    return { register, login, logout, authenticated }
}
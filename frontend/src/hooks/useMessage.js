import { useState, useEffect } from "react";

export function useMessage()
{
    const [ msgType, setMsgType ] = useState("");
    const [ msg, setMsg ] = useState("");

    useEffect(() => {
        if(msg)
        {
            setTimeout(() => {
                setMsg('');
                setMsgType('');
            }, 2000)
        }
    }, [msg])


    function createMessage(text, type)
    {
        setMsg(text);
        setMsgType(type);

    }


    return {msg, msgType, createMessage}

}
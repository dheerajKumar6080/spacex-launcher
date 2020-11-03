import React from 'react';
import '../styles/TextField.css'

const TextField = ({data, textId}) => {
    return (
        <>
            <div className="text_style" id={textId}>{data}</div>
            <div className="line_style"></div>
        </>
    );
}

export default TextField;
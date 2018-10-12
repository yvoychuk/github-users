import React from 'react';
import Loader from '../UI/Loader';
import NoContent from '../UI/NoContent';
import Error from '../UI/Error';

export default function compose(data, component) {
    if (typeof data === "undefined") return <NoContent />;
    let {status} = data;
    if (typeof status === "undefined") return <NoContent />; 
    let {code} = status;
    if (code === 100) return <Loader />;
    if (code === 400) return <Error />;
    if (code === 200) return component;
}
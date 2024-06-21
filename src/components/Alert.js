import React, { useEffect, useState } from 'react';

export default function Alert(props) {
    const [showMessage, setShowMessage] = useState(false);

    const applyAlert = (message) => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 2000);
    };

    useEffect(() => {
        applyAlert(props.message);
    }, [props.message]);

    return (
        <div>
            {showMessage && (
                <div className="alert alert-primary" role="alert">
                    {props.message}
                </div>
            )}
        </div>
    );
}

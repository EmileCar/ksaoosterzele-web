import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/loading/LoadingSpinner";

const DataFromApiFetchLayout = ({serviceFunctionCallback, setData, loadingText = "Bezig met laden", reloadTrigger, children}) => {
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!serviceFunctionCallback) {
            setIsPending(false);
            setError("No service function callback provided");
            return;
        }

        setIsPending(true);
        setError(null);
        serviceFunctionCallback().then(data => {
            setData(data);
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setIsPending(false);
        });
    }, [reloadTrigger]);

    return (
        <>
            {isPending
            ?
                <LoadingSpinner text={loadingText}/>
            :
            <>
                {error &&
                    <div className="error">{error}</div>
                }
                {children}
            </>
            }
        </>
    );
}

export default DataFromApiFetchLayout;
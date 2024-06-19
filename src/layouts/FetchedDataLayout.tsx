import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import LoadingText from "../components/loading/LoadingText";

const FetchedDataLayout = ({isPending, error, children} : {isPending: boolean, error: string | null, children: React.ReactNode}) => {

    return (
        <>
            {isPending
            ?
                <LoadingSpinner text={<LoadingText />}/>
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

export default FetchedDataLayout;
import React, { FunctionComponent } from 'react';

interface ISpacer {
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
}

const Spacer: FunctionComponent<ISpacer> = ({ top = '1em', left = '1em', bottom = '1em', right = '1em', children }) => {
    return (
        <div
            style={{
                marginTop: top,
                marginLeft: left,
                marginBottom: bottom,
                marginRight: right,
            }}
        >
            {children}
        </div>
    );
};

export default Spacer;

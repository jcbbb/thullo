import * as React from 'react';

interface ISpacer {
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
    width?: string;
}

const Spacer: React.FC<ISpacer> = ({
    top = '1em',
    left = '1em',
    bottom = '1em',
    right = '1em',
    width = '100%',
    children,
}) => {

    return (
        <div
            style={{
                width,
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

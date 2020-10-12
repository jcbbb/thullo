import React from 'react';

interface IProps {
    size?: { height: number; width: number };
    color?: string;
    viewBox?: string;
}

const withIcon = (icon: string) => {
    const Icon = ({ size = { height: 24, width: 24 }, color = 'currentColor', viewBox = '0 0 24 24' }: IProps) => {
        return (
            <svg
                viewBox={viewBox}
                width={size.width}
                height={size.height}
                fill={color}
                dangerouslySetInnerHTML={{ __html: icon }}
            ></svg>
        );
    };

    return Icon;
};

export default withIcon;

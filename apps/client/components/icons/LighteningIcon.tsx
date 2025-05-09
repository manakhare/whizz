import React from 'react'

export default function LighteningIcon({size="size-6", fill="white"} : {
    size?: string;
    fill?: string;
}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 24 24" strokeWidth={1} stroke={fill} className={size}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
        </svg>
    )
}

import Image from 'next/image'
import React from 'react'

const ChevronDown = ({ className }: { className?: string }) => {
    return (
        <Image src={'/icons/chevron-down.png'} alt='chevron down' width={10} height={10} className={className} />
    )
}

export default ChevronDown

import { ImageWithLoader } from "@/shared/ui/image-with-loader"
import React from 'react'

const ChevronDown = ({ className }: { className?: string }) => {
    return (
        <ImageWithLoader src="/icons/chevron-down.png" alt="chevron down" width={10} height={10} className={className} />
    )
}

export default ChevronDown

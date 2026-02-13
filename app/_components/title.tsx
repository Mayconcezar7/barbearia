import React from 'react'

interface TitleProps{
    title: string
}

const Title = ({title}:TitleProps) => {
    
  return (
    <h2 className="mb-3 mt-6 text-xs text-gray-400">{title}</h2>
  )
}

export default Title
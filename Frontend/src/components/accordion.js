import PropTypes from 'prop-types'
import { useState } from 'react'

export default function Accordion({title, children}) {
    const [show, setShow] = useState(false)
    const toggleVisibility = () => {
        setShow(() => !show)
    }

    return (
        <div className="w-full max-w-lg mx-auto shadow-md rounded-md">
            {/* Accordion */}
            <div className="w-full bg-white">
                {/* Head */}
                <div className={'flex justify-between items-center px-2 ' + (show ? 'border-l-2 bg-gray-100 border-indigo-500 leading-normal' : '')}>
                    <h1 className={'font-medium text-gray-800 py-2 ' + (show ? 'text-xl text-indigo-500' : '')}>{title}</h1>
                    <button onClick={toggleVisibility}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </button>
                </div>
                {/* Content */}
                {show && 
                    <div className="overflow-hidden p-2">
                        {children}
                    </div>
                }
            </div>
        </div>
    )
}

Accordion.propTypes = {
    title: PropTypes.string,
    children: PropTypes.object
}
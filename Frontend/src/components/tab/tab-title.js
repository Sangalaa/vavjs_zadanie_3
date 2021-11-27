import PropTypes from 'prop-types'
import { useCallback } from 'react'

export default function TabTitle({title, selectedTab, setSelectedTab, index}) {
    const handleClick = useCallback(() => {
        setSelectedTab(index);
    }, [setSelectedTab, index])
    
    return (
        <li className={ 'inline mr-2 ' + (selectedTab === index ? 'border-b-2 border-indigo-500 text-indigo-500' : '') }>
            <button onClick={handleClick}>{title}</button>
        </li>
    )
}

TabTitle.propTypes = {
    title: PropTypes.string,
    selectedTab: PropTypes.number
}
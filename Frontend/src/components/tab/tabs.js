import PropTypes from 'prop-types'
import TabTitle from './tab-title'

import { useState } from 'react'

export default function Tabs({children}) {
    const [selectedTab, setSelectedTab] = useState(0)

    return (
        <div>
            <ul>
                {children.map((child, index) => (
                    <TabTitle
                        key={`tab-title-${index}`}
                        title={child.props.title}
                        index={index}
                        setSelectedTab={setSelectedTab}
                        selectedTab={selectedTab}
                    />
                ))}
            </ul>
            {children[selectedTab]}
        </div>
    )
}

Tabs.propTypes = {
    children: PropTypes.array
}
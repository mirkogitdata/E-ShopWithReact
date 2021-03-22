import React from 'react';

import Directory from '../../component/directory/directory.component';
import './Homepage.styles.scss';

const Homepage = (props) => {
    console.log(props);
    return(
        <div className='Homepage'>
            <Directory />
        </div>
    )
}

export default Homepage;
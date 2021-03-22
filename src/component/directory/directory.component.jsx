import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {selectDirectorySections} from '../../redux/directory/directory-selectors';

import '../directory/directory.styles.scss';
import MenuItem from '../menu-item/menu-item.component.jsx';
import MenuData from '../directory/menu-data.js';

class Directory extends React.Component {
    constructor(){
        super();

        this.state = {
            sections: MenuData
        }
    }
    render(){
      const {sections} = this.state;
        return(
            <div className='directory-menu'>
               {
               sections.map(({ id, ...otherSectionProps}) =>(
                 <MenuItem
                   key={id}
                   {...otherSectionProps}
                  />
               ))
               }
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector ({
   sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
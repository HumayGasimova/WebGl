/**
* Libraries
*/

import React,{
    Component
} from 'react';

import {
    connect
} from 'react-redux';

import {
    bindActionCreators
} from 'redux';

/**
* Components
*/

/**
* Styles
*/

import './dropdown.scss';


/**
* Images
*/

import Arrow from '../../../../images/arrow__triangle-small-2-01-512.png';

/**
* Actions
*/

import * as Actions from '../../../../actions';

/**
* Grid component definition and export
*/

class Dropdown extends Component {

    /**
    * Constructor
    */

    constructor (props){
        super(props);
        // this.state = {
        //     showDropdown: false
        // }
    }

    /**
    * Methods
    */
    
   renderDropdown = () => {
       return(
           <div className={this.props.dropdownBottomClassName}>
               {this.props.list.map((el,i) => {
                   return(
                        <div key={i}>
                            {el}
                        </div>
                   )
               })}
           </div>
       )
   }

    /**
    * Markup
    */

    render(){
        return(
            <div className={this.props.dropdownClassName}>
                <div 
                    className={this.props.showDropdown ? this.props.dropdownTopActiveClassName : this.props.dropdownTopClassName}
                    onClick={()=>{this.props.toggleDropdown()}}
                >
                    <div className={this.props.dropdownTopTextClassName}> 
                        {this.props.list[0]}
                    </div>
                    <div>
                        <img src={Arrow} alt="arrow"/>
                    </div>
                </div>
                {this.props.showDropdown ? this.renderDropdown() : null}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            // showDropdown: state.business.showDropdown,
            // creativity: state.business.creativity,
            // unsoldInventory: state.business.unsoldInventory,
            // paperclipPrice: state.business.paperclipPrice,
            // delay: state.business.delay
        };
    },
    (dispatch) => {
        return {
            // toggleDropdown: bindActionCreators(Actions.toggleDropdown, dispatch),
            // sellPaperclips: bindActionCreators(Actions.sellPaperclips, dispatch)
        };
    }
)(Dropdown);
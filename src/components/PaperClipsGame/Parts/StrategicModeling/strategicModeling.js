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

import Button from '../../../../library/Button/button';
import Grid from '../../SmallParts/Grid/grid';
import Dropdown from '../../SmallParts/Dropdown/dropdown';
import Backdrop from '../../SmallParts/Backdrop/backdrop';

import StrategicModelingLeft from './StrategicModelingLeft/strategicModelingLeft';
import StrategicModelingRight from './StrategicModelingRight/strategicModelingRight';

/**
* Styles
*/

import './strategicModeling.scss';

/**
* Actions
*/

import * as Actions from '../../../../actions';

/**
* Selectors
*/

import * as Selectors from '../../../../reducers/selectors';

/**
* StrategicModeling component definition and export
*/

export class StrategicModeling extends Component {

    /**
    * Constructor
    */

    constructor (props){
        super(props);
        this.state = {
            isHovering: false,
            newTournamentButtonDisabled: false
        }
    }

    /**
    * Methods
    */

    handleMouseEnter = () => {
        this.setState({
            isHovering: true
        })
    }

    handleMouseLeave = () => {
        this.setState({
            isHovering: false
        })
    }

    renderStrategicModelingLeft = () => {
        if(this.state.isHovering){
            return(
                <StrategicModelingLeft/>
            )
        }
    }

    renderStrategicModelingRight = () => {
        if(!this.state.isHovering){
            return(
                <StrategicModelingRight/>
            )
        }
    }

    renderGrid = () => {
        // if(true){
        //     return(
        //         <div>
        //             {this.state.example.map((el,i) => {
        //                 return(
        //                     <Grid
        //                         key={i}
        //                         className={`grid-line${i}`}
        //                         stock={el.stock}
        //                         amt={el.amt}
        //                         price={el.price}
        //                         total={el.total}
        //                         pl={el.pl}    
        //                     />
        //                 )
        //             })}
        //         </div>
        //     )
        // }
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.ops !== this.props.ops) {
    //         if(!this.props.newTournamentCost <= this.props.ops && !this.props.tournamentContinues){
    //             this.setState({
    //                 newTournamentButtonDisabled:
    //             })
    //         }
   
    //     }
      
    // }

    /**
    * Markup
    */

    render(){
        return(
            <div className="strategicModeling">
                <div className="strategicModeling-box">
                    <div className="strategicModeling-wrapper1">
                        <div className="strategicModeling-label">Strategic Modeling</div>
                        <Dropdown 
                            list={this.props.listStrategicModeling}
                            dropdownClassName={"dropdown-strategicModeling"}
                            dropdownTopClassName={"dropdown-top-strategicModeling"}
                            dropdownTopActiveClassName={"dropdown-top-active-strategicModeling"}
                            dropdownBottomClassName={"dropdown-bottom-strategicModeling"}
                            dropdownTopTextClassName={"dropdown-top-text-strategicModeling"}
                            toggleDropdown={this.props.toggleDropdownStrategicModeling}
                            showDropdown={this.props.showDropdownStrategicModeling}
                            chosenListDropdown={this.props.chosenListDropdown[1]}
                            elementsIndexInArray={1}
                        />
                        <Button
                            className="strategicModeling-button-run"
                            onClick={this.props.startRunningStrategicModeling}
                            text={"Run"}
                            disabled={!this.props.tournamentContinues}
                        />
                    </div>
                    <div>Pick strategy, run tournament, gain yomi</div>
                    <div 
                        onMouseEnter={this.handleMouseEnter} 
                        onMouseLeave={this.handleMouseLeave} 
                        className="strategicModeling-wrapper2"
                    >
                        {this.renderStrategicModelingLeft()}
                        {this.renderStrategicModelingRight()}
                    </div>
                   
                </div>
                <div>
                    <div className="strategicModeling-wrapper3">
                        <Button
                            className="strategicModeling-button"
                            onClick={this.props.startNewTournament}
                            text={"New Tournament"}
                            disabled={this.props.newTournamentButtonDisabled}
                        />
                        <div>Cost: {this.props.newTournamentCost} ops</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            listStrategicModeling: Selectors.getListStrategicModelingState(state),
            showDropdownStrategicModeling: Selectors.getShowDropdownStrategicModelingState(state),
            chosenListDropdown: Selectors.getChosenListDropdownState(state),
            tournamentContinues: Selectors.getTournamentContinuesState(state),
            newTournamentCost: Selectors.getNewTournamentCostState(state),
            ops: Selectors.getOpsState(state),
            newTournamentButtonDisabled: Selectors.getNewTournamentButtonDisabledState(state),
            
        };
    },
    (dispatch) => {
        return {
            toggleDropdownStrategicModeling: bindActionCreators(Actions.toggleDropdownStrategicModeling, dispatch),
            startNewTournament: bindActionCreators(Actions.startNewTournament, dispatch),
            startRunningStrategicModeling: bindActionCreators(Actions.startRunningStrategicModeling, dispatch),
        };
    }
)(StrategicModeling);

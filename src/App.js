import React from 'react';
import { render } from 'react-dom';
import Selection from './components/selection/Selection'
import Order from './components/orders/Order'
import ErrorMessage from './components/errors/ErrorMessage'
import './styles.css'

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            diners: [
                {
                    selections: []
                },
                {
                    selections: []
                },
            ],
            validations: { isInvalid: false, validations: []}
        },
        this.selectionValidation = this.selectionValidation.bind(this),
        this.updateDinerState = this.updateDinerState.bind(this),
        this.menuData = require('../menu-data.json')
    }


    // updates parent state based off of a specific diners selections. This method is being passed down into the the selection component to be called.
    updateDinerState(selection) {
        const updatedDiners = this.state.diners
        const combinedCourses = Object.values(selection.menuItems).filter(course => {
            if (!!course.length) {
                return course[0]
            }
        }).map(item => item[0])

        updatedDiners[selection.diner].selections = combinedCourses
        this.setState({
            ...this.state,
            diners: updatedDiners
        })
    }

    // This method matches all validation concerns listed in the github prompt. If had used global state, I would have likely abstracted this logic into
    // a selector file that grabs the data from state to formulate these conditional decisions. I would have then exported it from there so it's usable wherever
    selectionValidation(menuItems) {
        const restrictedMenuItems = { cheesecake: this.menuData.desserts.find(x => x.name.toLowerCase() === "cheesecake").id, 
                                prawnCocktail: this.menuData.starters.find(x => x.name.toLowerCase() === "prawn cocktail").id,
                                salmonFillet: this.menuData.mains.find(x => x.name.toLowerCase() === "salmon fillet").id
                            };

        const noCoursesSelected = menuItems.mains.length === 0 && menuItems.starters.length === 0 && menuItems.desserts.length === 0
        const mainCourseNotSelected = menuItems.mains.length === 0 || (menuItems.starters.length === 0 && menuItems.desserts.length === 0)
        const moreThanOneItemPerCourse = menuItems.mains.length > 1 || menuItems.starters.length > 1 || menuItems.desserts.length > 1

        const limitedInventory = (this.state.diners[0].selections.includes(restrictedMenuItems.cheesecake) 
                                || this.state.diners[1].selections.includes(restrictedMenuItems.cheesecake))
                                && menuItems.desserts.includes(restrictedMenuItems.cheesecake)

        const snobbyWaiter = menuItems.starters.includes(restrictedMenuItems.prawnCocktail) && menuItems.mains.includes(restrictedMenuItems.salmonFillet)
        
        // setting state here so the values can be used in multiple components, rather than just returning a boolean and calling this 
        // function inside the disabled property of the submit button in the selection component
        this.setState({ 
            ...this.state,
            validations: {
                isInvalid: (mainCourseNotSelected || noCoursesSelected || moreThanOneItemPerCourse || limitedInventory || snobbyWaiter) || false,
                validations: { noCoursesSelected: noCoursesSelected, mainCourseNotSelected: mainCourseNotSelected, moreThanOneItemPerCourse: moreThanOneItemPerCourse, limitedInventory: limitedInventory, snobbyWaiter: snobbyWaiter }
            }
        })
    }
    
    render() {
        return (
            <div className="body">
                <ErrorMessage validations={this.state.validations} />
                <Selection updateDinerSelections={this.updateDinerState} 
                            selectionValidation={this.selectionValidation}
                            isInvalid={this.state.validations.isInvalid} menuData={this.menuData} />
                <Order orders={this.state.diners} menuData={this.menuData} />
            </div>
        );
    }
}

render(<App />, document.getElementById('root'));

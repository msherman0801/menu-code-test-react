import React from 'react';
import "./styles.css"

export default function ErrorMessage(props) {
    
    const { validations } = props;

    const validationMessage = () => {
        if (validations.isInvalid) {
            const validationType = validations.validations
            
            if (validationType.noCoursesSelected) {
                return ""
            } else if (validationType.mainCourseNotSelected) {
                return "You must have at least two courses, and one must be a main!"
            } else if (validationType.moreThanOneItemPerCourse) {
                return "You can only choose one item per course!"
            } else if (validationType.limitedInventory) {
                return "We're sorry! We no longer have any more of that item (cheesecake but obviously you knew that?!!)."
            } else if (validationType.snobbyWaiter) {
                return "God you're disgusting. You can't have a prawn cocktail AND a salmon fillet in the same meal! What are you thinking? I am genuinely astonished that you would even think of doing something like that in a fine establishment such as this. I beg you to change your mind. I'm definitely not a snobby waiter by the way. Wait am I even a waiter? This is a website. I'm so confused."
            }
        }
    }
    
    return (
        <div className="error-section">
            {validationMessage()}
        </div>
    )

}
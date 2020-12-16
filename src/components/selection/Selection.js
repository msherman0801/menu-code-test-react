import React, { useState, useEffect } from 'react';
import './styles.css'

export default function Selection(props) {
    
    const { updateDinerSelections, selectionValidation, isInvalid, menuData } = props;
    const [selection, setSelection] = useState({ diner: 0, menuItems: { starters: [], mains: [], desserts: [] }})
    const { starters, mains, desserts } = menuData
    
    // updates component state for diner selections
    const updateDiner = (e) => {
        setSelection({
            ...selection,
            diner: parseInt(e.target.value)
        })
    }

    // updates component state for menu selection
    const updateMenuSelection = (e, course) => {
        const checked = e.target.checked
        const id = e.target.id
        const newCourseItems = checked ? [...selection.menuItems[course], parseInt(id)] : selection.menuItems[course].filter(item => item != id)
        setSelection({
            ...selection,
            menuItems: {
                ...selection.menuItems,
                [course]: newCourseItems
            }
        })
    }

    // dynamically checking if selection state was updated, in order to fire validation method. I chose useEffect to avoid infinite looping issues.
    useEffect(() => {
        selectionValidation(selection.menuItems)
    }, [selection])


    return (
        <div class="menu"> 
            <div className="menu-section-header">
                <select name="diner" onChange={(e) => updateDiner(e)}>
                    <option value="0" selected>First Diner</option>
                    <option value="1">Second Diner</option>
                </select> 
            </div>
            
            <div className="menu-section">
                <h1>Starters</h1>
                {starters.map((menuItem) => {
                    return (
                        <>
                        <input type="checkbox" id={menuItem.id} value={menuItem} onChange={(e) => updateMenuSelection(e, "starters")} />
                        <label for={menuItem.id}>{menuItem.name}</label>
                        </>
                    )
                })}
            </div>
            
            <div className="menu-section">
                <h1>Mains</h1>
                {mains.map((menuItem) => {
                    return (
                        <>
                        <input type="checkbox" id={menuItem.id} value={menuItem} onChange={(e) => updateMenuSelection(e, "mains")} />
                        <label for={menuItem.id}>{menuItem.name}</label>
                        </>
                    )
                })}
            </div>

            <div className="menu-section">
                <h1>Desserts</h1>
                {desserts.map((menuItem) => {
                    return (
                        <>
                        <input type="checkbox" id={menuItem.id} value={menuItem} onChange={(e) => updateMenuSelection(e, "desserts")} />
                        <label for={menuItem.id}>{menuItem.name}</label>
                        </>
                    )
                })}
            </div>

            <button className="menu-button" disabled={isInvalid} onClick={() => updateDinerSelections(selection)}>Add to Order</button>
        </div>
    )
}
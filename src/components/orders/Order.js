import React from 'react';
import './styles.css'

export default function Order(props) {

    const { orders, menuData } = props;
    const pendingOrder = () => {
        let total = 0;
        let jsx = []
        for (let diner of orders) {
            if (diner.selections.length) {
                jsx.push(<h5>For customer number {orders.indexOf(diner)+1}</h5>)
            }
            for (let course in menuData) {
                menuData[course].find(meal => {
                    if (diner.selections.includes(meal.id)) {
                        const el = <li>{meal.name} - {meal.price}</li>
                        jsx.push(el)
                        total+=meal.price
                    }
                })
            }
        }

        return (
            <>
                <h4>Total: ${total}</h4>
                {jsx}
                <button disabled={total === 0} className="order-button" onClick={() => window.location.href = "http://localhost:8080"}>Place Order</button>
            </>
        )
    }
    
    return (
        <div className="order-section">
            Your pending order:
            {pendingOrder()}
        </div>
    )

}
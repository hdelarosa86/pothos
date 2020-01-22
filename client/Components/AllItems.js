import React from "react";
import { connect } from "react-redux"
import ItemPreview from "./ItemPreview"

export const AllItems = ({ inventory }) => {
    console.log(inventory)

    const generateItemCards = (inventoryArr) => {
        return inventoryArr.map(item => <ItemPreview item={item} />)
    }
    if (inventory.length > 0) {
        return <div>{generateItemCards(inventory)}</div>
    } else {
        return <div>Items are loading...</div>
    }


}

const mapStateToProps = state => ({
    inventory: state.inventory.items
})
export default connect(mapStateToProps)(AllItems);

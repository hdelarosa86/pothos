import React from "react";
//components
import ItemPreview from "../../Items/ItemPreview";

/*
The ListContent component excepts 2 arguments:
type: String + pulls type of content from parent List component and renders appropriate component
content: Array + pulls content from parent List component and renders based on type


onMount the component ....
-> displays all content based on type argument
*/

export class ListContent extends React.Component {
  render() {
    return (
      <div>
        {this.props.content.map(val => {
          if (this.props.type === "items") {
            return <ItemPreview item={val} />;
          }
        })}
      </div>
    );
  }
}

export default ListContent;

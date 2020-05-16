import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';

const DraggableColorList = SortableContainer(({colors, deleteColor})=> {
    return(
        <div style={{height:'100%'}}>
            {colors.map((color,i) => 
            <DraggableColorBox 
                index={i}
                key={color.color} 
                color={color.color} 
                name={color.name}
                deleteColor={()=>deleteColor(color.color)}
            ></DraggableColorBox>)
            }
        </div>
    )
})

export default DraggableColorList;
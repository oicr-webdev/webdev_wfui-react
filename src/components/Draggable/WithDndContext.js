import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// context singleton
let context;

function withDragDropContext(Component) {
    // ensure a singleton instance of the context exists
    if (!context) {
        context = DragDropContext(HTML5Backend);
    }

    return context(Component);
}

export default withDragDropContext;

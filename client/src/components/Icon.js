import React from 'react';

export class Icon extends React.Component {
    constructor(props) {
        super(props);

        this.icons = {
            'test': {
                viewBox: '0 0 24 24',
                path: <polygon points="16 3 21 8 8 21 3 21 3 16 16 3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            }
        }
    }

    render() {
        const icon = this.icons[this.props.name];

        return (            
            <svg viewBox={icon.viewBox}>{icon.path}</svg>
        );        
    }
}
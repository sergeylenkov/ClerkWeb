import React from 'react';

export class Icon extends React.Component {
    render() {
        return (            
            <svg viewBox={this.props.svg.viewBox}>{this.props.svg.path}</svg>
        );        
    }
}
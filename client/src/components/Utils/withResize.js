import React from "react";

export const withResize = Component => {
    class WrappedComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                size: {
                    height: 0,
                    width: 0
                }
            };

            this.onResize = this.onResize.bind(this);
        }

        onResize() {
            this.setState({
                size: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            });
        }

        componentDidMount() {
            window.addEventListener('resize', this.onResize);
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.onResize);
        }

        render() {
            return <Component size={this.state.size} {...this.props} />;
        }
    }

    return WrappedComponent;
}
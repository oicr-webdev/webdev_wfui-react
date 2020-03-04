import React from 'react';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

class Example extends React.Component {
    constructor() {
        super();
        this.state = {
            isFetching: false,
            fetch5s: false,
            fetch8s: false,
            status: '',
            error: '',
            timeout: false,
            retried: false,
        };
    }
    componentDidMount() {
        this.setState({ isFetching: true });
        setTimeout(() => {
            this.setState({ fetch5s: true });
        }, 5000);
        setTimeout(() => {
            this.setState({ fetch8s: true });
        }, 8000);
        setTimeout(() => {
            this.setState({ isFetching: false, status: 'success' });
        }, 13000);
    }
    render() {
        return (
            <LoadingComponent {...this.state} enableIntl={false} coverWholePage>
                <div>Content is loaded.</div>
            </LoadingComponent>
        );
    }
}

export default <Example />;

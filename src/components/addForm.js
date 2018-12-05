import React from 'react';

export default class addForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: ''
        };
    }

    setNumber(value) {
        this.setState({
            number: value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.number);
        this.setNumber('');
    }

    render() {
        return (
            <form onSubmit={e => this.onSubmit(e)}>
                <input type="number" min="0" max="100"
                    value={this.state.number}
                    onChange={e => this.setNumber(e.target.value)}
                />
                <button type="submit">Guess</button>
            </form>
        )
    }
}
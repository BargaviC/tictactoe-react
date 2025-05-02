import React from 'react';
import './game.css';

// Define the type for props
interface Props {
    value: string | null; // The value displayed in the square
    onClick: (arg0: number) => void;  // The function to handle button clicks
    className?: string; // Optional class name for styling
    squareId: number; // The ID of the square
}


class Square extends React.Component<Props> {
  className: string;
  constructor(props: Props) {
    super(props);
    this.className = `square ${props.className || ''}`;
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className={this.className} 
      onClick={() => this.props.onClick(this.props.squareId)}
      disabled={!!this.props.value}>
        {this.props.value ?? 'Empty'}
      </button>
    );
  }
}
export default Square;
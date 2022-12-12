import React, { Component } from 'react';

class PTopHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="top_menu_toggle">
        <button className="toggle_btn">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            focusable="false"
            role="presentation"
          >
            <path
              d="M5 15h14v2H5zm0-8h14v2H5zm0 4h14v2H5z"
              fill="#000"
              fill-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    );
  }
}

export default PTopHeader;

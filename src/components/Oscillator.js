// import React from "react";
//
// export default class Oscillator extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       clicked: false
//     };
//   }
//
//   changeStateAndHandleClick = () => {
//     this.setState({
//       clicked: !this.state.clicked
//     });
//     // if (this.state.clicked === true) {
//     //   this.props.stopKey(this.props.note.id);
//     // } else {
//     this.props.playKey(this.props.note.id);
//     // }
//   };
//
//   render() {
//     return (
//       <div
//         onClick={this.changeStateAndHandleClick}
//         onKeyDown={this.handleKeyPress}
//       >
//         I am Note {this.props.note.id}
//       </div>
//     );
//   }
// }

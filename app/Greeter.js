import React,{Component} from 'react'
import './main.css'
var config = require('./config.json');

// module.exports = function() {
//   var greet = document.createElement('div');
//   greet.textContent = config.greetText;
//   return greet;
// };
class Greeter extends Component{
	render (){
		return(
			<div>
				{config.greetText}
			</div>
		)
	}
}
export default Greeter
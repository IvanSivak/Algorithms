/** 
 * Prime numbers generator using Sieve of Eratosthenes
 *
 * More info at: 
 * https://github.com/IvanSivak/Sieve-of-Eratosthenes
 *
 * Blog:
 * http://www.ivansivak.net/blog/reactjs-sieve-of-eratosthenes-prime-numbers
 *
 */ 
 
var SieveApp = (function(){
	
	// Entry point
	var init = function(){
		$(document).ready(function(){
			setReactApp();
		});
	};
	
	/** 
	 * Returns array of booleans where index
	 * represents the number and its bool value
	 * represents whether it is prime number
	 * or not.
	 */ 
	var generatePrimes = function(n){
		var a = [],
		  counter = 0;
		  
	    for (var i = 0; i <= n; i++) a.push(true);

	    a[0] = false;
	    a[1] = false;
	  
	    for (var i = 2; i <= Math.sqrt(n); i++){
			if (a[i] == true){
				counter = 0;
				for (var j = i*i; j <= n; j = (i*i)+(counter*i)) {
					a[j] = false;
					counter++;
				} 
			}
		}
		
		return a;
	};
	
	/** 
	 * Renders the array
	 */ 
	var PrimesList = React.createClass({displayName: "PrimesList",
		render: function() {
		  return (
			React.createElement("div", null,
			  this.props.list.map(function(listValue, index, self){
				return React.createElement("span", {className: 'plain' + (listValue ? ' green' : '')}, index);
			  })
			)
		  );
		}
	});

	/** 
	 * React app wrapper
	 * Handles the view and updates based on generated model
	 */ 
	var reactApp = React.createClass({
	  displayName: 'SieveApp',

	  getInitialState: function getInitialState() {
		return { list: [], limit: 139 };
	  },
	  onChange: function onChange(e) {
		this.setState({ limit: e.target.value });
	  },
	  handleSubmit: function handleSubmit(e) {
		e.preventDefault();
	   
		this.setState({ list: generatePrimes(this.state.limit) });
	  },
	  render: function render() {
		return React.createElement(
		  'div',
		  null,
		  React.createElement('form', { onSubmit: this.handleSubmit },
			React.createElement('span', null, 'Please, enter the uppler limit'),
			React.createElement('input', { onChange: this.onChange, value: this.state.limit, type: 'number' }),
			React.createElement('button', null, 'Generate Primes')
		  ),
		  React.createElement(PrimesList, { list: this.state.list })
		);
	  }
	});
	
	/**
	 * Creates and renders the react classes
	 */
	var setReactApp = function(){
		ReactDOM.render(React.createElement(reactApp, null), document.getElementById('container'));
	};
	
	// Exports
	return {
		init: init
	}
})();


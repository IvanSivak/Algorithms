// Prime numbers generator using Sieve of Eratosthenes
function getPrimes(n){
  var a = [false, false],
      counter = 0,
      result = [];
      
  for (var i = 0; i <= n - 2; i++) a.push(true);
      
  for (var i = 2; i <= Math.sqrt(n); i++){
    if (a[i] == true){
      counter = 0;
      for (var j = i*i; j <= n; j = (i*i)+(counter*i)) {
        a[j] = false;
        counter++;
      } 
    }
  }
  
  
  /*for (var i = 0; i < a.length; i++){
    if (a[i] == true) result.push(i);
  }*/
  
  return a;//result;
}

//alert(getPrimes(64));
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

var SieveApp = React.createClass({
  displayName: 'SieveApp',

  getInitialState: function getInitialState() {
    return { list: [], limit: 139 };
  },
  onChange: function onChange(e) {
    this.setState({ limit: e.target.value });
  },
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
   
    this.setState({ list: getPrimes(this.state.limit) });
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

$(document).ready(function(){
	ReactDOM.render(React.createElement(SieveApp, null), document.getElementById('container'));
});
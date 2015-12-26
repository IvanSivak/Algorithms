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
  
  
  for (var i = 0; i < a.length; i++){
    if (a[i] == true) result.push(i);
  }
  
  return result;
}

alert(getPrimes(64));
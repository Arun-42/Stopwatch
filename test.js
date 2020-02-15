
function timer(){
  let n = 10;
  n = setInterval((n) => {
    let out = n+1;
    return out;
  }, 1000);
  return(n);
};
let o = timer();
console.log(o);

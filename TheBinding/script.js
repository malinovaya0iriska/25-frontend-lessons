Function.prototype.myCall = function (thisContext, ...args) {
  const symbol = Symbol();
  thisContext[symbol] = this;

  const returnValue = thisContext[symbol](...args);
  delete thisContext[symbol];

  return returnValue;
};

Function.prototype.myApply = function (thisContext, args = []) {
  return this.myCall(thisContext, ...args);
};

Function.prototype.myBind = function (thisContext, ...args) {
  return (...newArgs) => this.myApply(thisContext, [...args, ...newArgs]);
};

const user = {
  id: 344,
  name: 'developer',
  email: 'dev@gmail.com',
};
function showInfo(workPlace, age) {
  console.log(
    'My ID is ',
    this.id,
    'I am a ',
    this.name,
    'Keep in touch:',
    this.email,
    'Workplace:',
    workPlace,
    'My age is ',
    age
  );
}
showInfo.myCall(user, 'Tinkoff', 87);
showInfo.myApply(user, ['Tinkoff', 87]);

const logUserInfo = showInfo.myBind(user, 'Tinkoff', 87);
logUserInfo();

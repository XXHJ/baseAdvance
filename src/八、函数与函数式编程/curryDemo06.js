// ...args 为ES6语法中的不定参数，args表示一个由所有参数组成的数组，最新的chrome浏览器已经支持该语法
function compose(...args) {
  var arity = args.length - 1;
  var tag = false;
  if (typeof args[arity] === 'function') {
    tag = true;
  }

  if (arity > 1) {
    var param = args.pop(args[arity]);
    arity--;
    var newParam = args[arity].call(args[arity], param);
    args.pop(args[arity]);

    // newParam 是上一个参数的运行结果，我们可以打印出来查看他的值
    args.push(newParam);
    console.log(newParam);

    return compose(...args);
  } else if (arity == 1) {
    // 将操作目标放在最后一个参数，目标可能是一个函数，也可能是一个值，因此针对不同的情况做不同的处理
    if (!tag) {
      return args[0].bind(null, args[1]);
    } else {
      return args[0].call(null, args[1]);
    }
  }
}


var fn1 = function (a) { return a + 100 }
var fn2 = function (a) { return a + 10 }
var fn3 = function (a) { return a + 20 }

var bar = compose(fn1, fn2, fn3, 10);
console.log(bar());

// 输出结果
// 30       
// 40
// 140

var base = function () {
  return arguments[0] + arguments[1];
}

var foo1 = function (fn) {
  return fn.bind(null, 20);
}
var foo2 = function (fn) {
  return fn.bind(null, 30);
}

var res = compose(foo1, foo2, base);
console.log(res());

// 输出结果
// f() {}
// 50
# babel6升级babel7记录
## 相关依赖说明
涉及到的依赖，名字有所改变，均是`@babel/XXX`，基本上一个项目都会涉及以下依赖:
- `@babel/cli`
- `@babel/core`
- `@babel/preset-env`
- `@babel/runtime`: contain Babel modular runtime helpers and a version of regenerator-runtime
- `@babel/runtime-corejs2`: 和`@babel/runtime`有点像，只是区别在于可以用于非实例方法的polyfill，它可以用`core-js`里面的函数替换类似`Promise`或者`Symbol`的对象
- `@babel/polyfill`: includes a custom regenerator runtime and core-js
- `@babel/plugin-transform-runtime`: 把babel的公共helpers函数改成对`@babel/runtime`或者`@babel/runtime-corejs2`的引用以达到公用的目的，另外也可以为一些
类似`Map`、`Promise`等的polyfill创建一个沙盒环境，其实就是不再改写全局属性上的原型对象，直接使用内部闭包引用对应模块，但这也就意味着比如`[]`等实例对象是不会有相关polyfill出来的方法

## 配置
```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false,
        "useBuiltIns": "usage"
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "useESModules": true
      }
    ]
  ]
}
```
关键说明:

1. `@babel/preset-env`:
    - `modules`: 设置为false只是为了webpack，因为webpack自己会转换成自己的模块系统(非webpack配合使用可以利用babel来转换成其它模块格式)

2. `@babel/plugin-transform-runtime`:
    - `corejs`: 如果设置成`2`的话，则需要安装`@babel/runtime-corejs2`依赖，并且类似`Promise`等的polyfill会改成局部引用(默认false的话，还是直接polyfill到全局属性上，比如挂载个Promise到window对象下)
    - `useESModules`: 也是为了webpack

有一点需要注意的，一般我们webpack的`babel-loader`都会配置成排除`node_modules`目录里的代码，如果`transform-runtime`的`corejs`配置成`2`，那这个
时候就要意识到一点，比如Promise，你的项目源码引用的Promise对象和项目依赖的代码所引用的Promise对象就很有可能不是同一个了！

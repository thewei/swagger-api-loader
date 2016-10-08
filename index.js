var loaderUtils = require('loader-utils')
var CodeGen = require('swagger-js-codegen').CodeGen

modules.exports = function (source) {
  var swagger = JSON.parse(source)
  var query = loaderUtils.parseQuery(this.query)
  var options = {}
  options.className = query.className || 'Api'
  options.moduleName = query.moduleName || 'api'
  options.swagger = swagger
  if (query.esnext) {
    options.esnext = query.esnext;
  }
  if (query.lint) {
    options.lint = query.lint;
  }
  if (query.beautify) {
    options.beautify = query.beautify;
  }
  if (query.type === 'custom') {
    options.template = query.template
  }
  var fn
  switch (query.type) {
    case 'angular':
      fn = 'getAngularCode'
      break
    case 'node':
      fn = 'getNodeCode'
      break
    case 'typescript':
      fn = 'getTypescriptCode'
      break
    case 'custom':
      fn = 'getCustomCode'
      break
    default:
      fn = 'getCustomCode'
  }

  var result = CodeGen[fn](options)
  return result
}

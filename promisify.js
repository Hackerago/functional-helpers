/**
 * Converts a node-style callback function into a promise-returning function.
 * 
 * @alias promisify
 * @param {Function} func - Node style callback function to convert.
 * @param {Object} [context] - The context to assign to `this`.
 * @returns {Function} A function that will return a promise.
 * @example
 * import promisify from 'functional-helpers/promisify'
 * 
 * const readFile = promisify(fs.readFile)
 * 
 * // works as a promise
 * readFile('file.txt', 'utf8')
 *   .then(file => console.log(file))
 *   .catch(err => console.log('error reading file', err))
 * 
 * // also works as a callback
 * readFile('file.txt', 'utf8', (err, file) => {
 *   if (err) return console.log('error reading file', err))
 *   console.log(file)
 * })
 */
const promisify = (func, context) => (...args) =>
  new Promise((resolve, reject) => {
    const callback = (err, data) => err ? reject(err) : resolve(data)

    func.apply(context, [...args, callback])
  })

module.exports = promisify

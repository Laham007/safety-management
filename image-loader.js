// Simple image loader that returns the same path
// This is needed for static exports
module.exports = function customLoader({ src, width, quality }) {
  return `${src}?w=${width}&q=${quality || 75}`
}

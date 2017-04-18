if (typeof window !== 'undefined' && window.ga) {
  module.exports = window.ga
} else {
  module.exports = () => {}
}

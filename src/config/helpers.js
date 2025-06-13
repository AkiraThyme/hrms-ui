import moment from 'moment'

function generateNumber ({ index, page, row, order, max }) {
  /**
   * Generate number depending on page, number of rows, sort order
   */

  const sort = order.length === 0 ? 'desc' : order[0].sort

  return sort === 'desc'
    ? max - page * row + row - index
    : max - (max - index - 1) + row * (page - 1)
}

function formatDate (date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!(date == null)) {
    return moment(date).format(format)
  }
  return '-'
}

export {
  generateNumber,
  formatDate
}

// Debounce the provided function by waiting a specified number of milliseconds
// after the last call before executing the function. This is useful for limiting
// the frequency of events, such as user input or scrolling.

export function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout | undefined

  return function(this: any) {
    const context = this
    const args = arguments

    const later = function() {
      timeout = undefined
      func.apply(context, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

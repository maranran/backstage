export let expressCom = [
  {
  label: '圆通',
  value: 'yuantong'
  },
  {
    label: '韵达',
    value: 'yunda'
  }
]

export let expressMap = (() => {
  let result = {}
  for (let i in expressCom) {
    let item = expressCom[i];
    result[item.value] = item.label;
  }
  return result
})();
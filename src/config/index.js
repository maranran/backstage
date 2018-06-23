export let expressMap = {
  'yuantong': {
    label: '圆通',
    phone: 95554
  },
  'yunda': {
    label: '韵达',
    phone: 95546
  },
  'shentong': {
    label: '韵达',
    phone: 95543
  }
}

export let expressCom = (() => {
  let express = []
  for (let value in expressMap) {
    express.push({
      label: expressMap[value].label,
      value
    })
  }
  return express;
})()

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
    label: '申通',
    phone: 95543
  },
  'tiantian': {
    label: '天天',
    phone: '400-188-8888'
  },
  'annengwuliu': {
    label: '安能',
    phone: '400-104-0088'
  },
  'zhaijisong': {
    label: '宅急送',
    phone: '400-6789-000'
  },
  'huitongkuaidi': {
    label: '百世',
    phone: '95320'
  },
  'youshuwuliu': {
    label: '优速',
    phone: '95320'
  },
}
export let defaultFilter = {
  // status: 1
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

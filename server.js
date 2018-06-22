const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const compression = require('compression')
const favicon = require('serve-favicon')
const microcache = require('route-cache')

const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'
const app = express()

const { createBundleRenderer } = require('vue-server-renderer')
const templatePath = resolve('./src/index.template.html')
const template = fs.readFileSync(templatePath, 'utf-8')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`
let renderer;
let readyPromise;
function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false
  }))
}

if (isProd) {
  renderer = createRenderer(serverBundle, {
    template,
    clientManifest
  })
} else {
  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})
app.use(compression({ threshold: 0 }))
app.use(favicon('./public/logo-48.png'))
app.use('/dist', serve('./dist', true))
app.use('/public', serve('./public', true))
// app.use('/manifest.json', serve('./manifest.json', true))
// app.use('/service-worker.js', serve('./dist/service-worker.js'))

//app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl)) // 用户无关页面 缓存
const axios = require('axios');
app.get('/api/logistics/:id', (req, res)=> {
  let id = req.params.id;
  axios.get(`http://sp0.baidu.com/9_Q4sjW91Qh3otqbppnN2DJv/pae/channel/data/asyncqury?appid=4001&com=yunda&nu=${id}`, {
    headers: {'Cookie': 'BAIDUID=05A7039841B6502514BFB0DF4EC4902D:FG=1; BIDUPSID=05A7039841B6502514BFB0DF4EC4902D; PSTM=1525675491; BDSFRCVID=TJtsJeC62rO7_jn7QUR5rF5FmcZX42TTH6ao-vcxd4ys09yHLJJgEG0PqM8g0Ku-H2QCogKK0eOTH65P; H_BDCLCKID_SF=tJIt_D_2tCL3j4JIKITS2J8j-fQK5D62aJ3tMhvbWJ5TMCo4Mbjvy4IFK-6lBRjlJmcL0-Os2tL5ShPC-tnhLxIXDMcx-Mng-GcRoPcI3l02Vhb9e-t2ynLVDtTmXPRMW20jWl7mWILhVKFljTuae55yepJf-K6hKCoMsJOOaCvSbqTRy4oTLnk1DNu8LhDfQK7j_CJEtqR8sbobeMQ0WxbXL44eBjIHJRFHVCL5JKv8J5rph46hMPQH-UnLqbJHW57Z0l8Ktq3xStOp0jJR-UF9K4Dt0trMWJcbK-omWIQHDILGb-QDQpoQ-n5fQMvzMHr4KKJx2JLWeIJo5tKahfL8hUJiB5OLBan7_D5xfDDaMKPGe5D3KPk_hxJ354FXKCoBLRvHHJOoDDvdjMQ5y4LdjGKJ--uO3GPf-bOYfPoPMqQz3hAV0h_p3-Aq54R32enWLnL5JtTA8f3c-jbdQfbQ0hQPqP-jW5IL-qoXWJ7JOpkxhfnxy5500aCHJ6KOJnCtV-nVatJHD6ru2470qRIqhUkX5-RLHD7XVMbFbPOkeq8CDR5cjp4qhGJILlDt-eFtKJ6JyfPMhxb2y5jHhIuB-p7btncetn58apRFWJ3psIJMKfFWbT8U5ec7JqomaKviaKJHBMb1MC5Me4bK-TrBja0DqUK; BDUSS=1uRVhWV2F1OGprSEF0eTZtQWNzenlSMk9MVDYtVm9tZGJkUDFkZDZTNEc3RVZiQUFBQUFBJCQAAAAAAAAAAAEAAABVGyixxqS~qMfwsb7X8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZfHlsGXx5bMS; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; MCITY=-%3A; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; PSINO=5; H_PS_PSSID=1436_25810_26458_21119_20698_20929'},
  })
    .then(({ data }) => {
      res.json(data)
    })
});

function render(req, res) {
  const s = Date.now()
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Server', serverInfo)

  const handleError = err => {
    console.log(err)
    if (err.url) {
      res.redirect(err.url)
    } else if(err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
     // console.error(err.stack)
    }
  }

  const context = {
    title: 'My record',
    url: req.url
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.send(html)
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}
app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
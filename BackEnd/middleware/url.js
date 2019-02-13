const urlMiddleware = (req, res, next) =>{
    fileNameToFix = req.query.fileName
    if(typeof fileNameToFix == 'undefined')
        fileNameToFix = ''
    let fileNameNew = fileNameToFix.replace(/[%]/gm,'')
    req.query.fileName = fileNameNew
    next()
  }
  
  module.exports = urlMiddleware
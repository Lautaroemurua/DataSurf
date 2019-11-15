module.exports = {
    config:{
      ENV: process.env.NODE_ENV || 'development',
      PORT: process.env.BE_PORT || 3002,
      BASE_URL: process.env.BASE_URL || 'http://localhost:3002',
      DB:{
        URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/datasurf'
      },
      JWTKey: "tokenUltraSecreto"
    }
  }
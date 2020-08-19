if(process.env.NODE_ENV ==='production'){
    module.exports = require('./prod');
}else{
    module.exports = require('./dev');
}
//NODE_ENV 는 환경변수
module.exports = {
    devServer:{
        proxy :{
            // 이파일 수정시 반드시 vue를 재시작!!
            // 벡엔드의 http://localhost:3000이
            // vue url 주소를 생략하여 사용가능 하도록 설정
            '/board' : { 
                target : 'http://localhost:3000',
                changeOrigin : true,
                logLevel : 'debug',
            },
            historyApiFall
        }
    }
}
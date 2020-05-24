module.exports = {
    appPort:4000,
    mongoUri:'mongodb://localhost:27017/nodeExpressAPI',
    jwt: {
        secret: "jwtSecretKey dsdsd ds ds ds d sd sd s ds sd s ds" ,
        tokens: {
            access: {
                type: 'access',
                expiresIn: '30m'
            },
            refresh: {
                type: 'refresh',
                expiresIn: '60m'
            }
        },
    },
}
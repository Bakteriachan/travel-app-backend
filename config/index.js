module.exports = {
    api: {
        PORT: process.env.API_PORT || 3000,
    },
    travels: {
        PORT: process.env.TRAVEL_PORT || 3001,
    },
    data: {
        mysql: {
            host: process.env.MYSQL_HOST || 'localhost',
            port: process.env.MYSQL_PORT || 3306,
            database: process.env.MYSQL_DB || 'travel-app',
            user: process.env.MYSQL_USER || 'travel-user',
            password: process.env.MYSQL_PASS || 'travel-pass',
        },
        mongo: {
            host: process.env.MONGO_HOST || 'localhost',
            username: process.env.MONGO_USER || 'traveluser',
            password: process.env.MONGO_PASS || 'travelpass',
        },
    },
    secure: {
        jwt_token: process.env.JWT_TOKEN || 'not_a_token',
    },
};
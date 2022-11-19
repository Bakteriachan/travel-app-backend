module.exports = {
    success: function (res, data, code) {
        if (!code) code = 200;
        let response = {
            error: false,
        };
        if (data) response.data = data;
        res.status(code).send(response);
    },
    error: function (res, data, code) {
        if (!code || isNaN(Number(code))) code = 500;
        if (!data) data = "Internal Server Error";
        let response = {
            error: true,
            data: data
        };
        res.status(code).send(response);
    },
};
module.exports = {
    user: function (data) {
        let keys = ['name','username','password','role'];
        for(let i = 0; i < keys.length; i++) {
            if (!data[keys[i]]) {
                return false;
            }
        }
        let lenght = {
            name: 25,
            password: 16,
            username: 20,
        };
        keys = Object.keys(lenght);
        for(let i = 0; i < keys.length; i++) {
            if ( data[keys[i]].lenght > lenght[keys[i]] ) return false;
        }
        return true;
    },
    travel: function (data) {
        let keys = ['username','day','seats','cost'];
        for(let i = 0; i < keys.length; i++) {
            if (! data[keys[i]]) {
                return false;
            }
        }
        return true;
    },
    travel_query: function (data) {
        let keys = ['cost','day','seats'];
        let result_data = {};
        for(let i = 0; i < keys.length; i++) {
            if (data[keys[i]]) {
                result_data[keys[i]] = data[keys[i]];
            }
        }
        return result_data;
    },
};
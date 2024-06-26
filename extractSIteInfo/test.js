const axios = require('axios');

console.log("sss");

axios.get("https://www.coupang.com/")
        .then((res) => {
            console.log(res);
        })
        .catch (err => {
            console.error(err);
        })
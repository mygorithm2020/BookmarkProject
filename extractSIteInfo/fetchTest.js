const fetch = require('node-fetch');

async function aaa() {

    const response = await fetch('https://www.coupang.com/', {timeout : 2000});
    const body = await response.text();

    console.log(body.slice(0, 1000));

}


aaa();


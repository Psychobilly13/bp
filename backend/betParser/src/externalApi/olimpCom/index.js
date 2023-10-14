const cheerio = require('cheerio');
require('dotenv').config()

const url = process.env.OLIMP_COM_URL

async function startOlimpCom() {

    const response = await fetch(url, {headers: {
        'Accept-Language': 'ru-RU'
    }});
    const body = await response.text();

    // const body = fs.readFileSync('./eg.html');

    // TODO: move to utils/parser.js
    const result = {};
    const $ = cheerio.load(body);
    $('div.match_live-sport').each(function () {

        const sportTitle = $(this).find('div.sport-title').text().trim();
        const sportId = $(this).find('div > a.nopic-arrow').attr('data-sportid');
        if (!result[sportId]) result[sportId] = {title: sportTitle, events: []};

        $(this).find('tbody > tr').each(function () {
            const champ = $(this).find('td.col-title > a').text();
            const title = $(this).find('td.col-title > nobr').text();
            const score = $(this).find('td.col-title > div').text();


            const p1 = $(this).find('td.col-koefs').find('td.col-p1').text().trim().split('-').map((r) => r.trim());
            const x = $(this).find('td.col-koefs').find('td.col-x').text().trim().split('-').map((r) => r.trim());
            const p2 = $(this).find('td.col-koefs').find('td.col-p2').text().trim().split('-').map((r) => r.trim());

            // console.log('champ>', champ);
            // console.log('title>', title);
            // console.log('score>', score);
            // console.log('p1>', p1);
            // console.log('x>', x);
            // console.log('p2>', p2);

            result[sportId].events.push({
                champ,
                title,
                score,
                p1,
                x,
                p2,
            })
        });
    });

    //console.log(result);
    console.log(JSON.stringify(result, null, 2));
}

module.exports = {startOlimpCom}
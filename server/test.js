const Crawler = require('crawler');


const c = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            const $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log("test", $('title').text());

            const text = $('title').text()

            console.log("hehe", res.options.uri)

            const isShare = text.includes("#Kingspeed") && text.includes("#KSC") && text.includes("#Freetoplay")

            console.log(isShare)

        }

        // fs.writeFileSync('my_file.txt', status.toString());

        done();
    }
});

c.queue("https://mobile.twitter.com/dmmanir420/status/1459604332660158464");


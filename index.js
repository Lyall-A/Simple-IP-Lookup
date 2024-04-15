const http = require("http");

const ip = process.argv[2];

if (ip)
    console.log(`Looking up IP ${ip}...`); else
    console.log("Looking up your current IP...");

lookup(ip).then(ipInfo => {
    console.log();

    // Error
    if (ipInfo.status != "success") return console.error(`Failed to lookup IP, ${ipInfo.message}!`);

    // Success
    console.log(`-------IP INFO FOR ${ipInfo.query}-------`);
    if (ipInfo.country)     console.log(`Country:          ${ipInfo.country}`);
    if (ipInfo.countryCode) console.log(`Country Code:     ${ipInfo.countryCode}`);
    if (ipInfo.region)      console.log(`Region:           ${ipInfo.region}`);
    if (ipInfo.regionName)  console.log(`Region Name:      ${ipInfo.regionName}`);
    if (ipInfo.city)        console.log(`City:             ${ipInfo.city}`);
    if (ipInfo.zip)         console.log(`ZIP:              ${ipInfo.zip}`);
    if (ipInfo.lat)         console.log(`Latitude:         ${ipInfo.lat}`);
    if (ipInfo.lon)         console.log(`Longitude:        ${ipInfo.lon}`);
    if (ipInfo.timezone)    console.log(`Timezone:         ${ipInfo.timezone}`);
    if (ipInfo.isp)         console.log(`ISP:              ${ipInfo.isp}`);
    if (ipInfo.org)         console.log(`Organization:     ${ipInfo.org}`);
}).catch(err =>
    console.error("Failed to lookup IP! Error:", err.message)
);

function lookup(ip) {
    return new Promise((resolve, reject) => {
        http.request({
            host: "ip-api.com",
            path: `/json${ip ? `/${ip}` : ""}`
        }, res => {
            let data = "";
            res.on("data", i => data += i);
            res.on("end", () => resolve(JSON.parse(data)));
            res.on("error", err => reject(err));
        })
            .end()
            .on("error", err => reject(err));
    });
}
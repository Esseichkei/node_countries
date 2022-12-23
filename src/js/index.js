var fs = require('fs');
var data = fs.readFileSync("src/data/countries.txt").toString();
var lineByLine = data.split('\n');
lineByLine.splice(0, 1); // remove the header, not a country
var countryLines = lineByLine.filter(function (line) { return line.split(" ").length >= 3; });
var processedLines = countryLines.map(function (line) {
    var words = line.split(" ");
    var area = Number(words.at(-1).split(",").join(''));
    var population = Number(words.at(-2).split(",").join(''));
    var countryName = words.slice(0, words.length - 2).join(' ');
    return "\"".concat(countryName, "\",").concat((population / area).toFixed(2), ",").concat(population, ",").concat(area);
});
processedLines.sort(function (a, b) {
    var densityA = Number(a.split(',').at(1));
    var densityB = Number(b.split(',').at(1));
    return densityB - densityA; // this should make the most dense country first
});
var newData = processedLines.join('\n');
try {
    fs.writeFileSync('src/data/output.txt', newData);
}
catch (err) {
    console.error(err);
}

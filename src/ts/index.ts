const fs = require('fs');

const data: string = fs.readFileSync("src/data/countries.txt").toString();

const lineByLine : string[] = data.split('\n');
lineByLine.splice(0, 1); // remove the header, not a country
const countryLines = lineByLine.filter( (line: string): boolean => line.split(" ").length >= 3);
const processedLines : string[] = countryLines.map((line) : string => {
    const words: string[] = line.split(" ");
    const area: number = Number(words.at(-1).split(",").join(''));
    const population: number = Number(words.at(-2).split(",").join(''));
    const countryName: string = words.slice(0, words.length - 2).join(' ');
    return `"${countryName}",${(population / area).toFixed(2)},${population},${area}`;
});
processedLines.sort((a: string, b: string): number => {
    const densityA: number = Number(a.split(',').at(1));
    const densityB: number = Number(b.split(',').at(1));
    return densityB - densityA; // this should make the most dense country first
});
const newData = processedLines.join('\n');
try {
    fs.writeFileSync('src/data/output.txt', newData);
  } catch (err) {
    console.error(err);
  }
'use strict';

const fs = require('fs');

const through2 = require('through2');
const request = require('request');
const split = require('split');

const ora = require('ora');

const debug = require('debug')('gip');

const DEFAULT_SOURCE = 'http://ftp.apnic.net/apnic/stats/apnic/delegated-apnic-latest';

const getIpByCountry = function getIpByCountry (countryCode, flags) {

  if (!countryCode) {
    //TODO: better way to expose errors.
    throw 'what is the country code?';
  }

  debug(`countryCode: ${countryCode}`);
  debug('flags: %j', flags);

  const ccRegExp = new RegExp(countryCode + '\\|ipv4');
  debug(`ccRegExp: ${ccRegExp}`);

  const outStream = flags.o ? fs.createWriteStream(flags.o) : process.stdout;
  debug('outStream: %j', outStream);

  const spinner = ora({
    spinner: 'runner',
    text: 'Loading allocated IP records\n'
  });

  spinner.start();

  return request(flags.s || DEFAULT_SOURCE).pipe(split()).pipe(through2(function(chunk, enc, cb) {
    const currentLine = chunk.toString();
    debug(`currentLine: ${currentLine}`);

    spinner.color = 'yellow';
    spinner.text = 'Parsing';

    if (ccRegExp.test(currentLine)) {
      const ary = currentLine.split('|');
      debug(`currentLine ary: ${ary}`);

      this.push([ary[3], Math.log2(ary[4])].join('/') + '\n');
    }
    cb();

    setTimeout(function () {
      spinner.stop();
    }, 1000);
  })).pipe(outStream).on('error', e => {
    console.error(e);
    process.exit(2);
  });
};

module.exports = getIpByCountry;


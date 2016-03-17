#!/usr/bin/env node

'use strict';

const meow = require('meow');
const getIpByCountry = require('./');

const cli = meow(`
    Usage
      $ gip <countryCode>

    Options
      -s, --source source URL, default to
          http://ftp.apnic.net/apnic/stats/apnic/delegated-apnic-latest
      -o, --output output destination

    Examples
      $ gip CN -o china-ips.txt
`);


getIpByCountry(cli.input[0], cli.flags);

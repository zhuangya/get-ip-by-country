'use strict';

const nock = require('nock');
nock('http://local.dev')
  .get('/raw.txt')
  .replyWithFile(200, __dirname + '/raw.txt');

const getIpByCountry = require('./');
const fs = require('fs');

const ava = require('ava');

ava.test('getIpByCountry', t => {
  getIpByCountry('CN', {
    o: 'test-out.tmp',
    s: 'http://local.dev/raw.txt'
  }).on('end', () => {
    t.is(fs.readFileSync(__dirname + '/test-out.tmp', 'utf-8'), '123')
  });
});


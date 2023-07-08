// Copyright (c)2023 Quinn Michaels
// The Research Deva manages the various @RESEARCH in deva.world

const fs = require('fs');
const path = require('path');

const package = require('./package.json');
const info = {
  id: package.id,
  name: package.name,
  describe: package.description,
  version: package.version,
  url: package.homepage,
  dir: __dirname,
  git: package.repository.url,
  bugs: package.bugs.url,
  author: package.author,
  license: package.license,
  copyright: package.copyright,
};

const data_path = path.join(__dirname, 'data.json');
const {agent,vars} = require(data_path).DATA;

const Deva = require('@indra.ai/deva');
const RESEARCH = new Deva({
  info,
  agent: {
    id: agent.id,
    key: agent.key,
    describe: agent.describe,
    prompt: agent.prompt,
    voice: agent.voice,
    profile: agent.profile,
    translate(input) {
      return input.trim();
    },
    parse(input) {
      return input.trim();
    }
  },
  vars,
  listeners: {},
  modules: {},
  deva: {},
  func: {
    res_question(packet) {return;},
    res_answer(packet) {return;},
  },
  methods: {},
  onDone(data) {
    this.listen('devacore:question', packet => {
      if (packet.q.text.includes(this.vars.trigger)) return this.func.res_question(packet);
    });
    this.listen('devacore:answer', packet => {
      if (packet.a.text.includes(this.vars.trigger)) return this.func.res_answer(packet);
    });
    return Promise.resolve(data);
  },
});
module.exports = RESEARCH

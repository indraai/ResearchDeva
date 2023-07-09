module.exports = {
  /**************
  method: service
  params: packet
  describe: The global service feature that installs with every agent
  ***************/
  research(packet) {
    this.context('feature');
    const research = this.research();
    const data = {};
    return new Promise((resolve, reject) => {
      this.question(`#docs raw feature/research`).then(doc => {
        data.doc = doc.a.data;
        const info = [
          `## Research`,
          `::begin:research:${research.id}`,
          `client: ${research.client_name}`,
          `concerns: ${research.concerns.join(', ')}`,
          `::end:research:${this.hash(research)}`,
        ].join('\n');
        const text = doc.a.text.replace(/::info::/g, info)
        return this.question(`#feecting parse ${text}`)
      }).then(feecting => {
        return resolve({
          text: feecting.a.text,
          html: feecting.a.html,
          data: research
        });
      }).catch(err => {
        return this.error(err, packet, reject);
      })
    });
  },
};

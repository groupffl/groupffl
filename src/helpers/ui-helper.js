module.exports = {
  regexQuotes: function(sentence) {
    return sentence.replace(/&quot;/g, '\"');
  }
};
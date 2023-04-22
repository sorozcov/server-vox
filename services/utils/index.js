const parseBool= bool=> bool.replace(/^\s+|\s+$/g, "").toLowerCase()=='true' ? 1 :  0;
const parseNumber = i=> i!='' && !isNaN(i) ?  i :null;
const parseDate = dat=> !isNaN(Date.parse(dat)) ? dat : null;

module.exports = {parseBool,parseNumber,parseDate};
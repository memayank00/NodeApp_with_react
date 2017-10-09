'use strict';
const path    = require('path'),
    config  = require(path.resolve(`./config/env/${process.env.NODE_ENV}`)),
    _       = require('lodash');
    
function _paging(count, result, page){
    let countResult = (result) ? result.length : 0,
        pageCount = countResult !== 0 ? parseInt(_.ceil(countResult / config.docLimit)) : 0;
    
    return {
        page: page,
        current: countResult,
        count: count,
        prevPage: (page > 1),
        nextPage: (count > (page * config.docLimit)),
        pageCount: pageCount,
        limit: config.docLimit
    };
}

module.exports._paging = _paging;
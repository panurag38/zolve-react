import { ADD_ARTICLE, GET_DATA } from "../actionTypes";
import { api } from '../../api';

const addArticle = (params) => {
  return {type: ADD_ARTICLE, payload: params };
};

const getData = (params = {}) => {
  // https://api.stackexchange.com/2.2/tags?pagesize=30&order=desc&sort=popular&site=stackoverflow
  const { fromDate = '', toDate= '', pageno = '1', pageSize = '20' } = params;
  return {
    type: GET_DATA,
    promise: api('https://api.stackexchange.com/2.2/tags', {
      params: {
        pagesize: pageSize,
        page: pageno,
        fromdate: fromDate,
        todate: toDate,
        order: 'desc',
        sort: 'popular',
        site: 'stackoverflow',
      },
    }),
  };
};

export { addArticle, getData };
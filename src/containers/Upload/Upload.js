import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getData } from '../../redux/actionCreator';

const Upload = (props) => {
  const { articles, addArticleAction, getDataAction, apiData, loaded } = props
  // const [data, setData] = useState([]);

  useEffect(() => {
    getDataAction({ sorts: 'popular'});
  }, []);

  return (
    <div className="">
    </div>
  );
}

const mapStateToProps = store => ({
  apiData: store.data,
  loaded: store.loaded,
});

const mapDispatchToProps = (dispatch) => ({
  getDataAction: (params) => dispatch(getData(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Upload);

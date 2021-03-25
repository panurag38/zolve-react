import React, { useState } from "react";
import { connect } from "react-redux";
import { getData } from '../../redux/actionCreator';
import './home.css';

const Home = (props) => {
  const { apiData = {}, loaded, getDataAction } = props
  const [selectedParams, setData] = useState({});

  const onChangeHandler = (value, actionType) => {
    if (value < 1) return; // don't take negative values;
    // validation for date , date should be past date
    const obj = selectedParams;
    obj[actionType] = value;
    setData({ ...obj });
    console.log(selectedParams);
  };

  const onGetBtnHandler = () => {
    getDataAction(selectedParams);
  };

  const { fromDate = '', toDate = '', pageno = '', pageSize = '' } = selectedParams;

  return (
    <div className="home-container">
      <div className="content-div">
        <div className="input-divs">
          <div>From Date</div>
          <input type="date" id="fromDate" onChange={(e) => onChangeHandler((new Date(e.target.value).getTime() / 1000), 'fromDate')} />
        </div>
        <div className="input-divs">
          <div>To Date</div>
          <input type="date" id="toDate" onChange={(e) => onChangeHandler((new Date(e.target.value).getTime() / 1000), 'toDate')} />
        </div>
        <div className="input-divs">
          <div>Page Size</div>
          <input
            type="number" 
            id="pageSize"
            placeholder="1-30"
            onChange={(e) => onChangeHandler(e.target.value, 'pageSize')}
            value={pageSize}
          />
        </div>
        <div className="input-divs">
          <div>Page no.</div>
          <input
            type="number"
            id="pageno"
            placeholder="1-10"
            onChange={(e) => onChangeHandler(e.target.value, 'pageno')}
            value={pageno}
          />
        </div>
        <div className="apibox">
          <span className="text-content">{`/tags?fromdate=${fromDate}&todate=${toDate}&pagesize=${pageSize}&page=${pageno}desc&sort=popular&site=stackoverflow`}</span>
          <button className="get-btn" onClick={() => onGetBtnHandler()}>GET</button>
        </div>
        {apiData.items && apiData.items.length > 0 &&
          <div className="response-box">
            <div onClick={() => props.history.push('/results?q=apidisplay_content')} className="clickme">
              Click results to view Graph of results
            </div>
            <div className="response-item">
              <span className="res-title">Name</span>
              <span className="res-description" style={{ fontWeight: 700 }}>Count</span>
            </div>
            {apiData.items.map((itm) => (
              <div className="response-item" key={itm.name}>
                <span className="res-title">{itm.name}</span>
                <span className="res-description">{itm.count}</span>
              </div>
            ))}
          </div>
        }
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);

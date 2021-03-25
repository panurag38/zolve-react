import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { Bar } from 'react-chartjs-2';
import { getData } from '../../redux/actionCreator';
import { copyLinkFn } from '../../utils/misc';
import './results.css';

const Results = (props) => {
  const { getDataAction, apiData = {}, location: { search } = {} } = props
  const [dataset, setDataset] = useState({});

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getQueryString = () => {
    const params = queryString.parse(search);
    return params.q || '';
  }

  const getTextAndCopy = () => {
    const _ele = document.getElementById('growBox');
    if (_ele) {
      const value = _ele.value;
      copyLinkFn(value);
    }
  };

  const constructDataSet = (data = []) => {
    if (data.length === 0) return;
    const backgroundColors = new Array(data.length).fill('1').map(() => getRandomColor());
    const borderColors = new Array(data.length).fill('1').map(() => getRandomColor());
    const datasets = {
      labels: data.map((item) => item.name),
      datasets: [
        {
          label: '# of Votes',
          data: data.map((item) => item.count),
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    };
    setDataset({ ...datasets });

  };

  useEffect(() => {
    apiData.items && constructDataSet(apiData.items);
  }, [apiData]);

  useEffect(() => {
    if (!apiData.items) {
      getDataAction().then((res) => {
        constructDataSet(res.payload.items || []);
      });
    }
  }, []);

  if (!apiData.items) return null;
  return (
    <div className="result-container">
      <div className="bar-container">
        <Bar
          height={500}
          width={600}
          data={dataset}
          options={{
            title:{
              display: true,
              text: 'Count of impressions',
              fontSize: 20
            },
            legend: { display: false, position:'bottom' },
          }}
        />
      </div>
      <div className="copy-clip-wrapper">
        <div className="textarea-wrapper">
          <textarea placeholder="Write your text here to copy" type="text" id="growBox" autoCorrect="off" spellCheck="off" autoComplete="off" autoCapitalize="off">
            {getQueryString()}
          </textarea>
        </div>
        <button onClick={() => getTextAndCopy()} className="clip-btn">Copy to Clipboard</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Results));

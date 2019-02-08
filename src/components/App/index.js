import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import Chart from '../Chart';

import { createChart, refreshCharts, refreshChartsOfType, dispatchActionAndRefresh, junkAction } from '../../actions';
import { getSortedCharts } from '../../selectors';

class App extends Component {

  static defaultProps = {
    charts : []
  }

  constructor(props) {
    super(props);

    this.createChart        = this.createChart.bind(this);
    this.refreshCharts      = this.refreshCharts.bind(this);
    this.refreshTypeACharts = this.refreshTypeACharts.bind(this);
    this.refreshStaleCharts = this.refreshStaleCharts.bind(this);
  }

  createChart() {
    this.props.createChart();
  }

  refreshCharts() {
    this.props.refreshCharts();
  }

  refreshTypeACharts() {
    this.props.refreshChartsOfType('Type A');
  }

  refreshStaleCharts() {
    this.props.dispatchActionAndRefresh(
      junkAction('junk', 'useless'),
      (chart) => { return Date.now() - chart.date > 15 * 1000 }
    )
  }

  render() {
    return (
      <div className="App">
        <ul className='controls'>
          <li><button onClick = { this.createChart } >Add chart</button></li>
          <li><button onClick = { this.refreshCharts } >Refresh charts</button></li>
          <li><button onClick = { this.refreshTypeACharts } >Refresh Type A charts</button></li>
          <li><button onClick = { this.refreshStaleCharts } >Refresh charts that are 15 seconds old</button></li>
        </ul>
        <ul className='notes'>
          <li>Okay. Start off by just clicking the 'Add chart' button a few times. That'll add some dummy "chart" widgets, which are
          just boxes that have a few values. You can change them.
          </li>
          <li>The simplest case is just the 'Refresh charts' button. Click that, and everything refreshes.</li>
          <li>Next simplest case would be the 'Refresh Type A charts' button. Click that, and only charts of Type A will refresh. Note
          that chart types are randomly assigned upon creation, and you can edit the type of you don't have an "Type A" charts.</li>
          <li>The complex case is refreshing 15 second old charts. That one dispatches a different type of action that fires off some
          arbitrary action (not specifically a REFRESH_CHART* type), and also takes a condition function that operates on each chart in the list
          and refreshes it if it matches the condition. In this case, if it's more than 15 seconds old.</li>
          <li>Since this is react, there's a ton of boilerplate and irrelevant stuff set up just to make the demo happen. You can really
          just look at src/sagas/charts.js to see the saga implementation with notes on it. The rest is not documented and not written to OmniSci
          style guidelines.</li>
        </ul>
        <div className='charts'>
          { this.props.charts.map( chart => <Chart key={chart.id} chart={chart} /> ) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    charts : getSortedCharts(state)
  }
}

export default connect( mapStateToProps, { createChart, refreshCharts, refreshChartsOfType, dispatchActionAndRefresh } )( App );

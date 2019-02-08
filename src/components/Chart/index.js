import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import './Chart.css';

import { setName, setType, setDate } from '../../actions';

class Chart extends PureComponent {

  render() {

    const chart = this.props.chart;

    return (
      <div className='chart'>
        <div className='field'>ID</div>
        <div className='value'>{chart.id}</div>

        <div className='field'>Name</div>
        <div className='value'>
          <input
            type = 'text'
            onChange={ e => this.props.setName(chart.id, e.target.value) }
            value={chart.name} />
        </div>

        <div className='field'>Type</div>
        <div className='value'>
          <input
            type = 'text'
            onChange={ e => this.props.setType(chart.id, e.target.value) }
            value={chart.type} />
        </div>

        <div className='field'>Date</div>
        <div className='value'>
          <input
            type = 'text'
            onChange={ e => this.props.setDate(chart.id, e.target.value) }
            value={chart.date} />
        </div>
      </div>
    )
  }
}


export default connect( null, { setName, setType, setDate } )( Chart );

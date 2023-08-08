import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SaleReport = () => {
    const options = {
     responsive: true,
     plugins: {
       legend: {
         position: 'top',
       },
       title: {
         display: true,
         text: 'Chart.js Bar Chart',
       },
     },
    };
    
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
     labels,
     datasets: [
       {
         label: 'Dataset 1',
         data: [1],
         backgroundColor: 'rgba(255, 99, 132, 0.5)',
       },
       {
         label: 'Dataset 2',
         data: [1],
         backgroundColor: 'rgba(53, 162, 235, 0.5)',
       },
     ],
    };
    
    return(
        <div className="col-md-7">
          <div className="card">
              <div className="card-body pb-2">
                  <div className="float-end d-none d-md-inline-block">
                      <div className="btn-group mb-2">
                          <button type="button" className="btn btn-xs btn-light">Today</button>
                          <button type="button" className="btn btn-xs btn-light">Weekly</button>
                          <button type="button" className="btn btn-xs btn-secondary">Monthly</button>
                      </div>
                  </div>
                  <h4 className="header-title mb-3">Sales Analytics</h4>
                  <Bar options={options} data={data} />
              </div>
          </div> 
        </div>
    )
}

export default SaleReport;


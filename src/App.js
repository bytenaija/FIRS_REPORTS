import React, { Component } from 'react'
import axios from 'axios'
import AppCSS from './App.css'
import ReactChartkick, {
  LineChart,
  PieChart,
  ColumnChart,
  BarChart
} from 'react-chartkick'
import Chart from 'chart.js'



ReactChartkick.addAdapter(Chart)

class App  extends Component {

  state = {
    processData: [{
      requestedAmount: 3872368.42,
      requestDate: '23/JAN/2019',
      dueDate: '1/FEB/2019',
      dayPastDue: 12,
      explanation: 'D/F&A 06/2/2019 Overhead at 11/2/2019'
    },
{
   requestedAmount: 31218749.41,
     requestDate: '29/JAN/2019',
     dueDate: '9/FEB/2019',
     dayPastDue: 13,
     explanation: 'D/F&A 06/2/2019 Overhead at 11/2/2019'
   },
{
   requestedAmount: 3872368.42,
     requestDate: '18/FEB/2019',
     dueDate: '12/FEB/2019',
     dayPastDue: 30,
     explanation: 'D/F&A 06/2/2019 Overhead at 11/2/2019'
   },
{
   requestedAmount: 3872368.42,
     requestDate: '12/MAR/2019',
     dueDate: '28/FEB/2019',
     dayPastDue: 21,
     explanation: 'D/F&A 06/2/2019 Overhead at 11/2/2019'
   }],

    currentYearContractSum: [
      ["Works", 16],
      ["Services", 45],
      ["Goods", 26],
      ["SPD", 7],
      ["Job Order (General)", 3],
      ["Job Order (Motors)", 3]

    ],
    currentYearSpendAreas: [{
        name: "Total Awards",
        data: {
          "Job Order (Motor Vehicle)": 968,
          "Job Order (General)": 786,
          "SPD": 136,
          "Goods": 135,
          "Services": 783,
          "Works": 37
        }
      },
      {
        name: "Total Completed",
         data: {
           "Job Order (Motor Vehicle)": 364,
           "Job Order (General)": 480,
           "SPD": 118,
           "Goods": 91,
           "Services": 109,
           "Works": 16
         }
      },
          {
        name: "Ongoing",
         data: {
           "Job Order (Motor Vehicle)": 604,
           "Job Order (General)": 303,
           "SPD": 18,
           "Goods": 44,
           "Services": 674,
           "Works": 21
         }
      }
    ],
    liabilitiesInSpendAreas: [],
    fecAwardedProjectsCurrentLiabilities: [],
    contractAwardedForYears: [{
        name: "2016",
        data: {
          "Job Order (Motor Vehicle)": 968,
          "Job Order (General)": 786,
          "SPD": 136,
          "Goods": 135,
          "Services": 783,
          "Works": 37
        }
      },
      {
        name: "2017",
        data: {
          "Job Order (Motor Vehicle)": 364,
          "Job Order (General)": 480,
          "SPD": 118,
          "Goods": 91,
          "Services": 109,
          "Works": 16
        }
      },
      {
        name: "2018",
        data: {
          "Job Order (Motor Vehicle)": 604,
          "Job Order (General)": 303,
          "SPD": 18,
          "Goods": 44,
          "Services": 674,
          "Works": 21
        }
      }
    ],
    yearsContractSumVariousSpend: [
      {
        name: "Job Order (Motor Vehicle)",
        data: {
          "2016": 968,
          "2017": 786,
          "2018": 136,
        }
      },

      {
        name: "Job Order (General)",
        data: {
          "2016": 364,
          "2017": 480,
          "2018": 118,

        }
      },
      {
        name: "SPD",
        data: {
          "2016": 968,
          "2017": 786,
          "2018": 136,
        }
      },

        {
          name: "Goods",
          data: {
            "2016": 968,
            "2017": 786,
            "2018": 136,
          }
        },


        {
          name: "Services",
          data: {
            "2016": 968,
            "2017": 786,
            "2018": 136,
          }
        },
        {
          name: "Works",
          data: {
            "2016": 968,
            "2017": 786,
            "2018": 136,
          }
        }
    ]
  }

  componentDidMount(){
    axios.get('/api').then(result =>{
      console.log(result);
    }).catch(err =>{
      console.log(err.response)
    })
    let {
      processData
    } = this.state;

    processData.sort((a, b) =>{
       if (a.dayPastDue > b.dayPastDue) {
         return -1;
       } else if (a.dayPastDue < b.dayPastDue) {
         return 1;
       } else {
         return 0;
       }
    })

    this.setState({processData})
  }

  changeSort = (sort) =>{
    let { processData } = this.state;
    switch(sort){
      case 'IPC Sum desc':
        processData.sort((a, b) => {
          if (a.requestedAmount > b.requestedAmount) {
            return -1;
          } else if (a.requestedAmount < b.requestedAmount) {
            return 1;
          } else {
            return 0;
          }
        })
      break;
      case 'IPC Sum asc':
      processData.sort((a, b) => {
        if (a.requestedAmount > b.requestedAmount) {
          return 1;
        } else if (a.requestedAmount < b.requestedAmount) {
          return -1;
        } else {
          return 0;
        }
      })
      break;
      case 'Date raised desc':
      processData.sort((a, b) => {
        if (new Date(a.requestDate) > new Date(b.requestDate)) {
          return -1;
        } else if (new Date(a.requestDate) < new Date(b.requestDate)) {
          return 1;
        } else {
          return 0;
        }
      })
      break;
      case 'Date raised asc':
            processData.sort((a, b) => {
              if (new Date(a.requestDate) > new Date(b.requestDate)) {
                return 1;
              } else if (new Date(a.requestDate) < new Date(b.requestDate)) {
                return -1;
              } else {
                return 0;
              }
            })
      break;
      case 'Due Date desc':
       processData.sort((a, b) => {
         if (new Date(a.dueDate) > new Date(b.dueDate)) {
           return -1;
         } else if (new Date(a.dueDate) < new Date(b.dueDate)) {
           return 1;
         } else {
           return 0;
         }
       })
      break;
      case 'Due Date asc':
       processData.sort((a, b) => {
         if (new Date(a.dueDate) > new Date(b.dueDate)) {
           return 1;
         } else if (new Date(a.dueDate) < new Date(b.dueDate)) {
           return -1;
         } else {
           return 0;
         }
       })
      break;
      default:
      processData.sort((a, b) =>{
        if(new Date(a.dayPastDue) > new Date(b.dayPastDue)){
          return -1;
        } else if (new Date(a.dayPastDue) < new Date(b.dayPastDue)){
          return 1;
        }else{
          return 0;
        }
      })
    }

    this.setState({processData})
  }

  renderTableReport = ()  =>{
    return this.state.processData.map((data, index) => {
      return <tr key={index}>
      <td>{index + 1}</td>
      <td>N {data.requestedAmount}</td>
        <td>{data.requestDate}</td>
          <td>{data.dueDate}</td>
          <td>{data.dayPastDue}</td>
          <td>{data.explanation}</td>
      </tr>
    })
  }
render(){
let {
  currentYearContractSum,
  currentYearSpendAreas,
  contractAwardedForYears,
  yearsContractSumVariousSpend
} = this.state;
  return (
      <div id="chartPage">

      <h1>Graphic Analysis of 2018 FIRS Procurement Data</h1>
        <section className="hero">
        <article>
          <h3>2018 Procurement Award by Contract Sum</h3>
            < PieChart data = {
                currentYearContractSum

            }
            suffix = "%"
            legend="right"
            />
          </article>



          <article className = "chart" >
            <h3>2018 Award in various spend areas</h3>
          <BarChart data = {
            currentYearSpendAreas
          }
          height={300}
          legend = "bottom"
          />
          </article>

          <article className = "chart" >
            <h3>Contract Awarded for Years 2016, 2017, 2018</h3>
          < ColumnChart data = {
            contractAwardedForYears
          }
          height={300}
          legend = "bottom"
          />
          </article>


            <article className = "chart" >
            <h3>Total Contract Sum with various spend areas for year 2016, 2017, 2018</h3>
          <BarChart data = {
            yearsContractSumVariousSpend
          }
          height={300}
          legend = "bottom"
          prefix =  "N"
          suffix=".00"
          />
          </article>



        </section>

        <section>
          <div className="text-right">
            <select onChange={(e) => this.changeSort(e.target.value)} >
              <option>IPC Sum desc</option>
              <option>IPC Sum asc</option>
               <option>Date raised desc</option>
                <option>Date raised asc</option>
                <option>Due Date desc</option>
                <option>Due Date asc</option>
            </select>
          </div>
          <table>
            <thead>
              <tr>
                <th>S/No</th>
                <th>IPC Sum</th>
                <th>Date Requested</th>
                <th>Due Date for Payment</th>
                <th>Days Past Due</th>
                <th>Explanation</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableReport()}
            </tbody>
          </table>
        </section>

      </div>
    )
    }
  }

export default App

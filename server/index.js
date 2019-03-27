import path from "path";
import fs from "fs";
import oracledb from 'oracledb'
import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";
import dbConfig from './dbConfig'
import App from "../src/App";
require('dotenv').config();


oracledb.outFormat = oracledb.OBJECT;

const PORT = process.env.PORT || 3008;
const app = express();

const NODE_ENV = process.env.NODE_ENV;

if(NODE_ENV === 'production'){
  app.use(express.static("./client"));
  
app.get("/api", (req, res) => {
  try{
    console.log(dbConfig)
    oracledb.getConnection({
        user: dbConfig.user,
        password: dbConfig.password,
        connectString: dbConfig.connectString
      }).then(async conn => {
      console.log(conn)
      const currentYearContractSumQuery = 'select contractSubType, count(contractSubType) from REVENUE_SOAINFRA.reports_vendor group by contractSubType';
      const currentYearSpendAreasQuery = 'select contractSubType, paymentType, count(contractSubType) from REVENUE_SOAINFRA.reports_vendor group by contractSubType group by paymentType';
      const contractAwardedForYearsQuery = 'select contractSubType, trunc(requestDate, "Year") from REVENUE_SOAINFRA.reports_vendor group by contractSubType group by trunc(requestDate, "Year")'
  
      const currentYearContractSum = await conn.execute(currentYearContractSumQuery);
        // currentYearSpendAreas = await conn.execute(currentYearSpendAreasQuery),
        // liabilitiesInSpendAreas = [],
        // fecAwardedProjectsCurrentLiabilities = [],
        // contractAwardedForYears = await conn.execute(contractAwardedForYearsQuery),
        // yearsContractSumVariousSpend = [];
  
      res.json({
        currentYearContractSum,
        // currentYearSpendAreas,
        // liabilitiesInSpendAreas,
        // fecAwardedProjectsCurrentLiabilities,
        // contractAwardedForYears,
        // yearsContractSumVariousSpend
      });
  
  
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        err
      })
    })
  }catch(err){
    console.log(err)
  }
  
  });
  
app.get("/*", (req, res) => {
  const app = ReactDOMServer.renderToString( < App / > );

  const indexFile = path.resolve("./client/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});
}else{
  app.use(express.static("./build"));
  
app.get("/api", (req, res) => {
  try{
    console.log(dbConfig)
    oracledb.getConnection({
        user: dbConfig.user,
        password: dbConfig.password,
        connectString: dbConfig.connectString
      }).then(async conn => {
      console.log(conn)
      const currentYearContractSumQuery = 'select contractSubType, count(contractSubType) from reports_vendor group by contractSubType';
      const currentYearSpendAreasQuery = 'select contractSubType, paymentType, count(contractSubType) from reports_vendor group by contractSubType group by paymentType';
      const contractAwardedForYearsQuery = 'select contractSubType, trunc(requestDate, "Year") from reports_vendor group by contractSubType group by trunc(requestDate, "Year")'
  
      const currentYearContractSum = await conn.execute(currentYearContractSumQuery),
        currentYearSpendAreas = await conn.execute(currentYearSpendAreasQuery),
        liabilitiesInSpendAreas = [],
        fecAwardedProjectsCurrentLiabilities = [],
        contractAwardedForYears = await conn.execute(contractAwardedForYearsQuery),
        yearsContractSumVariousSpend = [];
  
      res.json({
        currentYearContractSum,
        currentYearSpendAreas,
        liabilitiesInSpendAreas,
        fecAwardedProjectsCurrentLiabilities,
        contractAwardedForYears,
        yearsContractSumVariousSpend
      });
  
  
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        err
      })
    })
  }catch(err){
    console.log(err)
  }
  
  });
  
app.get("/*", (req, res) => {
  const app = ReactDOMServer.renderToString( < App / > );

  const indexFile = path.resolve("./build/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});
}



app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});
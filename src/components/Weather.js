// Imports
import React, { useEffect, useState } from "react";
import axios from "axios";
import fromUnixTime from "date-fns/fromUnixTime";
import getDay from "date-fns/getDay";

// Bootstrap Imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

const Weather = (props) => {
  const APPID = "96f0fae4d16d8eaf08da72206f8a7458";
  const { city } = props;
  const [cityInfo, setCityInfo] = useState({
    name: null,
    now: {
      temperature: null,
      min: null,
      max: null,
    },
    lon: null,
    lat: null,
  });
  const [forecast, setForecast] = useState([]);

  let cityData = null;
  let forecastData = null;

  const getCityData = async () => {
    try {
      let response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${APPID}`
      );

      cityData = response.data;

      console.log(cityData);

      setCityInfo({
        name: cityData.name,
        now: {
          temperature: cityData.main.temp,
          weather: cityData.weather[0].main,
        },
        lon: cityData.coord.lon,
        lat: cityData.coord.lat,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getCityForecast = async () => {
    try {
      let response = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${cityInfo.lat}&lon=${cityInfo.lon}&exclude=current,minutely,hourly&units=metric&appid=${APPID}`
      );

      // console.log(response.data.daily);
      let dataArray = response.data.daily;
      let treatedData = dataArray.map((item) => {
        let object = {
          day: item.dt,
          maxTemp: item.temp.max,
          minTemp: item.temp.min,
          weather: item.weather[0].main,
        };
        return object;
      });

      setForecast([...treatedData]);

      console.log("forecast updated");
    } catch (err) {
      console.log(err);
    }
  };

  const weekDay = (day) => {
    switch (day) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        break;
    }
  };

  // Update city data when city changes
  useEffect(() => {
    getCityData();
  }, [city]);

  // Update forecast when Lat and Lon are updated in the object
  useEffect(() => {
    getCityForecast();
  }, [cityInfo]);

  return (
    <div>
      <Container>
        <Row className="justify-content-sm-center">
          <Col>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <h3>{cityInfo.name}</h3>
              <h4>{parseInt(cityInfo.now.temperature)}ºC</h4>
              <h4>{cityInfo.now.weather}</h4>

              <p></p>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid="md">
        <Row className="justify-content-sm-center">
          <Col>
            <h4>Forecast</h4>
          </Col>
        </Row>
        <Row className="justify-content-sm-center">
          <Col>
            <Table responsive>
              <tbody>
                <tr>
                  <th>Day:</th>
                  {forecast.map((item, key) => {
                    let day = weekDay(getDay(fromUnixTime(item.day)));
                    return <th key={key}>{day}</th>;
                  })}
                </tr>
                <tr>
                  <th>Max:</th>
                  {forecast.map((item, key) => {
                    let day = parseInt(item.maxTemp);
                    return <th key={key}>{day}ºC</th>;
                  })}
                </tr>
                <tr>
                  <th>Min:</th>
                  {forecast.map((item, key) => {
                    let day = parseInt(item.minTemp);
                    return <th key={key}>{day}ºC</th>;
                  })}
                </tr>
                <tr>
                  <th>Weather:</th>
                  {forecast.map((item, key) => {
                    let day = item.weather;
                    return <th key={key}>{day}</th>;
                  })}
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Weather;

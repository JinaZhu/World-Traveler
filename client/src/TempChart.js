import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

const TempChart = ({ temperatures, countryName }) => {
    const tempArray = temperatures.split(',')

    const warmOrCold = tempArray.map((temp) => {
        const cold = "rgba(98,  182, 239,0.4)"
        const warm = "rgba(255, 134,159,0.4)"
        if (temp >= 65) {
            return warm
        } else {
            return cold
        }
    })


    const [data, setData] = useState({
        dataBar: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    label: `${countryName}'s Average Temperature`,
                    data: tempArray,
                    backgroundColor: warmOrCold,
                    borderWidth: 1,
                    borderColor: warmOrCold
                }
            ]
        },
        barChartOptions: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                    {
                        barPercentage: 1,
                        gridLines: {
                            display: true,
                            color: "#6D7973"
                        }
                    }
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: true,
                            color: "#6D7973"
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    })

    return (
        <MDBContainer>
            <p style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>When to Go</p>
            <Bar data={data.dataBar} options={data.barChartOptions} />
        </MDBContainer>
    )

}

export default TempChart; 
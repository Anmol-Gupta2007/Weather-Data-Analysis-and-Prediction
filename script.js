let chart;

function analyzeWeather() {

    const input =
        document.getElementById("temps").value;

    const temperatures = input
        .split(",")
        .map(v => parseFloat(v.trim()))
        .filter(v => !isNaN(v));

    if (temperatures.length < 2) {
        alert("Please enter at least 2 temperatures");
        return;
    }

    const n = temperatures.length;

    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;

    for (let i = 0; i < n; i++) {

        const x = i + 1;
        const y = temperatures[i];

        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumX2 += x * x;
    }

    const slope =
        (n * sumXY - sumX * sumY) /
        (n * sumX2 - sumX * sumX);

    const intercept =
        (sumY - slope * sumX) / n;

    const nextDay = n + 1;

    const predictedTemp =
        intercept + slope * nextDay;

    document.getElementById("prediction")
        .innerHTML =
        `Predicted Next Temperature: ${predictedTemp.toFixed(2)} °C`;

    drawChart(temperatures, predictedTemp);
}

function drawChart(data, prediction) {

    const labels = [];

    for (let i = 1; i <= data.length; i++) {
        labels.push("Day " + i);
    }

    labels.push("Prediction");

    const dataset = [...data, prediction];

    if (chart) {
        chart.destroy();
    }

    const ctx =
        document.getElementById("weatherChart");

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Temperature (°C)",
                data: dataset,
                borderWidth: 2,
                fill: false,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}

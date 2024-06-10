import { defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

function DashboardLineChart() {
    return (
        <div className="w-full h-[250px] md:h-[400px]">
        <Line
          data={{
            labels: revenueData.map((data) => data.label),
            datasets: [
              {
                label: "Admission",
                data: revenueData.map((data) => data.revenue),
                backgroundColor: "#47B259",
                borderColor: "#47B259",
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            }
          }}
        />
        </div>
    );
}

export default DashboardLineChart

const revenueData = [
    {
      "label": "Jan",
      "revenue": 64854,
      "cost": 32652
    },
    {
      "label": "Feb",
      "revenue": 54628,
      "cost": 42393
    },
    {
      "label": "Mar",
      "revenue": 117238,
      "cost": 50262
    },
    {
      "label": "Apr",
      "revenue": 82830,
      "cost": 64731
    },
    {
      "label": "May",
      "revenue": 91208,
      "cost": 41893
    },
    {
      "label": "Jun",
      "revenue": 103609,
      "cost": 83809
    },
    {
      "label": "Jul",
      "revenue": 90974,
      "cost": 44772
    },
    {
      "label": "Aug",
      "revenue": 82919,
      "cost": 37590
    },
    {
      "label": "Sep",
      "revenue": 62407,
      "cost": 43349
    },
    {
      "label": "Oct",
      "revenue": 82528,
      "cost": 45324
    },
    {
      "label": "Nov",
      "revenue": 56979,
      "cost": 47978
    },
    {
      "label": "Dec",
      "revenue": 87436,
      "cost": 39175
    }
  ]
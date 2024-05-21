import { LineChart } from '@mui/x-charts/LineChart';

function DashboardLineChart() {
    return (
        <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
            {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
            ]}
            // width={1000}
            height={500}

        />
    );
}

export default DashboardLineChart
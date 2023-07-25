import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function Pie() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
          ],
          innerRadius: 70,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: -90,
          endAngle: 180,
          cx: 280,
          cy: 100,
        },
      ]}
      width={550}
      height={220}
      margin = {{right: 100}}
    />
  );
}
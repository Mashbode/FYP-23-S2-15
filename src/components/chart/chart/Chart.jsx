import "./chart.scss";
// https://recharts.org/en-US/examples/SimpleAreaChart
import {
  AreaChart,
  Area,
  XAxis,
  // YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
// ];

const data = [
  { name: "January", Total: 1200 },
  { name: "February", Total: 2100 },
  { name: "March", Total: 800 },
  { name: "April", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
];

const Chart = ({ aspect, title }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      {/*ResponsiveContainer from https://recharts.org/en-US/examples/SimpleAreaChart */}
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      {/* Aspect refers height will be half of the width */}
      {/* <ResponsiveContainer width="100%" aspect={2 / 1}> */}
      <ResponsiveContainer width="100%" aspect={aspect}>
        {/* https://recharts.org/en-US/api/AreaChart */}
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {/* id changed */}
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient> */}
          </defs>
          <XAxis dataKey="name" stroke="gray" /> {/* stroke has been added */}
          {/* <YAxis /> */}
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          {/* className has been added for dark mode */}
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total" // uv -> Total
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)" // total -> colorPv
          />
          {/* <Area
            type="monotone"
            dataKey="pv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

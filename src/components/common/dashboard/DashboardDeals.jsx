import  { useEffect, useState } from "react";
import { Card, message } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getDealsData } from "../../../services/dashboardService";
import { mapDealsData } from "../../../utils/mapDealsData";

const { Text } = Typography;

export const DashboardDeals = () => {
  const [dealData, setDealData] = useState([]);
  const [loading, setLoading] = useState(true);



  const fetchData = async () => {
    try {
      const deals = await getDealsData();
      const mapped = mapDealsData(deals);
      setDealData(mapped);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchData();
  },[]);
  // console.log('Final chart data for rendering:', dealData);
  // console.log('Final chart data map:')
  // console.log(dealData.map((d) => ({ state: d.state, value: d.value })));

  return (
    <Card
      style={{ height: 460 }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <DollarOutlined />
          <Text style={{ marginLeft: ".5rem" }}>Deals</Text>
        </div>
      }
    >
      {!loading && dealData.length > 0 ? (
        <ResponsiveContainer width="100%" height={325}>
          <AreaChart data={dealData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorWon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#52C41A" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#52C41A" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F5222D" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#F5222D" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="timeText" />
            <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
            <Tooltip
              formatter={(value, name) => [`$${value / 1000}k`, name === "Won" ? "Deals Won" : "Deals Lost"]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Area
              type="monotone"
              dataKey="wonValue"
              stackId="1"
              stroke="#52C41A"
              fillOpacity={1}
              fill="url(#colorWon)"
              name="Won"
            />
            <Area
              type="monotone"
              dataKey="lostValue"
              stackId="2"
              stroke="#F5222D"
              fillOpacity={1}
              fill="url(#colorLost)"
              name="Lost"
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div style={{ textAlign: "center", padding: "100px" }}>Loading...</div>
      )}
    </Card>
  );
};

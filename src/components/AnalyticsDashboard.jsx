import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { motion } from "framer-motion";
import axios from "axios";

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState({
    summary: [],
    revenueTrends: [],
    orderStatus: [],
    topSellingProducts: [],
    buyerGrowth: [],
    cancellations: [],
    sellerPerformance: { columns: [], data: [] },
    rejectedProducts: { columns: [], data: [] },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/analytics`);
        console.log("API Response:", response.data); // Debugging
        setAnalyticsData(response.data || {});
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <p>Loading analytics...</p>;

  return (
    <div className="p-6 grid gap-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-5 gap-4">
        {(analyticsData?.summary || []).length > 0 ? (
          analyticsData.summary.map((item, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }}>
              <Card>
                <CardContent>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-2xl">{item.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <p>No summary data available.</p>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">Revenue Trends</h3>
            {(analyticsData?.revenueTrends || []).length > 0 ? (
              <BarChart width={500} height={300} data={analyticsData.revenueTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            ) : (
              <p>No data available.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">Order Status</h3>
            {(analyticsData?.orderStatus || []).length > 0 ? (
              <PieChart width={300} height={300}>
                <Pie data={analyticsData.orderStatus} dataKey="value" nameKey="status" fill="#82ca9d" label />
                <Tooltip />
              </PieChart>
            ) : (
              <p>No data available.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">Top Selling Products</h3>
            {(analyticsData?.topSellingProducts || []).length > 0 ? (
              <BarChart width={500} height={300} data={analyticsData.topSellingProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#82ca9d" />
              </BarChart>
            ) : (
              <p>No data available.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">Buyer Growth</h3>
            {(analyticsData?.buyerGrowth || []).length > 0 ? (
              <LineChart width={500} height={300} data={analyticsData.buyerGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="growth" stroke="#8884d8" />
              </LineChart>
            ) : (
              <p>No data available.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">Cancellations</h3>
            {(analyticsData?.cancellations || []).length > 0 ? (
              <PieChart width={300} height={300}>
                <Pie data={analyticsData.cancellations} dataKey="value" nameKey="reason" fill="#ff6b6b" label />
                <Tooltip />
              </PieChart>
            ) : (
              <p>No data available.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">Seller Performance</h3>
            {(analyticsData?.sellerPerformance?.data || []).length > 0 ? (
              <Table columns={analyticsData.sellerPerformance.columns || []} data={analyticsData.sellerPerformance.data || []} />
            ) : (
              <p>No data available.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">Rejected Products</h3>
            {(analyticsData?.rejectedProducts?.data || []).length > 0 ? (
              <Table columns={analyticsData.rejectedProducts.columns || []} data={analyticsData.rejectedProducts.data || []} />
            ) : (
              <p>No data available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Table = ({ columns, data }) => {
  const table = useReactTable({
    columns: columns || [],
    data: data || [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="bg-gray-200">
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="border border-gray-300 p-2">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-100">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border border-gray-300 p-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AnalyticsDashboard;

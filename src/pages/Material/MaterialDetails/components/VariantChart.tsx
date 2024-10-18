import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
type Props = {}
const data = [
    { name: "Vải dỏ ABC cuốn 5m", value: 10, internalRef: "COMM" },
    { name: "Vải dỏ ABC cuốn 15m", value: 20, internalRef: "CONS_0001" },
    { name: "Vải dỏ ABC cuốn 25m", value: 30, internalRef: "CONS_25630" },
    { name: "Vải dỏ ABC cuốn 35m", value: 40, internalRef: "CONS_89957" },
  ]
  const COLORS = ['#000080', '#4169E1', '#87CEEB', '#008080']

const VariantChart = (props: Props) => {
    const total = data.reduce((sum, item) => sum + item.value, 0)

    return (
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Material Variant Quantity Distribution</CardTitle>
          <CardDescription>Percentage of total quantity for each Material Variant</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{
            chart1: { label: "Vải dỏ ABC cuốn 5m", color: "hsl(var(--chart-1))" },
            chart2: { label: "Vải dỏ ABC cuốn 15m", color: "hsl(var(--chart-2))" },
            chart3: { label: "Vải dỏ ABC cuốn 25m", color: "hsl(var(--chart-3))" },
            chart4: { label: "Vải dỏ ABC cuốn 35m", color: "hsl(var(--chart-4))" },
          }} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={
                  ({ payload }) => (
                    <ChartTooltipContent 
                      content={() => {
                        if (payload && payload.length) {
                          const item = payload[0].payload;
                          const percentage = ((item.value / total) * 100).toFixed(2);
                          return (
                            <div className="bg-white p-2 shadow rounded">
                              <p className="font-bold">{item.name}</p>
                              <p>Internal Ref: {item.internalRef}</p>
                              <p>Quantity: {item.value}</p>
                              <p>Percentage: {percentage}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  )
                } />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {data.map((item, index) => (
              <div key={item.internalRef} className="flex items-center">
                <div className="w-3 h-3 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="text-sm">{item.name}: {((item.value / total) * 100).toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
}

export default VariantChart
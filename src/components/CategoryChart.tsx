import { Card } from "@/components/ui/card";
import { Transaction } from "@/types/transaction";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface CategoryChartProps {
  transactions: Transaction[];
}

const COLORS = [
  "hsl(160 84% 39%)",
  "hsl(270 75% 60%)",
  "hsl(38 92% 50%)",
  "hsl(0 84% 60%)",
  "hsl(200 80% 50%)",
  "hsl(330 75% 60%)",
  "hsl(80 70% 50%)",
];

export const CategoryChart = ({ transactions }: CategoryChartProps) => {
  const expenses = transactions.filter((t) => t.type === "expense");

  if (expenses.length === 0) {
    return (
      <Card className="p-6 bg-card border-border">
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          Expenses by Category
        </h2>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">No expenses to display</p>
        </div>
      </Card>
    );
  }

  const categoryTotals = expenses.reduce((acc, transaction) => {
    const category = transaction.category;
    acc[category] = (acc[category] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <Card className="p-6 bg-card border-border animate-scale-in">
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        Expenses by Category
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `$${value.toFixed(2)}`}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

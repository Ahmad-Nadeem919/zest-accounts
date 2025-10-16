import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { Transaction } from "@/types/transaction";

interface DashboardProps {
  transactions: Transaction[];
}

export const Dashboard = ({ transactions }: DashboardProps) => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const stats = [
    {
      title: "Total Balance",
      amount: balance,
      icon: TrendingUp,
      trend: balance >= 0 ? "positive" : "negative",
      description: "Current balance",
    },
    {
      title: "Total Income",
      amount: totalIncome,
      icon: ArrowUpRight,
      trend: "positive",
      description: "This period",
    },
    {
      title: "Total Expenses",
      amount: totalExpenses,
      icon: ArrowDownRight,
      trend: "negative",
      description: "This period",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3 animate-fade-in">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className="p-6 bg-card hover:shadow-medium transition-all duration-300 animate-slide-up border-border"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </h3>
            <div
              className={`p-2 rounded-lg ${
                stat.trend === "positive"
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              <stat.icon className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <p
              className={`text-3xl font-bold ${
                stat.trend === "positive" ? "text-success" : stat.title === "Total Balance" && balance < 0 ? "text-destructive" : "text-foreground"
              }`}
            >
              ${Math.abs(stat.amount).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types/transaction";
import { Trash2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { format } from "date-fns";

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

export const TransactionList = ({
  transactions,
  onDeleteTransaction,
}: TransactionListProps) => {
  if (transactions.length === 0) {
    return (
      <Card className="p-12 text-center bg-card border-border">
        <p className="text-muted-foreground">No transactions yet. Add your first transaction above!</p>
      </Card>
    );
  }

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        Recent Transactions
      </h2>
      <div className="space-y-3">
        {sortedTransactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-4 flex-1">
              <div
                className={`p-2 rounded-lg ${
                  transaction.type === "income"
                    ? "bg-success/10 text-success"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {transaction.type === "income" ? (
                  <ArrowUpRight className="w-5 h-5" />
                ) : (
                  <ArrowDownRight className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">
                  {transaction.description}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {transaction.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(transaction.date), "MMM dd, yyyy")}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-lg font-bold ${
                    transaction.type === "income"
                      ? "text-success"
                      : "text-destructive"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}$
                  {transaction.amount.toFixed(2)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-4 hover:bg-destructive/10 hover:text-destructive"
              onClick={() => onDeleteTransaction(transaction.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

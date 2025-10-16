import { useState, useEffect } from "react";
import { Transaction } from "@/types/transaction";
import { Dashboard } from "@/components/Dashboard";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { CategoryChart } from "@/components/CategoryChart";
import { Wallet } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    toast.success("Transaction deleted");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden bg-gradient-mesh">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="container mx-auto px-4 py-8 relative">
          <header className="mb-12 text-center animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary rounded-xl shadow-medium">
                <Wallet className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Expense Tracker
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take control of your finances. Track every dollar, visualize your
              spending, and achieve your financial goals.
            </p>
          </header>

          <div className="space-y-8">
            <Dashboard transactions={transactions} />
            
            <div className="grid gap-8 lg:grid-cols-2">
              <TransactionForm onAddTransaction={handleAddTransaction} />
              <CategoryChart transactions={transactions} />
            </div>

            <TransactionList
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
            />
          </div>
        </div>
      </div>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border mt-12">
        <p>© 2025 Expense Tracker. Built with React & Vite.</p>
      </footer>
    </div>
  );
};

export default Index;

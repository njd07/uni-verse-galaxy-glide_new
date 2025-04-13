
import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useUniverse } from "@/contexts/UniverseContext";
import GradientText from "@/components/ui/GradientText";
import GlowingCard from "@/components/ui/GlowingCard";
import GradientButton from "@/components/ui/GradientButton";
import SectionTitle from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet, BarChart3, Piggy } from "lucide-react";

const SpendStar = () => {
  const { wallet, updateWallet, transactions, addTransaction } = useUniverse();
  
  const [topUpAmount, setTopUpAmount] = useState("");
  const [savingsGoal, setSavingsGoal] = useState(wallet.savingsGoal.toString());
  const [expenseData, setExpenseData] = useState({
    amount: "",
    shop: "",
    category: "Food",
  });
  const [budgetData, setBudgetData] = useState({
    monthly: wallet.budget.monthly.toString(),
    category: "Food",
    amount: "",
  });
  
  // Process data for pie chart
  const categoryTotals = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, transaction) => {
      const { category, amount } = transaction;
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {} as Record<string, number>);
  
  const pieChartData = Object.keys(categoryTotals).map(category => ({
    name: category,
    value: categoryTotals[category],
  }));
  
  const COLORS = ["#42C6FF", "#7B5CFA", "#F062E5", "#FFD700"];
  
  const handleTopUp = () => {
    if (!topUpAmount || isNaN(Number(topUpAmount)) || Number(topUpAmount) <= 0) return;
    
    addTransaction({
      amount: Number(topUpAmount),
      shop: "UPI Transfer",
      category: "Topup",
      date: new Date(),
      type: "topup",
    });
    
    setTopUpAmount("");
  };
  
  const handleAddExpense = () => {
    if (
      !expenseData.amount ||
      isNaN(Number(expenseData.amount)) ||
      Number(expenseData.amount) <= 0 ||
      !expenseData.shop
    )
      return;
    
    addTransaction({
      amount: Number(expenseData.amount),
      shop: expenseData.shop,
      category: expenseData.category,
      date: new Date(),
      type: "expense",
    });
    
    setExpenseData({
      amount: "",
      shop: "",
      category: "Food",
    });
  };
  
  const handleSetBudget = () => {
    if (!budgetData.monthly || isNaN(Number(budgetData.monthly)) || Number(budgetData.monthly) < 0) return;
    
    const updatedCategories = { ...wallet.budget.categories };
    
    if (budgetData.category && budgetData.amount && !isNaN(Number(budgetData.amount))) {
      updatedCategories[budgetData.category] = Number(budgetData.amount);
    }
    
    updateWallet({
      budget: {
        monthly: Number(budgetData.monthly),
        categories: updatedCategories,
      },
    });
    
    setBudgetData({
      monthly: budgetData.monthly,
      category: "Food",
      amount: "",
    });
  };
  
  const handleSetSavingsGoal = () => {
    if (!savingsGoal || isNaN(Number(savingsGoal)) || Number(savingsGoal) < 0) return;
    
    updateWallet({
      savingsGoal: Number(savingsGoal),
    });
  };
  
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <GradientText gradient="purple" element="h1" className="text-3xl md:text-4xl font-bold mb-2">
          💸 Orbit: SpendStar
        </GradientText>
        <p className="text-gray-400">Manage your finances with ease</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SectionTitle 
            title="Wallet" 
            gradient="purple" 
            description="Manage your campus wallet"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GlowingCard gradient="purple-pink" className="overflow-hidden mb-6">
              <div className="p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-universe-neonPurple rounded-full filter blur-3xl opacity-20 -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-universe-neonPink rounded-full filter blur-3xl opacity-20 -ml-10 -mb-10"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <Wallet className="w-8 h-8 text-white mr-2" />
                    <h3 className="text-xl font-semibold">Campus Wallet</h3>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm text-gray-400 mb-1">Available Balance</p>
                    <p className="text-3xl font-bold text-white">₹{wallet.balance.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <GradientButton gradient="purple-pink">
                          Top Up via UPI
                        </GradientButton>
                      </DialogTrigger>
                      <DialogContent className="bg-universe-card border-universe-neonPurple">
                        <DialogHeader>
                          <DialogTitle>Top Up Wallet</DialogTitle>
                          <DialogDescription>
                            Add money to your campus wallet
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="topup-amount">Amount (₹)</Label>
                            <Input
                              id="topup-amount"
                              type="number"
                              placeholder="Enter amount"
                              value={topUpAmount}
                              onChange={(e) => setTopUpAmount(e.target.value)}
                              className="bg-universe-dark border-universe-card"
                            />
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <GradientButton
                            gradient="purple-pink"
                            onClick={handleTopUp}
                            disabled={!topUpAmount || isNaN(Number(topUpAmount)) || Number(topUpAmount) <= 0}
                          >
                            Confirm
                          </GradientButton>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <GradientButton gradient="blue-purple">
                          View Transactions
                        </GradientButton>
                      </DialogTrigger>
                      <DialogContent className="bg-universe-card border-universe-neonPurple max-w-xl">
                        <DialogHeader>
                          <DialogTitle>Transaction History</DialogTitle>
                          <DialogDescription>
                            View your recent transactions
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="max-h-96 overflow-y-auto py-2">
                          {transactions.length === 0 ? (
                            <p className="text-center text-gray-400 py-6">No transactions yet</p>
                          ) : (
                            <div className="space-y-3">
                              {transactions.map((transaction) => (
                                <div 
                                  key={transaction.id}
                                  className="flex items-center justify-between p-3 rounded-lg bg-universe-dark border border-universe-card"
                                >
                                  <div className="flex items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                      transaction.type === "expense" 
                                        ? "bg-red-500 bg-opacity-20" 
                                        : "bg-green-500 bg-opacity-20"
                                    }`}>
                                      {transaction.type === "expense" ? (
                                        <ArrowDownRight className="w-5 h-5 text-red-400" />
                                      ) : (
                                        <ArrowUpRight className="w-5 h-5 text-green-400" />
                                      )}
                                    </div>
                                    <div className="ml-3">
                                      <p className="font-medium">{transaction.shop}</p>
                                      <p className="text-xs text-gray-400">
                                        {format(transaction.date, "MMM d, yyyy")}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className={`font-semibold ${
                                      transaction.type === "expense" 
                                        ? "text-red-400" 
                                        : "text-green-400"
                                    }`}>
                                      {transaction.type === "expense" ? "-" : "+"}₹{transaction.amount.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-gray-400">{transaction.category}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </GlowingCard>
          </motion.div>
          
          <SectionTitle 
            title="Savings" 
            gradient="purple" 
            description="Track your savings progress"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <GlowingCard gradient="purple" className="mb-6">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Piggy className="w-6 h-6 text-universe-neonPurple mr-2" />
                    <h3 className="font-semibold">Savings Goal</h3>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-sm border-universe-neonPurple text-universe-neonPurple">
                        Set Goal
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-universe-card border-universe-neonPurple">
                      <DialogHeader>
                        <DialogTitle>Set Savings Goal</DialogTitle>
                        <DialogDescription>
                          Set a target amount for your savings
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="savings-goal">Goal Amount (₹)</Label>
                          <Input
                            id="savings-goal"
                            type="number"
                            placeholder="Enter amount"
                            value={savingsGoal}
                            onChange={(e) => setSavingsGoal(e.target.value)}
                            className="bg-universe-dark border-universe-card"
                          />
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <GradientButton
                          gradient="purple"
                          onClick={handleSetSavingsGoal}
                          disabled={!savingsGoal || isNaN(Number(savingsGoal)) || Number(savingsGoal) < 0}
                        >
                          Save Goal
                        </GradientButton>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>₹{wallet.savedAmount} / ₹{wallet.savingsGoal}</span>
                  </div>
                  <div className="h-3 bg-universe-dark rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-universe-neonPurple to-universe-neonPink"
                      style={{ width: `${Math.min(100, (wallet.savedAmount / wallet.savingsGoal) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-400 italic">
                  Wallet usable only at campus shops
                </p>
              </div>
            </GlowingCard>
          </motion.div>
        </div>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="expenses" className="w-full">
            <TabsList className="mb-6 bg-universe-card">
              <TabsTrigger value="expenses" className="data-[state=active]:bg-universe-neonPurple data-[state=active]:text-white">
                Expenses
              </TabsTrigger>
              <TabsTrigger value="budget" className="data-[state=active]:bg-universe-neonPurple data-[state=active]:text-white">
                Budget
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="expenses" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <SectionTitle 
                    title="Recent Expenses" 
                    gradient="purple-pink" 
                    description="Track your spending"
                  />
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <GradientButton gradient="purple-pink" className="mb-4 w-full">
                        Add Expense
                      </GradientButton>
                    </DialogTrigger>
                    <DialogContent className="bg-universe-card border-universe-neonPurple">
                      <DialogHeader>
                        <DialogTitle>Add Expense</DialogTitle>
                        <DialogDescription>
                          Record a new expense
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="expense-amount">Amount (₹)</Label>
                          <Input
                            id="expense-amount"
                            type="number"
                            placeholder="Enter amount"
                            value={expenseData.amount}
                            onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                            className="bg-universe-dark border-universe-card"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="expense-shop">Shop/Vendor</Label>
                          <Input
                            id="expense-shop"
                            placeholder="Enter shop name"
                            value={expenseData.shop}
                            onChange={(e) => setExpenseData({ ...expenseData, shop: e.target.value })}
                            className="bg-universe-dark border-universe-card"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="expense-category">Category</Label>
                          <Select 
                            value={expenseData.category}
                            onValueChange={(value) => setExpenseData({ ...expenseData, category: value })}
                          >
                            <SelectTrigger className="bg-universe-dark border-universe-card">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent className="bg-universe-card border-universe-card">
                              <SelectItem value="Food">Food</SelectItem>
                              <SelectItem value="Stationery">Stationery</SelectItem>
                              <SelectItem value="Entertainment">Entertainment</SelectItem>
                              <SelectItem value="Others">Others</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <GradientButton
                          gradient="purple-pink"
                          onClick={handleAddExpense}
                          disabled={
                            !expenseData.amount || 
                            isNaN(Number(expenseData.amount)) || 
                            Number(expenseData.amount) <= 0 ||
                            !expenseData.shop
                          }
                        >
                          Add Expense
                        </GradientButton>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="max-h-96 overflow-y-auto space-y-3">
                    {transactions
                      .filter(t => t.type === "expense")
                      .slice(0, 5)
                      .map((transaction) => (
                        <motion.div
                          key={transaction.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <GlowingCard gradient="purple" className="hover:shadow-neon-purple">
                            <div className="p-3 flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-red-500 bg-opacity-20 flex items-center justify-center mr-3">
                                  <ArrowDownRight className="w-5 h-5 text-red-400" />
                                </div>
                                <div>
                                  <p className="font-medium">{transaction.shop}</p>
                                  <p className="text-xs text-gray-400">
                                    {format(transaction.date, "MMM d, yyyy")} • {transaction.category}
                                  </p>
                                </div>
                              </div>
                              <p className="text-lg font-semibold text-red-400">
                                -₹{transaction.amount.toFixed(2)}
                              </p>
                            </div>
                          </GlowingCard>
                        </motion.div>
                      ))}
                      
                    {transactions.filter(t => t.type === "expense").length === 0 && (
                      <p className="text-center text-gray-400 py-6">No expenses recorded yet</p>
                    )}
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <SectionTitle 
                    title="Spending by Category" 
                    gradient="purple-pink" 
                    description="See where your money goes"
                  />
                  
                  <GlowingCard gradient="purple" className="p-4 flex flex-col items-center">
                    {pieChartData.length > 0 ? (
                      <>
                        <div className="h-64 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                labelLine={false}
                              >
                                {pieChartData.map((entry, index) => (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={COLORS[index % COLORS.length]} 
                                  />
                                ))}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-4 w-full">
                          {pieChartData.map((entry, index) => (
                            <div key={entry.name} className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-full mr-2" 
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                              ></div>
                              <span className="text-sm">{entry.name}: ₹{entry.value.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="py-12 text-center">
                        <BarChart3 className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-400">No expense data to display</p>
                        <p className="text-sm text-gray-500">Add expenses to see spending by category</p>
                      </div>
                    )}
                  </GlowingCard>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="budget" className="space-y-6">
              <SectionTitle 
                title="Budget Management" 
                gradient="purple-pink" 
                description="Set and manage your monthly budget"
              />
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <GlowingCard gradient="purple-pink" className="mb-6">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <DollarSign className="w-6 h-6 text-universe-neonPurple mr-2" />
                        <h3 className="font-semibold">Monthly Budget</h3>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-2xl font-bold mb-2">₹{wallet.budget.monthly.toFixed(2)}</div>
                        
                        <div className="space-y-3 mt-4">
                          {Object.entries(wallet.budget.categories).map(([category, amount]) => (
                            <div key={category}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{category}</span>
                                <span>₹{amount.toFixed(2)}</span>
                              </div>
                              <div className="h-2 bg-universe-dark rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-universe-neonPurple to-universe-neonPink"
                                  style={{ 
                                    width: `${Math.min(
                                      100, 
                                      ((categoryTotals[category] || 0) / amount) * 100
                                    )}%` 
                                  }}
                                ></div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>Spent: ₹{(categoryTotals[category] || 0).toFixed(2)}</span>
                                <span>
                                  {Math.max(0, amount - (categoryTotals[category] || 0)).toFixed(2)} remaining
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </GlowingCard>
                </div>
                
                <div className="md:w-1/2">
                  <GlowingCard gradient="purple">
                    <div className="p-6">
                      <h3 className="font-semibold mb-4">Set Budget</h3>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="budget-monthly">Monthly Budget (₹)</Label>
                          <Input
                            id="budget-monthly"
                            type="number"
                            placeholder="Enter amount"
                            value={budgetData.monthly}
                            onChange={(e) => setBudgetData({ ...budgetData, monthly: e.target.value })}
                            className="bg-universe-dark border-universe-card"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="budget-category">Category Budget</Label>
                          <div className="flex space-x-2">
                            <Select 
                              value={budgetData.category}
                              onValueChange={(value) => setBudgetData({ ...budgetData, category: value })}
                            >
                              <SelectTrigger className="bg-universe-dark border-universe-card">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent className="bg-universe-card border-universe-card">
                                <SelectItem value="Food">Food</SelectItem>
                                <SelectItem value="Stationery">Stationery</SelectItem>
                                <SelectItem value="Entertainment">Entertainment</SelectItem>
                                <SelectItem value="Others">Others</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Input
                              type="number"
                              placeholder="Amount"
                              value={budgetData.amount}
                              onChange={(e) => setBudgetData({ ...budgetData, amount: e.target.value })}
                              className="bg-universe-dark border-universe-card"
                            />
                          </div>
                        </div>
                        
                        <GradientButton
                          gradient="purple"
                          onClick={handleSetBudget}
                          disabled={!budgetData.monthly || isNaN(Number(budgetData.monthly))}
                          className="w-full mt-4"
                        >
                          Save Budget
                        </GradientButton>
                      </div>
                    </div>
                  </GlowingCard>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SpendStar;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalculatorIcon,
  CurrencyDollarIcon,
  ScaleIcon,
  ClockIcon,
  CalendarIcon,
  ArrowRightIcon,
  TableCellsIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("13");
  const [loanTerm, setLoanTerm] = useState("");
  const [paymentsPerYear, setPaymentsPerYear] = useState("12");
  const [startDate, setStartDate] = useState("");
  const [extraPayments, setExtraPayments] = useState("");
  const [results, setResults] = useState(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [error, setError] = useState("");
  const [showTable, setShowTable] = useState(false);

  const calculateLoan = () => {
    // Reset states
    setError("");
    setResults(null);
    setAmortizationSchedule([]);
    setShowTable(false);

    // Parse inputs
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const termInYears = parseFloat(loanTerm);
    const paymentsPerYr = parseInt(paymentsPerYear);
    const extraPayment = extraPayments ? parseFloat(extraPayments) : 0;

    // Validate inputs
    if (isNaN(principal) || principal <= 0) {
      setError("Please enter a valid loan amount.");
      return;
    }
    if (isNaN(annualRate) || annualRate <= 0) {
      setError("Please enter a valid interest rate.");
      return;
    }
    if (isNaN(termInYears) || termInYears <= 0) {
      setError("Please enter a valid loan term.");
      return;
    }
    if (isNaN(paymentsPerYr) || paymentsPerYr <= 0) {
      setError("Please enter valid number of payments per year.");
      return;
    }

    // Calculate periodic values
    const totalPayments = termInYears * paymentsPerYr;
    const periodicRate = annualRate / paymentsPerYr;
    const paymentAmount =
      (principal * periodicRate * Math.pow(1 + periodicRate, totalPayments)) /
      (Math.pow(1 + periodicRate, totalPayments) - 1);

    // Generate amortization schedule
    let balance = principal;
    let totalInterest = 0;
    let actualPayments = 0;
    let schedule = [];
    let currentDate = startDate ? new Date(startDate) : new Date();

    while (balance > 0.01 && actualPayments < totalPayments * 2) {
      actualPayments++;

      // Calculate interest and principal for this period
      const interestPayment = balance * periodicRate;
      let principalPayment = paymentAmount - interestPayment;
      let totalPayment = paymentAmount;

      // Apply extra payment if specified
      if (extraPayment > 0) {
        principalPayment += extraPayment;
        totalPayment += extraPayment;
      }

      // Adjust final payment if it would overpay
      if (balance - principalPayment < 0) {
        principalPayment = balance;
        totalPayment = principalPayment + interestPayment;
      }

      // Update totals
      balance -= principalPayment;
      totalInterest += interestPayment;

      // Format date for display
      const paymentDate = new Date(currentDate);
      if (paymentsPerYr === 12) {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else if (paymentsPerYr === 4) {
        currentDate.setMonth(currentDate.getMonth() + 3);
      } else if (paymentsPerYr === 2) {
        currentDate.setMonth(currentDate.getMonth() + 6);
      } else if (paymentsPerYr === 1) {
        currentDate.setFullYear(currentDate.getFullYear() + 1);
      }

      // Add to schedule
      schedule.push({
        paymentNumber: actualPayments,
        date: paymentDate.toLocaleDateString(),
        payment: totalPayment.toFixed(2),
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        balance: Math.max(0, balance).toFixed(2),
      });

      // Break if balance is paid off
      if (balance <= 0.01) break;
    }

    // Calculate totals
    const totalPaid =
      paymentAmount * actualPayments + extraPayment * actualPayments;
    const totalEarlyPayments = extraPayment * actualPayments;

    setResults({
      scheduledPayment: paymentAmount.toFixed(2),
      actualPayment: (paymentAmount + extraPayment).toFixed(2),
      scheduledPayments: totalPayments,
      actualPayments: actualPayments,
      totalEarlyPayments: totalEarlyPayments.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalCost: totalPaid.toFixed(2),
      startDate: startDate || new Date().toLocaleDateString(),
    });

    setAmortizationSchedule(schedule);
    setShowTable(true);
  };

  const exportToCSV = () => {
    if (!amortizationSchedule.length) return;

    let csvContent =
      "Payment #,Date,Payment,Principal,Interest,Total Interest,Balance\n";

    amortizationSchedule.forEach((row) => {
      csvContent += `${row.paymentNumber},${row.date},${row.payment},${row.principal},${row.interest},${row.totalInterest},${row.balance}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "loan_amortization_schedule.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-20 lg:mt-24"
    >
      <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 text-white">
        <div className="flex items-center space-x-2">
          <CalculatorIcon className="w-6 h-6" />
          <h2 className="text-xl font-bold">Advanced Loan Calculator</h2>
        </div>
        <p className="text-sm opacity-90 mt-1">
          Calculate your loan payments with full amortization schedule
        </p>
      </div>

      <div className="p-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan amount
            </label>
            <div className="relative">
              <CurrencyDollarIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-700"
                placeholder="Enter loan amount"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual interest rate (%)
            </label>
            <div className="relative">
              <ScaleIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-700"
                placeholder="e.g., 13"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan period (in years)
            </label>
            <div className="relative">
              <ClockIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-700"
                placeholder="e.g., 5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of payments per year
            </label>
            <div className="relative">
              <CalendarIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <select
                value={paymentsPerYear}
                onChange={(e) => setPaymentsPerYear(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-700"
              >
                <option value="12">Monthly (12/year)</option>
                <option value="4">Quarterly (4/year)</option>
                <option value="2">Semi-annually (2/year)</option>
                <option value="1">Annually (1/year)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start date of loan
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Optional extra payments per period
            </label>
            <div className="relative">
              <CurrencyDollarIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={extraPayments}
                onChange={(e) => setExtraPayments(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-700"
                placeholder="Extra amount"
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 text-sm text-red-600"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Calculate Button */}
        <button
          onClick={calculateLoan}
          className="mt-6 w-full px-4 py-3 rounded-md text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 flex items-center justify-center space-x-2 font-medium"
        >
          <span>Calculate</span>
          <ArrowRightIcon className="w-5 h-5" />
        </button>

        {/* Results */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 border-t pt-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                Loan Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Scheduled payment</p>
                  <p className="text-xl font-bold text-blue-600">
                    ${results.scheduledPayment}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Actual payment</p>
                  <p className="text-xl font-bold text-blue-600">
                    ${results.actualPayment}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Loan start date</p>
                  <p className="text-lg font-medium text-gray-700">
                    {results.startDate}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Scheduled number of payments
                  </p>
                  <p className="text-xl font-bold text-blue-600">
                    {results.scheduledPayments}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Actual number of payments
                  </p>
                  <p className="text-xl font-bold text-blue-600">
                    {results.actualPayments}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total early payments</p>
                  <p className="text-xl font-bold text-blue-600">
                    ${results.totalEarlyPayments}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total interest</p>
                  <p className="text-xl font-bold text-red-600">
                    ${results.totalInterest}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total cost of loan</p>
                  <p className="text-xl font-bold text-green-600">
                    ${results.totalCost}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Interest savings</p>
                  <p className="text-xl font-bold text-green-600">
                    $
                    {(
                      parseFloat(results.scheduledPayment) *
                        results.scheduledPayments -
                      parseFloat(results.totalCost)
                    ).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Amortization Table Toggle */}
              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={() => setShowTable(!showTable)}
                  className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
                >
                  <TableCellsIcon className="w-5 h-5" />
                  <span>{showTable ? "Hide" : "Show"} Amortization Table</span>
                </button>

                {showTable && (
                  <button
                    onClick={exportToCSV}
                    className="px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 flex items-center space-x-2"
                  >
                    <DocumentTextIcon className="w-5 h-5" />
                    <span>Export to CSV</span>
                  </button>
                )}
              </div>

              {/* Amortization Table */}
              {showTable && (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment #
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Principal
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Interest
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Interest
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Balance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {amortizationSchedule.map((row, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {row.paymentNumber}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {row.date}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {row.payment} Birr
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {row.principal} Birr
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {row.interest} Birr
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {row.totalInterest} Birr
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {row.balance} Birr
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LoanCalculator;

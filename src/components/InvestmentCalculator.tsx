"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface InvestmentData {
  amount: number;
  share: number;
  profit15: number;
  profit30: number;
}

const investmentData: InvestmentData[] = [
  { amount: 25000, share: 0.25, profit15: 3750, profit30: 7500 },
  { amount: 50000, share: 0.50, profit15: 7500, profit30: 15000 },
  { amount: 75000, share: 0.75, profit15: 11250, profit30: 22500 },
  { amount: 100000, share: 1.00, profit15: 15000, profit30: 30000 },
  { amount: 125000, share: 1.25, profit15: 18750, profit30: 37500 },
  { amount: 150000, share: 1.50, profit15: 22500, profit30: 45000 },
  { amount: 175000, share: 1.75, profit15: 26250, profit30: 52500 },
  { amount: 200000, share: 2.00, profit15: 30000, profit30: 60000 }
];

export default function InvestmentCalculator() {
  const { t, language } = useLanguage();
  const [selectedAmount, setSelectedAmount] = useState(25000);
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }>;
  } | null>(null);



  useEffect(() => {
    const selected = investmentData.find(d => d.amount === selectedAmount);
    if (selected) {
      setChartData({
        labels: [
          language === 'hi' ? 'राजस्व: ₹15 लाख' : 'Revenue: ₹15 Lakhs',
          language === 'hi' ? 'राजस्व: ₹30 लाख' : 'Revenue: ₹30 Lakhs'
        ],
        datasets: [{
          label: language === 'hi' ? 'अनुमानित मासिक लाभ (भारतीय रुपया)' : 'Projected Monthly Profit (INR)',
          data: [selected.profit15, selected.profit30],
          backgroundColor: [
            'rgba(234, 88, 12, 0.5)',
            'rgba(234, 88, 12, 0.8)'
          ],
          borderColor: [
            'rgb(234, 88, 12)',
            'rgb(234, 88, 12)'
          ],
          borderWidth: 1
        }]
      });
    }
  }, [selectedAmount, language]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0,
          font: {
            size: 11
          }
        }
      },
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        ticks: {
          callback: function(this: unknown, tickValue: string | number) {
            const value = typeof tickValue === 'string' ? parseFloat(tickValue) : tickValue;
            return '₹' + value.toLocaleString('en-IN');
          },
          font: {
            size: 11
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: { dataset: { label?: string }; parsed: { y: number | null } }) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += '₹' + context.parsed.y.toLocaleString('en-IN');
            }
            return label;
          }
        }
      }
    }
  };

  const selectedInvestment = investmentData.find(d => d.amount === selectedAmount);

  return (
    <section className="mb-16 bg-amber-50 dark:bg-neutral-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-md border border-amber-200 dark:border-neutral-700">
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{t('investment.calculator.title')}</h2>
        <p className="text-amber-700 dark:text-neutral-400 text-sm sm:text-base">
          {t('investment.calculator.subtitle')}
        </p>
      </div>

      <div className="mb-6 sm:mb-8">
        <label className="text-center block font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
          {t('investment.calculator.select')}
        </label>
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-3">
          {investmentData.map((data) => (
            <button
              key={data.amount}
              onClick={() => setSelectedAmount(data.amount)}
              className={`px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 text-xs sm:text-sm md:text-base font-medium rounded-md transition-colors duration-200 border ${
                selectedAmount === data.amount
                  ? 'bg-orange-600 text-white border-orange-600'
                  : 'bg-amber-100 dark:bg-neutral-700 text-amber-900 dark:text-neutral-200 border-amber-300 dark:border-neutral-600 hover:bg-amber-200 dark:hover:bg-orange-900/20 hover:border-orange-300'
              }`}
            >
              ₹{data.amount.toLocaleString('en-IN')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
        <div className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center mb-4 sm:mb-6">
            <div className="bg-amber-100 dark:bg-neutral-700 p-3 sm:p-4 rounded-lg">
              <h4 className="text-xs sm:text-sm font-semibold text-amber-700 dark:text-neutral-400">
                {t('investment.calculator.profitShare')}
              </h4>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600">
                {selectedInvestment?.share.toFixed(2)}%
              </p>
            </div>
            <div className="bg-amber-100 dark:bg-neutral-700 p-3 sm:p-4 rounded-lg">
              <h4 className="text-xs sm:text-sm font-semibold text-amber-700 dark:text-neutral-400">
                {t('investment.calculator.potentialROI')}
              </h4>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600">
                up to 200%
              </p>
              <p className="text-xs text-amber-700 dark:text-neutral-400">
                {t('investment.calculator.roiTime')}
              </p>
            </div>
          </div>
          <div className="bg-amber-100 dark:bg-neutral-700 p-3 sm:p-4 rounded-lg text-center">
            <h4 className="text-xs sm:text-sm font-semibold text-amber-700 dark:text-neutral-400">
              {t('investment.calculator.commencement')}
            </h4>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-orange-600">
              {t('investment.calculator.commencementTime')}
            </p>
            <p className="text-xs text-amber-700 dark:text-neutral-400">
              {t('investment.calculator.fromInvestment')}
            </p>
          </div>
        </div>
        <div className="order-1 lg:order-2 h-[250px] sm:h-[300px] md:h-[350px] w-full">
          {chartData && <Bar data={chartData} options={chartOptions} />}
        </div>
      </div>
    </section>
  );
}

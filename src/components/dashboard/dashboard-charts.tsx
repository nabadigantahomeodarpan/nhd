"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Activity, UserPlus } from "lucide-react";

interface ChartData {
  date: string;
  visits: number;
  registrations: number;
}

interface DashboardChartsProps {
  data: ChartData[];
}

export function DashboardCharts({ data }: DashboardChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      
      {/* Visits Chart */}
      <div className="bg-card rounded-2xl border border-border/60 shadow-sm flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              Patient <span className="font-[family-name:--font-playfair] italic text-primary">Visits</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-1">Visits over the last 7 days</p>
          </div>
          <div className="p-2.5 bg-primary/10 rounded-xl hidden sm:block">
            <Activity className="h-6 w-6 text-primary" />
          </div>
        </div>
        
        <div className="rounded-xl border border-border/60 shadow-sm overflow-hidden p-4 pt-6 h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="color-mix(in oklab, var(--muted-foreground) 20%, transparent)" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--card)' }}
                itemStyle={{ color: 'var(--foreground)', fontSize: '12px' }}
                labelStyle={{ color: 'var(--muted-foreground)', fontSize: '12px', marginBottom: '4px' }}
              />
              <Line 
                type="monotone" 
                dataKey="visits" 
                stroke="var(--primary)" 
                strokeWidth={3} 
                dot={{ r: 4, strokeWidth: 2, fill: "var(--card)" }} 
                activeDot={{ r: 6, strokeWidth: 0, fill: "var(--primary)" }}
                name="Visits"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Registrations Chart */}
      <div className="bg-card rounded-2xl border border-border/60 shadow-sm flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              New <span className="font-[family-name:--font-playfair] italic text-primary">Registrations</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-1">Patients registered in the last 7 days</p>
          </div>
          <div className="p-2.5 bg-primary/10 rounded-xl hidden sm:block">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
        </div>
        
        <div className="rounded-xl border border-border/60 shadow-sm overflow-hidden p-4 pt-6 h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="color-mix(in oklab, var(--muted-foreground) 20%, transparent)" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} 
              />
              <Tooltip 
                cursor={{ fill: 'color-mix(in oklab, var(--muted) 50%, transparent)' }}
                contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--card)' }}
                itemStyle={{ color: 'var(--foreground)', fontSize: '12px' }}
                labelStyle={{ color: 'var(--muted-foreground)', fontSize: '12px', marginBottom: '4px' }}
              />
              <Bar 
                dataKey="registrations" 
                fill="var(--primary)" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={40}
                name="New Patients"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}

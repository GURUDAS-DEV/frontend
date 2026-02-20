"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart3, RefreshCw } from "lucide-react";

type Item = {
  item_code: string;
  total_orders: number;
  total_quantity: number;
};

type Category = {
  category: string;
  total_orders: number;
  total_quantity: number;
  items: Item[];
};

export default function AnalyticsPage() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"category" | "sort">("category");
  const [order, setOrder] = useState<"highest" | "lowest">("highest");

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      let url = "";

      if (mode === "category") {
        url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/analytics/category`;
      } else {
        url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/analytics/sort?order=${order}`;
      }

      const res = await axios.get(url);

      setData(res.data.data || []);
    } catch (error) {
      console.error("Error fetching analytics", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [mode, order]);

  return (
    <div className="flex flex-1 flex-col p-4 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <BarChart3 className="w-6 h-6" />
          Analytics
        </h1>

        <div className="flex gap-2 flex-wrap">
          {/* Mode Toggle */}
          <button
            onClick={() => setMode("category")}
            className={`px-3 py-2 rounded-lg text-sm ${
              mode === "category" ? "bg-black text-white" : "bg-white border"
            }`}
          >
            Category
          </button>

          <button
            onClick={() => setMode("sort")}
            className={`px-3 py-2 rounded-lg text-sm ${
              mode === "sort" ? "bg-black text-white" : "bg-white border"
            }`}
          >
            Sort
          </button>

          {/* Sort Toggle */}
          {mode === "sort" && (
            <>
              <button
                onClick={() => setOrder("highest")}
                className={`px-3 py-2 rounded-lg text-sm ${
                  order === "highest"
                    ? "bg-black text-white"
                    : "bg-white border"
                }`}
              >
                Highest
              </button>

              <button
                onClick={() => setOrder("lowest")}
                className={`px-3 py-2 rounded-lg text-sm ${
                  order === "lowest"
                    ? "bg-black text-white"
                    : "bg-white border"
                }`}
              >
                Lowest
              </button>
            </>
          )}

          {/* Refresh */}
          <button
            onClick={fetchAnalytics}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500">Loading analytics...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        <div className="space-y-6">
          {data.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm border"
            >
              {/* Category Header */}
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {category.category}
                  </p>
                </div>

                <div className="flex gap-6 text-sm">
                  <div>
                    <p className="text-gray-500">Orders</p>
                    <p className="font-medium">
                      {category.total_orders}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Quantity</p>
                    <p className="font-medium">
                      {category.total_quantity}
                    </p>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.items.map((item, i) => (
                  <div
                    key={i}
                    className="border rounded-lg p-3 bg-gray-50"
                  >
                    <p className="text-sm text-gray-500">Item</p>
                    <p className="font-medium text-gray-900">
                      {item.item_code}
                    </p>

                    <div className="flex justify-between mt-2 text-sm">
                      <span>{item.total_orders} orders</span>
                      <span>{item.total_quantity} qty</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

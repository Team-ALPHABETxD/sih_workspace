"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RecentsPage() {
  const reports = [
    { id: 1, title: "Report 1", date: "2023-10-01" },
    { id: 2, title: "Report 2", date: "2023-09-28" },
    { id: 3, title: "Report 3", date: "2023-09-25" },
    { id: 4, title: "Report 4", date: "2023-09-20" },
    { id: 5, title: "Report 5", date: "2023-09-18" },
    { id: 6, title: "Report 6", date: "2023-09-15" },
    { id: 7, title: "Report 7", date: "2023-09-12" },
    { id: 8, title: "Report 8", date: "2023-09-10" },
    { id: 9, title: "Report 9", date: "2023-09-05" },
  ];

  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-6 p-6 md:p-10 overflow-y-auto bg-gray-50 text-gray-900">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Recent Reports
      </h1>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.slice(0, visibleCount).map((report) => (
          <Card key={report.id} className="shadow-md border rounded-2xl">
            <CardHeader>
              <CardTitle>{report.title}</CardTitle>
              <CardDescription>Generated on: {report.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Summary or description for {report.title} can go here.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full rounded-full text-white"
                style={{ backgroundColor: "#FFB07C" }} // peach color
              >
                View Report
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < reports.length && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleLoadMore}
            className="rounded-full bg-gray-800 hover:bg-gray-900 text-white px-6"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

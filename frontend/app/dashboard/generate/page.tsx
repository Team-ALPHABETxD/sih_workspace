"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Radix Dropdown Menu
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function GeneratePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    lat: "",
    lon: "",
    cd: "",
    cr: "",
    pb: "",
    fe: "",
    co: "",
    mn: "",
    ni: "",
    cu: "",
    zn: "",
    source: "",
    units: {
      cd: "mg/L",
      cr: "mg/L",
      pb: "mg/L",
      fe: "mg/L",
      co: "mg/L",
      mn: "mg/L",
      ni: "mg/L",
      cu: "mg/L",
      zn: "mg/L",
    } as Record<string, string>, // default unit is mg/L for all metals
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      units: { ...formData.units, [name]: value },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login to generate a report.");
      return;
    }

    setLoading(true);

    // Prepare data
    const coords = {
      lat: parseFloat(formData.lat),
      lon: parseFloat(formData.lon),
    };

    const hms = Object.keys(metalLabels).map((metal) => ({
      name: metal,
      val: parseFloat((formData as any)[metal]),
      unit: formData.units[metal],
    }));

    const src = 0;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/server/v1/apis/report/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ coords, hms, src }),
      });

      const data = await res.json();

      if (res.ok && data.flag === "success") {
        toast.success("Report generated successfully!");
        // Redirect to the new report page with report data
        const reportData = encodeURIComponent(JSON.stringify(data.report));
        router.push(`/dashboard/generate/report?reportData=${reportData}`);
      } else {
        toast.error(data.msg || "Failed to generate report.");
      }
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("An error occurred while generating the report.");
    } finally {
      setLoading(false);
    }
  };

  // Dropdown Component (with selected unit showing)
  const UnitDropdown = ({ field }: { field: string }) => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center justify-between rounded border px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200">
          {formData.units[field] || "Unit"}{" "}
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="rounded bg-white shadow-md p-2">
        {["g/L", "mg/L", "ppm"].map((unit) => (
          <DropdownMenu.Item
            key={unit}
            className="cursor-pointer rounded px-2 py-1 text-sm hover:bg-gray-100"
            onClick={() => handleDropdownChange(field, unit)}
          >
            {unit}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );

  const SourceDropdown = () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center justify-between rounded border px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200">
          {formData.source || "Choose"} <ChevronDown className="ml-2 h-4 w-4" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="rounded bg-white shadow-md p-2">
        {["Lake", "Canal", "River", "Tap"].map((src) => (
          <DropdownMenu.Item
            key={src}
            className="cursor-pointer rounded px-2 py-1 text-sm hover:bg-gray-100"
            onClick={() => setFormData({ ...formData, source: src })}
          >
            {src}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );

  // Map metals to correct display names
  const metalLabels: Record<string, string> = {
    cd: "Cd",
    cr: "Cr",
    pb: "Pb",
    fe: "Fe",
    co: "Co",
    mn: "Mn",
    ni: "Ni",
    cu: "Cu",
    zn: "Zn",
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 p-6 md:p-10 overflow-y-auto bg-gray-50 text-gray-900">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Generate your report significantly...
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Coords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["lat", "lon"].map((coord) => (
            <div key={coord} className="flex flex-col gap-2">
              <label className="text-gray-700 flex items-center gap-2 capitalize">
                <div className="w-4 h-4 bg-gray-400 rounded"></div> {coord}
              </label>
              <div className="flex gap-2">
                <Input
                  className="w-2/3"
                  type="number"
                  step="any"
                  name={coord}
                  value={(formData as any)[coord]}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          ))}
        </div>

        {/* Heavy Metals + Source */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(metalLabels).map((metal) => (
            <div key={metal} className="flex flex-col gap-2">
              <label className="text-gray-700 flex items-center gap-2 capitalize">
                <div className="w-4 h-4 bg-gray-400 rounded"></div> {metalLabels[metal]} value
              </label>
              <div className="flex gap-2">
                <Input
                  className="w-2/3"
                  type="number"
                  step="any"
                  name={metal}
                  value={(formData as any)[metal]}
                  onChange={handleChange}
                  required
                />
                <UnitDropdown field={metal} />
              </div>
            </div>
          ))}

          {/* Source Dropdown (inside grid now) */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Source</label>
            <SourceDropdown />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded text-sm font-medium shadow-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
            onSubmit={handleSubmit}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Generating Report...</span>
              </div>
            ) : (
              "Generate"
            )}
          </button>
        </div>
      </form>


    </div>
  );
}

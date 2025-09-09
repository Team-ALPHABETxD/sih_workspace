"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

// Radix Dropdown Menu
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function GeneratePage() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      units: { ...formData.units, [name]: value },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Report Data:", formData);
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
            className="px-6 py-2 rounded bg-black text-white text-sm font-medium shadow-md hover:bg-gray-800"
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  );
}

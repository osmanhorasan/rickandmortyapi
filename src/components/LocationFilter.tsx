
"use client"; 

import React, { useEffect, useState } from "react";
import { Select, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

const { Option } = Select;

interface Location {
  id: number;
  name: string;
}

interface LocationFilterProps {
  currentLocation: string | null;
}

const LocationFilter: React.FC<LocationFilterProps> = ({ currentLocation }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "https://rickandmortyapi.com/api/location"
        );
        const data = await response.json();
        setLocations(data.results);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("location", value);

    router.push(`/?${params.toString()}`);
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <Select
      defaultValue={currentLocation || "All Locations"}
      style={{ width: 200 }}
      onChange={handleLocationChange}
    >
      <Option value="">All Locations</Option>
      {locations.map((loc) => (
        <Option key={loc.id} value={loc.name}>
          {loc.name}
        </Option>
      ))}
    </Select>
  );
};

export default LocationFilter;

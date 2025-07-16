"use client";

import { useState, useEffect } from "react";
import { Country } from "../../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { toast } from "react-hot-toast";

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  value,
  onChange,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag"
        );
        const sortedCountries = response.data
          .filter((country: Country) => country.idd?.root)
          .sort((a: Country, b: Country) =>
            a.name.common.localeCompare(b.name.common)
          );
        setCountries(sortedCountries);
      } catch (error) {
        toast.error("Failed to load countries");
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const getDialCode = (country: Country): string => {
    return country.idd.root + (country.idd.suffixes?.[0] || "");
  };

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue
          placeholder={loading ? "Loading countries..." : "Select country"}
        />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={getDialCode(country)} value={getDialCode(country)}>
            <div className="flex items-center gap-2">
              <span>{country.flag}</span>
              <span>{country.name.common}</span>
              <span className="text-gray-500">({getDialCode(country)})</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

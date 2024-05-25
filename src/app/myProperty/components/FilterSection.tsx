"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

import { PropertyZodSchemaType } from "@/zodSchema/propertyZodSchema";
import MyCard from "@/components/MyCard";
import Pagination from "@/components/pagination";

const FilterSection = ({
  propertyData,
}: {
  propertyData: PropertyZodSchemaType[];
}) => {

  const [newPropertyData, setNewPropertyData] = useState(propertyData);

  const allCity = Array.from(new Set(propertyData.map((p) => p.address.city)));
  const allState = Array.from(
    new Set(propertyData.map((p) => p.address.state))
  );
  const bhkOptions = Array.from(new Set(propertyData.map((p) => p.bedrooms)));

  const [selectedCities, setSelectedCities] = useState<string | null>(null);
  const [selectedStates, setSelectedStates] = useState<string | null>(null);
  const [selectedBHK, setSelectedBHK] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPge, SetPostsPerPage] = useState(3);

  const handleBHKChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const bhk = parseInt(e.target.value);
    if (selectedBHK.includes(bhk)) {
      setSelectedBHK(selectedBHK.filter((el) => el !== bhk));
    } else {
      setSelectedBHK([...selectedBHK, bhk]);
    }
  };

  useEffect(() => {
    filterProperties();
  }, [selectedCities, selectedStates, selectedBHK]);

  const filterProperties = () => {
    let tempProperties = propertyData;

    if (selectedCities) {
      tempProperties = tempProperties.filter(
        (property) => selectedCities === property.address.city
      );
    }

    if (selectedStates) {
      tempProperties = tempProperties.filter(
        (property) => selectedStates === property.address.state
      );
    }

    if (selectedBHK.length > 0) {
      tempProperties = tempProperties.filter((property) =>
        selectedBHK.includes(property.bedrooms)
      );
    }
    setCurrentPage(1);
    setNewPropertyData(tempProperties);
  };

  const indexOfLastPost = currentPage * postsPerPge;
  const indexOfFirstPost = indexOfLastPost - postsPerPge;

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-row">
      <div className="w-1/4 p-4">
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Cities</h3>
          <select
            value={selectedCities || ""}
            onChange={(e) => setSelectedCities(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select City</option>
            {allCity.map((city, idx) => (
              <option key={`city-${idx}`} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">States</h3>
          <select
            value={selectedStates || ""}
            onChange={(e) => setSelectedStates(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select State</option>
            {allState.map((state, idx) => (
              <option key={`state-${idx}`} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">BHK</h3>
          <div className="flex flex-wrap gap-4">
            {bhkOptions.map((bhk, idx) => (
              <div key={`bhk-${idx}`} className="flex items-center">
                <input
                  type="checkbox"
                  value={bhk}
                  checked={selectedBHK.includes(bhk)}
                  onChange={handleBHKChange}
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label className="ml-2">{bhk} BHK</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Button
            onClick={() => {
              setSelectedCities(null);
              setSelectedStates(null);
              setSelectedBHK([]);
            }}
            className="w-full px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-800"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      <div className="w-3/4 p-4">
        {newPropertyData.length !== 0 ? (
          <div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newPropertyData
                .slice(indexOfFirstPost, indexOfLastPost)
                .map((item: PropertyZodSchemaType, index) => (
                  <div key={index} className="p-4">
                    <MyCard propertyData={item} />
                  </div>
                ))}
            </div>
            <div>
              <Pagination
                length={newPropertyData.length}
                postsPerPage={postsPerPge}
                handlePagination={handlePagination}
                currentPage={currentPage}
              />
            </div>
          </div>
        ) : (
          <div>No properties to display</div>
        )}
      </div>
    </div>
  );
};

export default FilterSection;

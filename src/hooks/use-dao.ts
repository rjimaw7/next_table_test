/* eslint-disable prefer-const */
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

import type { GetOrdersPayload, PatientData, UpdatePatientDataPayload } from '@/lib/interfaces';

// Define a function to simulate pagination and limit
const paginateAndLimitData = (data: PatientData[], page: number, limit: number): PatientData[] => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return data.slice(startIndex, endIndex);
};

export const useDao = () => {
  const getOrders = async (payload: GetOrdersPayload, showExactMatchesOnly: boolean) => {
    let allData: PatientData[];

    // Check if data is available in session storage
    const storedData = sessionStorage.getItem('ordersData');
    if (storedData) {
      // If data is available, parse it and use it
      allData = JSON.parse(storedData);
    } else {
      // If data is not available, fetch it from the server
      const response = await axios.get('/db/dummy.json');
      allData = response.data;

      // Store the fetched data in session storage for future use
      sessionStorage.setItem('ordersData', JSON.stringify(allData));
    }

    // Apply sorting if sort parameter is provided
    if (payload.sort) {
      const sortKeys = Object.keys(payload.sort);
      sortKeys.forEach((sortColumn) => {
        const sortOrder = payload.sort![sortColumn];
        allData.sort((a, b) => {
          const order = sortOrder === 'asc' ? 1 : -1;
          // Type assertion to ensure sortColumn is a valid key of PatientData
          return (a as any)[sortColumn].localeCompare((b as any)[sortColumn]) * order;
        });
      });
    }

    // Filter data based on search query
    let filteredData = payload.searchQuery
      ? allData.filter((item) => {
          const searchQueryLower = payload.searchQuery!.toLowerCase();
          const matchesPatientName = item.patient_name.toLowerCase().includes(searchQueryLower);
          const matchesDoctorName = item.doctor_name.toLowerCase().includes(searchQueryLower);
          const matchesId = item.id.toLowerCase().includes(searchQueryLower);
          return matchesPatientName || matchesDoctorName || matchesId;
        })
      : allData;

    // If "Show Exact Matches Only" option is enabled, filter further
    if (showExactMatchesOnly && payload.searchQuery) {
      const searchQueryLower = payload.searchQuery.toLowerCase();
      filteredData = filteredData.filter((item) => {
        const exactMatchPatientName = item.patient_name.toLowerCase() === searchQueryLower;
        const exactMatchDoctorName = item.doctor_name.toLowerCase() === searchQueryLower;
        const exactMatchId = item.id.toLowerCase() === searchQueryLower;
        return exactMatchPatientName || exactMatchDoctorName || exactMatchId;
      });
    }

    // Simulate pagination and limit
    const paginatedAndLimitedData = paginateAndLimitData(filteredData, payload.page, payload.limit);

    // Calculate total number of items
    const total = filteredData.length;

    return { data: paginatedAndLimitedData, total };
  };

  const updateSingleOrder = async (id: string, payload: UpdatePatientDataPayload) => {
    // Fetch the current data from the server
    const response = await axios.get('/db/dummy.json');
    let orders: any = response.data;

    // Find the index of the order with the specified id
    const index = orders.findIndex((order: any) => order.id === id);

    if (index !== -1) {
      // Update the fields specified in the payload
      orders[index].patient_name = payload.patient_name || orders[index].patient_name;
      orders[index].patient_phone = payload.patient_phone || orders[index].patient_phone;
      orders[index].doctor_phone = payload.doctor_phone || orders[index].doctor_phone;
      orders[index].status = payload.status || orders[index].status;
      orders[index].notes = payload.notes || orders[index].notes;

      // Update session storage with the updated data
      sessionStorage.setItem('ordersData', JSON.stringify(orders));
    }

    // Assuming successful update
    return 'Record Updated';
  };

  return { getOrders, updateSingleOrder };
};

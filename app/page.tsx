"use client";

import React, { useState, useEffect, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(15);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  function debounce(callback: (searchValue: string) => void, delay: number) {
    let timerId: any;
    // @ts-expect-error
    return (...args) => {
      if (timerId) clearTimeout(timerId);
      // @ts-expect-error
      timerId = setTimeout(() => callback(...args), delay);
    };
  }

  const handleListUpdate = async (searchValue: string) => {
    setCurrentPage(1);
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${searchValue}&sortBy=title&order=asc&limit=${productsPerPage}&skip=0&select=title,price,description,thumbnail`
        );
        const data = await response.json();
        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  };

  const debounceHandleListUpdate = useCallback(
    debounce(handleListUpdate, 500),
    []
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${searchText}&sortBy=title&order=asc&limit=${productsPerPage}&skip=${
            (currentPage - 1) * productsPerPage
          }&select=title,price,description,thumbnail`
        );
        const data = await response.json();
        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, productsPerPage]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const generatePagination = () => {
    let pages = [];
    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }
    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <React.Fragment>
      <Navbar />
      <main className="max-w-[100rem] min-h-[100vh] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8 text-center">Product Listing</h1>
        <div className="flex justify-center mb-4">
          <input
            placeholder="Search..."
            className="max-w-[100rem] w-[90%] px-4 py-2 font-medium bg-transparent border-2 border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              debounceHandleListUpdate(e.target.value);
            }}
          />
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader"></div>
          </div>
        ) : (
          <React.Fragment>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="flex justify-center my-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
              >
                Previous
              </button>
              {generatePagination().map((page, index) =>
                typeof page === "number" ? (
                  <button
                    key={index}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 mx-1 rounded ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-black hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                ) : (
                  <span key={index} className="px-4 py-2 mx-1">
                    ...
                  </span>
                )
              )}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
              >
                Next
              </button>
            </div>
          </React.Fragment>
        )}
      </main>
    </React.Fragment>
  );
}

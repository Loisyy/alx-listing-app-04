"use client";

import React, { useEffect, useState } from 'react';
import { Star, Bed, Droplet, Users } from 'lucide-react';
import Pill from '@/components/common/Pill';
import { HERO_BACKGROUND_IMAGE, FILTERS, PROPERTYLISTINGSAMPLE } from '@/constants';
import { PropertyProps } from '@/interfaces';
import axios from 'axios';

const HomePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/properties`);
        setProperties(response.data);
      }
      catch (error) {
        console.error("Error fetching properties:", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [])
  
  if(loading) {
    return (
      <div className="flex items-center justify-center h-screen"> 
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section 
        className="relative h-[400px] flex items-center justify-center text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BACKGROUND_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl font-bold mb-4">Find your favorite place here!</h1>
          <p className="text-xl">The best prices for over 2 million properties worldwide</p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {FILTERS.map((filter) => (
              <Pill
                key={filter}
                label={filter}
                isActive={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              />
            ))}
          </div>
          <div className="flex items-center gap-4 ml-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition">
              <span className="text-sm font-medium">Filter</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="text-sm font-medium border-none focus:outline-none cursor-pointer">
                <option>Highest Price</option>
                <option>Lowest Price</option>
                <option>Highest Rating</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Property Listings Section */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property: PropertyProps) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  );
};

interface PropertyCardProps {
  property: PropertyProps;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="group cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {property.discount && (
          <div className="absolute top-3 left-3 bg-[#34a18f] text-white px-3 py-1 rounded-full text-xs font-semibold">
            {property.discount}% Off
          </div>
        )}
        {/* Category Tags */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          {property.category.slice(0, 2).map((cat: string, idx: number) => (
            <span key={idx} className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Property Info */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base line-clamp-1">{property.name}</h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{property.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          {property.address.city}, {property.address.country}
        </p>

        {/* Offers */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{property.offers.bed}</span>
          </div>
          <div className="flex items-center gap-1">
            <Droplet className="w-4 h-4" />
            <span>{property.offers.shower}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{property.offers.occupants}</span>
          </div>
        </div>

        <div className="pt-1">
          <span className="text-lg font-bold">${property.price}</span>
          <span className="text-sm text-gray-500">/night</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
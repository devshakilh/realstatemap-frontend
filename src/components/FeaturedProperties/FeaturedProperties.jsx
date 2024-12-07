



import  { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';
import { Bed, Bath, Square, Heart, MapPin } from 'lucide-react';
import './FeaturedProperties.css';

const properties = [
  {
    id: 1,
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    price: "$2,500,000",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80",
    beds: 5,
    baths: 4,
    sqft: 4200
  },
  {
    id: 2,
    title: "Luxury Penthouse",
    location: "Manhattan, NY",
    price: "$3,200,000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
    beds: 3,
    baths: 3,
    sqft: 2800
  },
  {
    id: 3,
    title: "Waterfront Estate",
    location: "Miami Beach, FL",
    price: "$4,800,000",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
    beds: 6,
    baths: 5,
    sqft: 5500
  },
  {
    id: 4,
    title: "Beachfront Cottage",
    location: "Maui, HI",
    price: "$1,850,000",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80",
    beds: 4,
    baths: 3,
    sqft: 3200
  },
  {
    id: 5,
    title: "Mountain Retreat",
    location: "Aspen, CO",
    price: "$3,000,000",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80",
    beds: 5,
    baths: 4,
    sqft: 4000
  }
];

const SkeletonCard = () => (
  <div className="property-card skeleton">
    <div className="property-image-wrapper skeleton-image"></div>
    <div className="property-info">
      <div className="skeleton-text skeleton-title"></div>
      <div className="skeleton-text skeleton-location"></div>
      <div className="skeleton-details">
        <div className="skeleton-detail"></div>
        <div className="skeleton-detail"></div>
        <div className="skeleton-detail"></div>
      </div>
      <div className="skeleton-price"></div>
    </div>
  </div>
);

const FeaturedProperties = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000, // Time between slides (in ms)
    speed: 500, // Speed of the slide transition (in ms)
    slidesToShow: 3, // Always show 3 slides on larger screens
    slidesToScroll: 1,
    dots: true, // Display navigation dots
    arrows: true, // Display previous and next arrows
    nextArrow: <div className="slick-next"></div>,
    prevArrow: <div className="slick-prev"></div>,
    responsive: [
      {
        breakpoint: 1024, // For larger screens
        settings: {
          slidesToShow: 3, // Show 3 slides at once
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640, // For smaller screens
        settings: {
          slidesToShow: 1, // Show 1 slide at a time
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className="featured-properties-section" id="properties">
      <div className="featured-properties-container">
        <div className="featured-properties-header">
          <h2>Featured Properties</h2>
        </div>

        {loading ? (
          <div className="featured-properties-slider">
            {Array(3) // Adjust number based on skeletons to display
              .fill(0)
              .map((_, index) => (
                <SkeletonCard key={index} />
              ))}
          </div>
        ) : (
          <Slider {...settings} className="featured-properties-slider">
            {properties.map((property) => (
              <div key={property.id} className="property-card">
                <div className="property-image-wrapper">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="property-image"
                  />
                  <button className="property-heart-button">
                    <Heart className="h-5 w-5 text-red-500" />
                  </button>
                </div>
                <div className="property-info">
                  <h3 className="property-title">{property.title}</h3>
                  <p className="property-location">
                    <MapPin className="icon" />
                    {property.location}
                  </p>
                  <div className="property-details">
                    <div className="detail-item">
                      <Bed className="icon" />
                      {property.beds} beds
                    </div>
                    <div className="detail-item">
                      <Bath className="icon" />
                      {property.baths} baths
                    </div>
                    <div className="detail-item">
                      <Square className="icon" />
                      {property.sqft} sqft
                    </div>
                  </div>
                  <div className="property-price">{property.price}</div>
                  <button className="property-button">View Details</button>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaShoppingCart, FaRegHeart, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`).then((response) => {
      const { sellerEmail, status, stock, ...productData } = response.data;
      setProduct(productData);
    });
  }, [id]);

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-start bg-gray-100 rounded-3xl shadow-lg">
      
      {/* Left Section - Image Gallery */}
      <div className="sticky top-10 w-full md:w-[500px]">
        <Swiper
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination, Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          className="rounded-xl shadow-lg"
        >
          {product.images.map((img, index) => (
            <SwiperSlide key={index}>
              <motion.img
                src={img.startsWith("http") ? img : `http://localhost:5000/uploads/${img}`}
                alt={`Product ${index + 1}`}
                className="w-full h-[500px] object-cover rounded-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail Swiper */}
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress
          className="mt-4 rounded-lg"
        >
          {product.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img.startsWith("http") ? img : `http://localhost:5000/uploads/${img}`}
                alt={`Thumbnail ${index + 1}`}
                className="w-24 h-24 object-cover rounded-lg cursor-pointer border border-gray-300 hover:border-purple-500"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Right Section - Product Details */}
      <motion.div
        className="w-full space-y-6 bg-white p-10 rounded-xl shadow-md"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-purple-700">{product.name}</h1>
        <p className="text-lg text-gray-600">{product.overview}</p>

        {/* Ratings */}
        <div className="flex items-center space-x-2 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < product.rating ? "text-yellow-500" : "text-gray-300"} />
          ))}
          <span className="text-gray-500">({product.rating}/5)</span>
        </div>

        {/* Features */}
        <div className="bg-gray-100 p-5 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800">Features:</h2>
          <ul className="list-disc ml-5 text-gray-700 space-y-2">
            {product.productFeatures.map((feature, index) => (
              <li key={index} className="pl-2">{feature}</li>
            ))}
          </ul>
        </div>

        {/* Price */}
        <p className="text-3xl font-semibold text-green-600">₹{product.price}</p>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition-all flex items-center gap-2">
            <FaShoppingCart /> Add to Cart
          </button>
          <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition-all flex items-center gap-2">
            <FaRegHeart /> Wishlist
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;

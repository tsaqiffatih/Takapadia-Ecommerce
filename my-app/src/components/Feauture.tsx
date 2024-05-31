import React from "react";

export default function Feature() {
  const products = Array.from({ length: 8 }, (_, index) => index + 1);

  return (
    <>
      <div className="mt-3">
        <p className="font-bold text-4xl mb-1">Featured Products</p>
        <div className="m-2 mb-1 overflow-x-auto scroll-container">
          <div className="flex space-x-4 ">
            {products.map((product, index) => (
              <div
                key={index}
                className="card min-w-80 bg-base-100 shadow-xl image-full border hover:border-none"
              >
                <figure>
                  <img
                    src={`https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg`}
                    alt={`Product ${product}`}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Product {product}</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-ghost hover:border-black">
                      See Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

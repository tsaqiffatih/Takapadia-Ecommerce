export default function AddToWishlist() {
    return (
      <button className="">
        <svg className="w-8 h-8 fill-current stroke-current text-black hover:border rounded hover:border-black" viewBox="0 0 20 20">
          <path
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            fill="none" //saat di klik none berubah jadi red
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
          ></path>
        </svg>
      </button>
    );
  }
  

// inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:shadow-outline hover:bg-indigo-800

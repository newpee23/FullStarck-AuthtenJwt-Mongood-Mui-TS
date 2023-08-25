/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'custom-md': '0px 6px 12px rgba(0, 0, 0, 0.1)', // เพิ่มเงาที่คุณต้องการ
      },
    },
  },
  plugins: [],
}


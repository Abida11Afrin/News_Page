"use client";  

import { useEffect, useState } from "react";

export default function LiveBanglaDateModule() {
  const [dateInfo, setDateInfo] = useState({
    banglaDate: "",
    todayMonth: "",
    todayYear: "",
    todayDate: "",
  });

  useEffect(() => {
    const updateDate = () => {
      const today = new Date();

      // Full formatted Bangla date
      const banglaDate = today.toLocaleDateString("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Month list for Bengali text
      const months = [
        "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
        "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
      ];

      const todayMonth = months[today.getMonth()];
      const todayYear = today.getFullYear().toLocaleString("bn-BD");
      const todayDate = today.getDate().toLocaleString("bn-BD");

      setDateInfo({
        banglaDate,
        todayMonth,
        todayYear,
        todayDate,
      });
    };

    updateDate(); // Initialize immediately
    const interval = setInterval(updateDate, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <div className="text-center text-[13px] sm:text-sm font-medium text-gray-700 mt-2">
      <p>{dateInfo.banglaDate}</p>
      <p className="text-xs text-gray-500 mt-1">
        ({dateInfo.todayDate} {dateInfo.todayMonth}, {dateInfo.todayYear})
      </p>
    </div>
  );
}
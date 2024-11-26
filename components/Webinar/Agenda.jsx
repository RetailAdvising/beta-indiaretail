import React, { useState } from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { motion } from "framer-motion";
import { format, parse } from "date-fns";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  display: "block",
  preload: true,
  style: "normal",
  subsets: ["latin"],
  variable: "--font-inter",
});

const Agenda = ({ data }) => {
  const [selected, setSelected] = useState(-1);

  const toggle = (index) => {
    setSelected(selected === index ? -1 : index);
  };

  return (
    <>
      {data.map((res, i) => (
        <div key={i} className="border-b">
          <div className="flex justify-between gap-3 items-center py-3 cursor-pointer" onClick={() => toggle(i)}>
            <div>
              <span className="bg-[#F2F2F2] px-2 rounded-md text-[#999999] md:text-[10px] sub_title lg:text-sm font-semibold py-[2px]">
                {`${format(parse(res.start_time,'HH:mm:ss', new Date()),'hh:mm a')} - ${format(parse(res.end_time,'HH:mm:ss', new Date()),'hh:mm a')}`}
              </span>
              <p
                className={`mt-2 md:text-[16px] lg:text-[18px] nunito font-normal`}
              >
                {res.content}
              </p>
            </div>

            <div>
              <span
                className="text-[26px] cursor-pointer"
              >
                {selected === i ? "_" : "+"}
              </span>
            </div>
          </div>

          <motion.div
            initial={false}
            animate={{
              height: selected === i ? "auto" : 0,
              opacity: selected === i ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden pb-3"
          >
            <p className="py-2 md:text-[14px] contents lg:text-[16px]">
              {res.description}
            </p>
          </motion.div>
        </div>
      ))}
    </>
  );
};

export default Agenda;

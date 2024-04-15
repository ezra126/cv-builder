"use client";

import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const GenericPdfDownloader = ({ rootElementId, downloadFileName }) => {
  const downloadPdfDocument = () => {
    const input = document.getElementById(rootElementId);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save(`${downloadFileName}.pdf`);
    });
  };

  return (
    <button
      onClick={downloadPdfDocument}
      className="py-2 px-3 bg-white text-black rounded-md border-double border-4 border-indigo-600 "
    >
      Download CV
    </button>
  );
};

export default GenericPdfDownloader;

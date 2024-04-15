"use client";
import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const GenericPdfDownloader = () => {
  const input = document.getElementById("resume");
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "JPEG", 0, 0);
    pdf.save(`${downloadFileName}.pdf`);
  });
};

export default GenericPdfDownloader;

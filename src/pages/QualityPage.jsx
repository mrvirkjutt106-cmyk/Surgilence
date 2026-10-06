import React from 'react';
import { Link } from 'react-router-dom';
import {
  IconShieldCheck,
  IconAward,
  IconCheck,
  IconFileText,
  IconDownload
} from '../components/Icons';
import { COMPANY_INFO } from '../data/instruments';

export default function QualityPage() {
  const steps = [
    {
      num: "01",
      title: "Raw Alloy Spectrometry",
      desc: "Every billet of German & French stainless steel is analyzed via optical emission spectrometry to verify exact carbon, chromium, and molybdenum percentages before forging."
    },
    {
      num: "02",
      title: "Controlled Vacuum Heat Treatment",
      desc: "Computerized vacuum furnaces treat instruments to exact Rockwell hardness thresholds (HRC 50-54 for cutting edges, HRC 68-70 for Tungsten Carbide inserts) eliminating brittleness."
    },
    {
      num: "03",
      title: "ASTM A967 Chemical Passivation",
      desc: "Instruments undergo multi-stage nitric/citric acid baths that dissolve free surface iron and generate an impenetrable chromium oxide passive layer, preventing rust in autoclaves."
    },
    {
      num: "04",
      title: "2-Hour Boil & Corrosion Testing",
      desc: "Random sample lots undergo a 2-hour boiling water test and copper sulfate surface reaction test to guarantee zero pitting or discoloration under hospital sterilization cycles."
    }
  ];

  return (
    <div className="quality-page">
      {/* Banner */}
      <section className="page-header-strip bg-slate-900 text-white">
        <div className="container">
          <div className="page-header-content">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-wider">
              METALLURGICAL STANDARDS
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-1 text-white">
              Quality Assurance &amp; ISO 13485:2016
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-2">
              Every instrument manufactured by SURGILENCE (PVT) LTD is governed by strict medical device quality management systems and international clinical safety regulations.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12 sm:py-16">
        {/* Quality Certifications Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {COMPANY_INFO.certifications.map((cert, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <IconShieldCheck size={20} className="text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">{cert.code}</h3>
              </div>
              <h4 className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
                {cert.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {cert.body}
              </p>
            </div>
          ))}
        </div>

        {/* 4-Stage Testing Process */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold text-teal-700 tracking-wider">VERIFICATION WORKFLOW</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              4-Stage Quality Assurance Verification
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              From raw German billet inspection to sterile operating room delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative">
                <span className="text-3xl font-extrabold text-teal-200 block mb-2">{step.num}</span>
                <h4 className="font-bold text-sm text-slate-900 mb-2">{step.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Metallurgy Matrix */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 mb-12">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Alloy Specifications &amp; Mechanical Properties
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  <th className="p-3">Steel Classification</th>
                  <th className="p-3">Standard Reference</th>
                  <th className="p-3">Rockwell Hardness</th>
                  <th className="p-3">Clinical Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-bold text-slate-900">AISI 420 Martensitic</td>
                  <td className="p-3 text-slate-600">ASTM F899 / ISO 7153-1</td>
                  <td className="p-3 font-semibold text-teal-700">HRC 52 – 54</td>
                  <td className="p-3 text-slate-600">Scissors cutting edges, bone elevators, rongeurs</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">AISI 410 Surgical Steel</td>
                  <td className="p-3 text-slate-600">ASTM F899</td>
                  <td className="p-3 font-semibold text-teal-700">HRC 48 – 50</td>
                  <td className="p-3 text-slate-600">Forceps shanks, needle driver bodies, retractors</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Tungsten Carbide (TC)</td>
                  <td className="p-3 text-slate-600">Vacuum Silver Brazed</td>
                  <td className="p-3 font-semibold text-amber-600">HRC 68 – 70</td>
                  <td className="p-3 text-slate-600">Needle holder jaw inserts, micro ligature pliers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center">
          <Link to="/quote" className="btn btn-primary mr-3">
            <span>Request Certified Lot Quotation</span>
          </Link>
          <Link to="/products" className="btn btn-secondary">
            <span>View Instruments Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

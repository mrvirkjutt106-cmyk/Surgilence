import React from 'react';
import { Link } from 'react-router-dom';
import {
  IconShieldCheck,
  IconAward,
  IconCheck,
  IconScissors
} from '../components/Icons';

export default function QualityPage() {
  return (
    <div className="quality-page bg-white">
      {/* Light Header Strip */}
      <section className="bg-slate-50 border-b border-slate-200 py-12 sm:py-16">
        <div className="container">
          <div className="max-w-3xl">
            <span className="section-tag">COMPLIANCE &amp; ACCREDITATION</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              Quality Assurance &amp; ISO 13485:2016
            </h1>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              SURGILENCE (PVT) LTD operates under an audited Medical Device Quality Management System conforming to international standards for precision surgical and dental instruments.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12 sm:py-16">
        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center mb-4">
              <IconShieldCheck size={26} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">ISO 13485:2016 Certified</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Certified medical device quality management standard governing manufacturing consistency, traceability from raw billets to finished instruments, and post-market surveillance.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center mb-4">
              <IconAward size={26} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">CE MDR 2017/745 Compliant</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Conforms with European Medical Device Regulations for Class I reusable surgical and dental hand tools, supporting institutional hospital procurement across the EU.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center mb-4">
              <IconScissors size={26} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">ASTM A967 Chemical Passivation</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              All instruments undergo nitric/citric chemical passivation to remove free iron molecules from the surface, building a durable chromium-oxide passive shield against rust.
            </p>
          </div>
        </div>

        {/* Metallurgy Matrix */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10 mb-16">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Metallurgy &amp; Hardness Verification</h2>
          <p className="text-sm text-slate-500 mb-6 max-w-2xl">
            We use authenticated metallurgical billets conforming to ASTM F899 standards for surgical instruments.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <span className="text-xs font-mono font-bold text-teal-700 block mb-1">AISI 420 Martensitic</span>
              <h4 className="font-bold text-base text-slate-900 mb-1">HRC 52 – 54 Hardness</h4>
              <p className="text-xs text-slate-500">
                Used in cutting scissors, elevators, and bone punches. Delivers razor edge retention with zero brittleness.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <span className="text-xs font-mono font-bold text-teal-700 block mb-1">AISI 410 Ferritic/Martensitic</span>
              <h4 className="font-bold text-base text-slate-900 mb-1">HRC 48 – 50 Hardness</h4>
              <p className="text-xs text-slate-500">
                Optimized for tissue forceps, hemostats, and retractors requiring flex ductility without permanent deformation.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <span className="text-xs font-mono font-bold text-amber-700 block mb-1">Tungsten Carbide (TC Gold)</span>
              <h4 className="font-bold text-base text-slate-900 mb-1">HRA 88 – 90 Hardness</h4>
              <p className="text-xs text-slate-500">
                Vacuum-brazed sintered carbide inserts with 0.4mm pyramid serrations for slip-free needle driving.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/quote" className="btn btn-primary">
            <span>Request Certificate of Conformance / RFQ</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

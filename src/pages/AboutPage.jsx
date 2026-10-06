import React from 'react';
import { Link } from 'react-router-dom';
import {
  IconScissors,
  IconTooth,
  IconShieldCheck,
  IconAward,
  IconGlobe,
  IconCheck
} from '../components/Icons';
import { COMPANY_INFO } from '../data/instruments';

export default function AboutPage() {
  return (
    <div className="about-page bg-white">
      {/* Light Header Strip */}
      <section className="bg-slate-50 border-b border-slate-200 py-12 sm:py-16">
        <div className="container">
          <div className="max-w-3xl">
            <span className="section-tag">CORPORATE HERITAGE</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              About SURGILENCE (PVT) LTD
            </h1>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Pioneering precision manual surgical and dental instrument forging from Sialkot, Pakistan to healthcare centers across 40+ countries worldwide.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12 sm:py-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase font-bold text-teal-700 tracking-wider">OUR CORE PHILOSOPHY</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Perfection in the Surgeon's Hand
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Incorporated as a Private Limited company in Sialkot, Pakistan—the internationally recognized center of fine surgical instrument forging—<strong>SURGILENCE (PVT) LTD</strong> was founded on uncompromising metallurgical excellence.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              While clinical technology evolves, the physical tactile feedback of cutting delicate tissue, manipulating deep needles, or extracting roots depends entirely on hand instrument balance. We focus our full engineering capacity on cold-forged stainless steel and Tungsten Carbide manual tools.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <IconScissors size={18} className="text-teal-600" />
                  <h4 className="font-bold text-sm text-slate-800">Surgical Specialty</h4>
                </div>
                <p className="text-xs text-slate-500">
                  Precision Metzenbaum scissors, Crile hemostats, TC needle holders, and bone rongeurs.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <IconTooth size={18} className="text-teal-600" />
                  <h4 className="font-bold text-sm text-slate-800">Dental Specialty</h4>
                </div>
                <p className="text-xs text-slate-500">
                  Anatomical extraction forceps, Coupland elevators, periodontal scalers, and mirrors.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
              <img
                src="/images/manufacturing.jpg"
                alt="Instrument Craftsmanship"
                className="w-full rounded-xl object-cover mb-4"
              />
              <div className="text-xs text-slate-500 space-y-2">
                <div className="flex items-center gap-2">
                  <IconCheck size={14} className="text-teal-600" />
                  <span>Sialkot Export Chamber of Commerce Registered</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={14} className="text-teal-600" />
                  <span>ISO 13485:2016 Medical Devices Quality System</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={14} className="text-teal-600" />
                  <span>100% In-House Passivation &amp; Hardness Verification</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Export Call to Action */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Partner with SURGILENCE (PVT) LTD</h3>
          <p className="text-sm text-slate-500 mb-6">
            We provide private label manufacturing, tender sample kits, and direct container export terms.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/catalog" className="btn btn-primary w-full sm:w-auto">
              Explore Instrument Catalog
            </Link>
            <Link to="/quote" className="btn btn-secondary w-full sm:w-auto">
              Request Wholesale RFQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

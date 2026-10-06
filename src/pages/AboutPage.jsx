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
    <div className="about-page">
      {/* Banner */}
      <section className="page-header-strip bg-slate-900 text-white">
        <div className="container">
          <div className="page-header-content">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-wider">
              CORPORATE PROFILE
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-1 text-white">
              About SURGILENCE (PVT) LTD
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-2">
              Dedicated manufacturers of handcrafted medical-grade stainless steel surgical and dental hand instruments.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase font-bold text-teal-700 tracking-wider">OUR MISSION &amp; HERITAGE</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Perfection in the Surgeon's Hand
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Incorporated as a Private Limited company in Sialkot, Pakistan—the globally recognized epicenter of fine surgical instrument forging—<strong>SURGILENCE (PVT) LTD</strong> was founded on a singular principle: uncompromising metallurgical excellence.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Modern operating suites and dental operatories utilize advanced technologies, but the physical sensation of cutting tissue, luxating a root tip, or placing deep cavity sutures depends completely on manual hand instruments. We consciously focus 100% of our capacity on cold-forged stainless steel and Tungsten Carbide manual tools.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <IconScissors size={18} className="text-teal-600" />
                  <h4 className="font-bold text-sm text-slate-800">Surgical Specialty</h4>
                </div>
                <p className="text-xs text-slate-500">
                  Metzenbaum scissors, Mayo-Hegar TC needle drivers, Crile hemostats, and Kerrison rongeurs.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <IconTooth size={18} className="text-teal-600" />
                  <h4 className="font-bold text-sm text-slate-800">Dental Specialty</h4>
                </div>
                <p className="text-xs text-slate-500">
                  Upper &amp; lower extraction forceps, Coupland elevators, Gracey curettes, and optical mouth mirrors.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
              <img
                src="/images/manufacturing.jpg"
                alt="SURGILENCE manufacturing and passivation facility"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Corporate Governance Details */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 mb-14">
          <div className="max-w-3xl mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Corporate Profile &amp; Governance</h3>
            <p className="text-xs text-slate-500">
              Registered corporate credentials and export compliance data.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="border-b sm:border-b-0 sm:border-r border-slate-200 pb-4 sm:pb-0 sm:pr-4">
              <span className="text-xs text-slate-500 block uppercase font-bold">Legal Entity</span>
              <span className="text-sm font-bold text-slate-900 block mt-1">SURGILENCE (PVT) LTD</span>
              <span className="text-xs text-slate-600">Private Limited Corporation</span>
            </div>

            <div className="border-b sm:border-b-0 sm:border-r border-slate-200 pb-4 sm:pb-0 sm:pr-4">
              <span className="text-xs text-slate-500 block uppercase font-bold">Standards Certification</span>
              <span className="text-sm font-bold text-teal-700 block mt-1">ISO 13485:2016</span>
              <span className="text-xs text-slate-600">CE MDR 2017/745 Class I &amp; IIa</span>
            </div>

            <div>
              <span className="text-xs text-slate-500 block uppercase font-bold">Export Capability</span>
              <span className="text-sm font-bold text-slate-900 block mt-1">48+ Countries</span>
              <span className="text-xs text-slate-600">Direct Factory to Hospital Delivery</span>
            </div>
          </div>
        </div>

        {/* Action Banner */}
        <div className="text-center">
          <Link to="/products" className="btn btn-primary mr-3">
            <span>Explore Full Catalog</span>
          </Link>
          <Link to="/quote" className="btn btn-secondary">
            <span>Request Wholesale RFQ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

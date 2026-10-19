import React, { useState } from 'react';
import { Award, CheckCircle2, Shield, FileText, ChevronRight, Info } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data';
import { AppIconRenderer } from '../common/OSIcons';
import { useWindowStore } from '../../store/windowStore';

export const EducationWindow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'details' | 'path'>('general');
  const [selectedField, setSelectedField] = useState<string>('coursework');
  const { education } = PORTFOLIO_DATA;
  const { closeWindow } = useWindowStore();

  const detailsList = [
    { id: 'version', field: 'Version', value: 'V3 (Autonomous Curriculum)' },
    { id: 'degree', field: 'Degree Program', value: education.degree },
    { id: 'institution', field: 'Issuing Institution', value: education.institution },
    { id: 'location', field: 'Location', value: education.location },
    { id: 'period', field: 'Valid Period', value: education.period },
    { id: 'cgpa', field: 'Cumulative GPA (CGPA)', value: `${education.cgpa} (Distinction Honors)` },
    { id: 'coursework', field: 'Core Coursework', value: education.coursework.join('; ') },
    { id: 'highlights', field: 'Scholastic Honors', value: education.highlights.join('; ') },
  ];

  const currentFieldValue = detailsList.find((d) => d.id === selectedField)?.value || '';

  return (
    <div className="flex-1 flex flex-col bg-[#f0f0f0] select-none h-full font-sans text-xs">
      {/* 1. TABS HEADER (WINDOWS 7 AUTHENTIC DIALOG TABSTRIP) */}
      <div className="bg-[#e4ebf3] pt-2 px-3 flex items-center space-x-1 border-b border-[#a0b8d5] shrink-0 text-[11px]">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-3 py-1 rounded-t border-t border-l border-r cursor-pointer ${
            activeTab === 'general'
              ? 'bg-white border-[#94a3b8] font-semibold text-gray-800'
              : 'bg-white/40 border-transparent text-gray-600 hover:bg-white/80'
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab('details')}
          className={`px-3 py-1 rounded-t border-t border-l border-r cursor-pointer ${
            activeTab === 'details'
              ? 'bg-white border-[#94a3b8] font-semibold text-gray-800'
              : 'bg-white/40 border-transparent text-gray-600 hover:bg-white/80'
          }`}
        >
          Details & Coursework
        </button>
        <button
          onClick={() => setActiveTab('path')}
          className={`px-3 py-1 rounded-t border-t border-l border-r cursor-pointer ${
            activeTab === 'path'
              ? 'bg-white border-[#94a3b8] font-semibold text-gray-800'
              : 'bg-white/40 border-transparent text-gray-600 hover:bg-white/80'
          }`}
        >
          Academic Path
        </button>
      </div>

      {/* 2. TAB BODY (WHITE DIALOG BACKGROUND) */}
      <div className="flex-1 bg-white p-4 sm:p-5 overflow-y-auto select-text text-gray-800">
        {/* ================= GENERAL TAB ================= */}
        {activeTab === 'general' && (
          <div className="space-y-4 max-w-xl mx-auto">
            {/* Academic status header */}
            <div className="flex items-start space-x-3.5 border border-[#c4d7ec] bg-[#f4f8fd] p-3 rounded">
              <AppIconRenderer type="education" size={44} className="shrink-0" />
              <div className="space-y-1">
                <div className="font-bold text-sm text-[#003399]">
                  Academic Information
                </div>
                <div className="text-xs text-gray-700 leading-relaxed">
                  This record confirms that <strong>Vedant Borude</strong> is actively enrolled in good standing in the <strong>{education.degree}</strong> program at <strong>{education.institution}</strong>.
                </div>
              </div>
            </div>

            {/* Inset Properties Box */}
            <div className="border border-[#c6d7e8] bg-white rounded p-3 space-y-2 text-xs">
              <div className="grid grid-cols-[110px_1fr] gap-y-1.5">
                <span className="text-gray-500 font-medium">Issued to:</span>
                <span className="font-bold text-gray-900">Vedant Borude</span>

                <span className="text-gray-500 font-medium">Issued by:</span>
                <span className="font-semibold text-blue-900">{education.institution}</span>

                <span className="text-gray-500 font-medium">Academic Period:</span>
                <span className="text-gray-800">{education.period} ({education.status})</span>

                <span className="text-gray-500 font-medium">Standing:</span>
                <span className="font-bold text-emerald-700">CGPA: {education.cgpa} (Distinction)</span>

                <span className="text-gray-500 font-medium">Location:</span>
                <span className="text-gray-800">{education.location}</span>
              </div>
            </div>

            {/* Coursework summary */}
            <div className="border border-gray-200 rounded p-2.5 bg-gray-50">
              <div className="font-bold text-xs text-gray-800 mb-1 flex items-center space-x-1.5">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>Verified Core Academic Modules:</span>
              </div>
              <div className="text-[11px] text-gray-600 leading-relaxed">
                {education.coursework.join(' • ')}
              </div>
            </div>
          </div>
        )}

        {/* ================= DETAILS TAB ================= */}
        {activeTab === 'details' && (
          <div className="space-y-3 flex flex-col h-full">
            <div className="flex items-center space-x-2 text-[11px] text-gray-600">
              <span>Show:</span>
              <div className="border border-gray-300 bg-white px-2 py-0.5 rounded text-xs text-gray-800 font-medium">
                &lt;All Fields&gt;
              </div>
            </div>

            {/* Classic Windows 7 Details ListView */}
            <div className="border border-[#94a3b8] bg-white rounded overflow-y-auto max-h-48 shadow-inner">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#eef3f8] border-b border-[#cbd5e1] text-gray-600 font-semibold text-[11px] sticky top-0">
                  <tr>
                    <th className="py-1 px-2.5 w-44">Field</th>
                    <th className="py-1 px-2.5">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {detailsList.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedField(item.id)}
                      className={`cursor-pointer border-b border-gray-100 ${
                        selectedField === item.id ? 'bg-[#3399ff] text-white' : 'hover:bg-sky-50'
                      }`}
                    >
                      <td className="py-1 px-2.5 font-medium">{item.field}</td>
                      <td className="py-1 px-2.5 truncate max-w-xs">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Field value multiline box */}
            <div className="space-y-1">
              <div className="text-[11px] text-gray-500 font-medium">Field value:</div>
              <div className="border border-[#94a3b8] bg-gray-50 p-2 rounded text-xs text-gray-800 font-mono leading-relaxed min-h-[70px] max-h-24 overflow-y-auto shadow-inner select-text">
                {currentFieldValue}
              </div>
            </div>
          </div>
        )}

        {/* ================= ACADEMIC PATH TAB ================= */}
        {activeTab === 'path' && (
          <div className="space-y-4 max-w-lg mx-auto">
            <div className="text-[11px] text-gray-600 font-medium">Academic path:</div>

            {/* Hierarchical Tree */}
            <div className="border border-[#94a3b8] bg-white rounded p-3 space-y-2 text-xs shadow-inner">
              <div className="flex items-center space-x-2 text-gray-900 font-semibold">
                <span>📁</span>
                <span>Autonomous Academic University Board</span>
              </div>
              <div className="flex items-center space-x-2 pl-5 text-gray-800 font-medium">
                <span>↳ 📁</span>
                <span>{education.institution} (PICT)</span>
              </div>
              <div className="flex items-center space-x-2 pl-10 text-blue-900 font-bold bg-blue-50 p-1 rounded border border-blue-200">
                <span>↳ 📜</span>
                <span>Vedant Borude — B.Tech CE (CGPA: {education.cgpa})</span>
              </div>
            </div>

            {/* Academic status box */}
            <div className="border border-[#c4d7ec] bg-[#f4f8fd] p-3 rounded space-y-1">
              <div className="text-xs font-bold text-gray-800">Enrollment status:</div>
              <div className="text-xs text-emerald-800 flex items-center space-x-1.5 font-medium">
                <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                <span>Active undergraduate enrollment verified under student ID VEDANT-PICT-2024.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. DIALOG FOOTER WITH AUTHENTIC BUTTONS */}
      <div className="bg-[#f0f0f0] border-t border-[#dfdfdf] px-4 py-2.5 flex items-center justify-between shrink-0">
        <div className="text-[11px] text-gray-500">
          Undergraduate academic record
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => closeWindow('education-cert')}
            className="aero-button px-5 py-1 text-xs text-gray-800 font-medium rounded cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

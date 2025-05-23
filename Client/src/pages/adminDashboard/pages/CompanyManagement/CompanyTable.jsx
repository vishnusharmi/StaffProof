import React, { useState } from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

const CompanyTable = ({
    filteredCompanies = [],
    editCompany,
    deleteCompany
}) => {
    const navigate = useNavigate();
    const [isModalOpenPopup, setIsModalOpenPopup] = useState(false);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedCompanyId(id);
        setIsModalOpenPopup(true);
    };

    const confirmDelete = () => {
        if (selectedCompanyId && deleteCompany) {
            deleteCompany(selectedCompanyId);
            setIsModalOpenPopup(false);
        }
    };

    const handleView = (company) => {
        navigate("/admin/department", { state: { company } });
    };

    return (
        <div className="container mx-auto px-1 py-4">
            <div className="bg-white shadow-xl rounded-xl overflow-hidden">
                <div className="overflow-auto" style={{ maxHeight: "350px" }}>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-teal-500 to-teal-500 sticky top-0 z-20">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-white uppercase tracking-wider text-center">COMPANY NAME</th>
                                <th className="px-6 py-3 text-xs font-semibold text-white uppercase tracking-wider text-center">EMAIL</th>
                                <th className="px-6 py-3 text-xs font-semibold text-white uppercase tracking-wider text-center">PHONE NUMBER</th>
                                <th className="px-6 py-3 text-xs font-semibold text-white uppercase tracking-wider text-center">REGISTRATION NUMBER</th>
                                <th className="px-6 py-3 text-xs font-semibold text-white uppercase tracking-wider text-center">YEAR</th>
                                <th className="px-6 py-3 text-xs font-semibold text-white uppercase tracking-wider text-center">DEPARTMENT</th>
                                <th className="px-6 py-3 text-xs font-semibold text-white uppercase tracking-wider text-center">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCompanies.length > 0 ? (
                                filteredCompanies.map((company, index) => (
                                    <tr key={company.id || index} className="hover:bg-gray-50 transition-all duration-200">
                                        <td className="px-3 md:px-6 py-4 text-xs md:text-xs text-black font-semibold text-center whitespace-nowrap">
                                            {company.companyName || "N/A"}
                                        </td>
                                        <td className="px-3 md:px-6 py-4 text-xs md:text-xs text-gray-900 text-center hidden sm:table-cell">
                                            {company.email || "N/A"}
                                        </td>
                                        <td className="px-3 md:pr-6 py-4 text-xs md:text-xs text-gray-900 text-center hidden sm:table-cell">
                                            {company.phonenumber || "N/A"}
                                        </td>
                                        <td className="px-3 md:px-6 py-4 text-xs md:text-xs text-gray-900 text-center hidden sm:table-cell">
                                            {company.registerNum || "N/A"}
                                        </td>
                                        <td className="px-3 md:px-4 py-4 text-xs md:text-xs text-gray-900 text-center hidden sm:table-cell">
                                            {company.founderYear || "N/A"}
                                        </td>
                                        <td className="px-2 md:px-4 py-4 text-xs md:text-xs text-gray-900 text-center">
                                            <button className="cursor-pointer text-teal-500 hover:text-teal-600 hover:scale-110 transition-all duration-200" onClick={() => handleView(company)}>
                                                <Eye size={16} className="md:w-5 md:h-5 mx-auto" />
                                            </button>
                                        </td>
                                        <td className="px-2 md:px-4 py-4 flex justify-center space-x-2 md:space-x-4">
                                            <button className="cursor-pointer text-yellow-500 hover:text-yellow-600 hover:scale-110 transition-all duration-200" onClick={() => editCompany && editCompany(company)}>
                                                <Edit2 size={16} className="md:w-5 md:h-5" />
                                            </button>
                                            <button className="cursor-pointer text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-200" onClick={() => handleDeleteClick(company.id)}>
                                                <Trash2 size={16} className="md:w-5 md:h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500 text-sm">
                                        No results found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpenPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500/50">
                    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm relative">
                        <button onClick={() => setIsModalOpenPopup(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-lg font-semibold">Confirm Deletion</h2>
                        <p className="text-gray-600 mt-2">Are you sure you want to delete this company?</p>
                        <div className="flex justify-end gap-4 mt-4">
                            <button className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer" onClick={() => setIsModalOpenPopup(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer" onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyTable;
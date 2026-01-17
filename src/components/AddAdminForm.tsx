"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";

interface AdminFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  nicNumber: string;
  bankName: string;
  accountNumber: string;
  branchName: string;
}

interface AddAdminFormProps {
  onAddAdmin?: (data: AdminFormData) => void;
  initialData?: Partial<AdminFormData>;
}

export default function AddAdminForm({ onAddAdmin, initialData }: AddAdminFormProps) {
  const [formData, setFormData] = useState<AdminFormData>({
    name: initialData?.name || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    password: "", // Always empty for security on edit
    address: initialData?.address || "",
    nicNumber: initialData?.nicNumber || "",
    bankName: initialData?.bankName || "",
    accountNumber: initialData?.accountNumber || "",
    branchName: initialData?.branchName || "",
  });

  // Keep state updated if initialData changes (e.g. switching between admins)
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData,
        password: prev.password // Keep password as is
      }));
    }
  }, [initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onAddAdmin) onAddAdmin(formData);

    setFormData({
      name: "",
      phone: "",
      email: "",
      password: "",
      address: "",
      nicNumber: "",
      bankName: "",
      accountNumber: "",
      branchName: "",
    });
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/** INPUT FIELDS */}
        {[
          { name: "name", placeholder: "Full Name", icon: "👤" },
          { name: "phone", placeholder: "Phone Number", icon: "📞" },
          { name: "email", placeholder: "Email", type: "email", icon: "✉️" },
          { name: "password", placeholder: "Password", type: "password", icon: "🔒" },
          { name: "address", placeholder: "Address", icon: "📍" },
          { name: "nicNumber", placeholder: "NIC Number", icon: "🆔" },
          { name: "bankName", placeholder: "Bank Name", icon: "🏦" },
          { name: "accountNumber", placeholder: "Account Number", icon: "💳" },
          { name: "branchName", placeholder: "Branch Name", icon: "🏢" },
        ].map((field) => (
          <div key={field.name} className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-50 group-focus-within:opacity-100 transition-opacity">
              {field.icon}
            </span>
            <input
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name as keyof AdminFormData] as string}
              onChange={handleChange}
              required={["name", "phone", "email", "password", "bankName", "accountNumber", "branchName"].includes(field.name)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium text-slate-700 placeholder:text-slate-400"
            />
          </div>
        ))}

        {/** SUBMIT BUTTON */}
        <div className="md:col-span-2 pt-4">
          <button
            type="submit"
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Authorize This Administrator
          </button>
        </div>
      </form>
    </div>
  );
}

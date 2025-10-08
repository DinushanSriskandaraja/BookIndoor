"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface AdminFormData {
  name: string;
  phone_no: string;
  email: string;
  password: string;
  address: string;
  nic_no: string;
  bank_name: string;
  account_no: string;
  branch: string;
}

interface AddAdminFormProps {
  onAddAdmin?: (data: AdminFormData) => void;
}

export default function AddAdminForm({ onAddAdmin }: AddAdminFormProps) {
  const [formData, setFormData] = useState<AdminFormData>({
    name: "",
    phone_no: "",
    email: "",
    password: "",
    address: "",
    nic_no: "",
    bank_name: "",
    account_no: "",
    branch: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onAddAdmin) onAddAdmin(formData);
    alert("✅ Admin added successfully (frontend only)");

    setFormData({
      name: "",
      phone_no: "",
      email: "",
      password: "",
      address: "",
      nic_no: "",
      bank_name: "",
      account_no: "",
      branch: "",
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-8 bg-green-100/20 backdrop-blur-md border border-green-700/30 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-green-900 text-center mb-6">
        Add New Admin
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/** INPUT FIELDS */}
        {[
          { name: "name", placeholder: "Full Name" },
          { name: "phone_no", placeholder: "Phone Number" },
          { name: "email", placeholder: "Email", type: "email" },
          { name: "password", placeholder: "Password", type: "password" },
          { name: "address", placeholder: "Address" },
          { name: "nic_no", placeholder: "NIC Number" },
          { name: "bank_name", placeholder: "Bank Name" },
          { name: "account_no", placeholder: "Account Number" },
          { name: "branch", placeholder: "Branch Name" },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type || "text"}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name as keyof AdminFormData] as string}
            onChange={handleChange}
            required={["name", "phone_no", "email", "password", "bank_name", "account_no", "branch"].includes(field.name)}
            className="w-full p-3 border border-green-400 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        ))}

        {/** SUBMIT BUTTON */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition shadow-md"
          >
            Add Admin
          </button>
        </div>
      </form>
    </div>
  );
}

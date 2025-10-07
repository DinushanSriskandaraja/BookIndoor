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
  managingGround: string;
  image?: File | null;
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
    managingGround: "",
    image: null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
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
      managingGround: "",
      image: null,
    });
    setPreview(null);
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
          { name: "managingGround", placeholder: "Managing Ground" },
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

        {/** IMAGE UPLOAD */}
        <div className="md:col-span-2 flex flex-col items-center justify-center border-2 border-dashed border-green-400 rounded-lg p-4 hover:border-green-600 transition">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="imageUpload"
          />
          <label
            htmlFor="imageUpload"
            className="cursor-pointer text-green-700 font-medium hover:underline"
          >
            Upload Profile Image
          </label>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 mt-3 rounded-full object-cover shadow-md border border-green-400"
            />
          )}
        </div>

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

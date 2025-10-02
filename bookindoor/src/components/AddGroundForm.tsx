"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface GroundFormData {
  name: string;
  location: string;
  sports: string;
  images: File[];
}

export default function AddGroundForm() {
  const [formData, setFormData] = useState<GroundFormData>({
    name: "",
    location: "",
    sports: "",
    images: [],
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle multiple file selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: filesArray }));

    // Preview
    const previews = filesArray.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Convert sports string to array
    const sportsArray = formData.sports.split(",").map((s) => s.trim());

    // Normally, send formData + images to your backend here
    console.log({
      ...formData,
      sports: sportsArray,
    });

    alert("Ground added successfully!");
    setFormData({ name: "", location: "", sports: "", images: [] });
    setPreviewImages([]);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Ground</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700 mb-1">Ground Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Sports */}
        <div>
          <label className="block text-gray-700 mb-1">
            Sports (comma separated)
          </label>
          <input
            type="text"
            name="sports"
            value={formData.sports}
            onChange={handleChange}
            placeholder="Badminton, Futsal, Basketball"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-gray-700 mb-1">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {previewImages.length > 0 && (
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {previewImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`preview-${idx}`}
                  className="h-24 w-24 object-cover rounded-lg border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          Add Ground
        </button>
      </form>
    </div>
  );
}

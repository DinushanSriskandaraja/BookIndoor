"use client";

import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface Sport {
  sport: string;
  price: number;
}

interface GroundFormData {
  ground_name: string;
  location: string;
  latitude: string;
  longitude: string;
  open_from: string;
  open_to: string;
  facilities: string[];
  phone_no: string;
  court_type: string;
  sports: Sport[];
  images: File[];
}

interface StoredGround {
  id: string | number;
  name: string;
  location: string;
  latitude?: string;
  longitude?: string;
  open_from?: string;
  open_to?: string;
  facilities?: string;
  phone_no: string;
  court_type: string;
  sports: string[];
  priceList: number[];
  images?: string[];
  image?: string;
}

const defaultSports = [
  "Football",
  "Cricket",
  "Badminton",
  "Tennis",
  "Basketball",
  "Volleyball",
];

const defaultFacilities = [
  "Parking",
  "Restrooms",
  "Changing Rooms",
  "Cafeteria",
  "Lighting",
  "Seating Area",
  "First Aid",
];
interface AddGroundFormProps {
  ground?: StoredGround; // optional for add mode
  isEditing?: boolean;
  onClose?: () => void; // optional callback for modal
}
const courtTypes = ["Indoor", "Outdoor", "Hybrid"];

export default function AddGroundForm({
  ground,
  isEditing = false,
  onClose,
}: AddGroundFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<GroundFormData>({
    ground_name: "",
    location: "",
    latitude: "",
    longitude: "",
    open_from: "",
    open_to: "",
    facilities: [],
    phone_no: "",
    court_type: "",
    sports: [{ sport: "", price: 0 }],
    images: [],
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Load ground data if editing
  useEffect(() => {
    if (isEditing && ground) {
      setFormData({
        ground_name: ground.name,
        location: ground.location,
        latitude: ground.latitude || "",
        longitude: ground.longitude || "",
        open_from: ground.open_from || "",
        open_to: ground.open_to || "",
        facilities: ground.facilities ? ground.facilities.split(", ") : [],
        phone_no: ground.phone_no,
        court_type: ground.court_type,
        sports: ground.sports.map((s, i) => ({
          sport: s,
          price: ground.priceList?.[i] || 0,
        })),
        images: [], // keep empty; we handle previews separately
      });
      setPreviewImages(ground.images || [ground.image || ""]);
    }
  }, [isEditing, ground]);

  // ✅ Handle changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSportChange = (
    index: number,
    field: keyof Sport,
    value: string
  ) => {
    const updated = [...formData.sports];
    updated[index] = {
      ...updated[index],
      [field]: field === "price" ? Number(value) : value,
    };
    setFormData((prev) => ({ ...prev, sports: updated }));
  };

  const addSport = () =>
    setFormData((prev) => ({
      ...prev,
      sports: [...prev.sports, { sport: "", price: 0 }],
    }));
  const removeSport = (index: number) =>
    setFormData((prev) => ({
      ...prev,
      sports: prev.sports.filter((_, i) => i !== index),
    }));

  const handleFacilityChange = (facility: string) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  // ✅ Handle images
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files) as File[];
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    setPreviewImages((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Use browser location
  const useMyLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported!");
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setFormData((prev) => ({
          ...prev,
          latitude: String(pos.coords.latitude),
          longitude: String(pos.coords.longitude),
        })),
      () => alert("Unable to fetch location!")
    );
  };

  // ✅ Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You are not logged in!");

      const body = new FormData();
      body.append("token", token);
      body.append("name", formData.ground_name);
      body.append("location[address]", formData.location);
      body.append("location[lat]", formData.latitude);
      body.append("location[lng]", formData.longitude);
      body.append("contactNumber", formData.phone_no);
      body.append("groundType", formData.court_type);
      body.append("availableTime[from]", formData.open_from);
      body.append("availableTime[to]", formData.open_to);
      body.append("amenities", JSON.stringify(formData.facilities));
      body.append(
        "sports",
        JSON.stringify(
          formData.sports.map((s) => ({ name: s.sport, pricePerHour: s.price }))
        )
      );
      formData.images.forEach((file) => body.append("images", file));

      const res = await fetch(
        isEditing ? `/api/grounds/${ground?.id}` : "/api/grounds",
        {
          method: isEditing ? "PUT" : "POST",
          body,
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save ground");
      }

      alert("✅ Ground saved successfully!");
      onClose ? onClose() : router.push("/admin");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("❌ " + err.message);
      } else {
        alert("❌ An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white p-6 rounded-xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Arena Identity</label>
            <input
              type="text"
              name="ground_name"
              value={formData.ground_name}
              onChange={handleChange}
              placeholder="Ground Name"
              className="w-full pl-4 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Precise Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Full Address"
              className="w-full pl-4 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
              required
            />
          </div>
        </div>
        {/* Latitude/Longitude */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Geo Coordinates</label>
          <div className="flex gap-3">
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="Latitude"
              className="flex-1 pl-4 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
            />
            <input
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="Longitude"
              className="flex-1 pl-4 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
            />
            <button
              type="button"
              onClick={useMyLocation}
              className="px-6 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg active:scale-95 text-xs whitespace-nowrap"
            >
              📍 Use GPS
            </button>
          </div>
        </div>

        {/* Times & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Opening Hours</label>
            <div className="flex items-center gap-2">
              <input
                type="time"
                name="open_from"
                value={formData.open_from}
                onChange={handleChange}
                className="flex-1 pl-4 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                required
              />
              <span className="text-slate-400 font-bold text-xs uppercase">to</span>
              <input
                type="time"
                name="open_to"
                value={formData.open_to}
                onChange={handleChange}
                className="flex-1 pl-4 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Contact Number</label>
            <input
              type="tel"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              placeholder="e.g., +94 77 123 4567"
              className="w-full pl-4 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
              required
            />
          </div>
        </div>

        {/* Court Type */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Court Type</label>
          <div className="flex gap-4">
            {courtTypes.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="court_type"
                  value={type}
                  checked={formData.court_type === type}
                  onChange={handleChange}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  required
                />
                <span className="text-slate-600 group-hover:text-slate-900 transition-colors">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sports List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-700">Available Sports & Pricing</label>
            <button
              type="button"
              onClick={addSport}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              + Add Another Sport
            </button>
          </div>
          <div className="space-y-3">
            {formData.sports.map((s, idx) => (
              <div key={idx} className="flex gap-3 items-end bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex-1 space-y-1">
                  <select
                    value={s.sport}
                    onChange={(e) => handleSportChange(idx, "sport", e.target.value)}
                    className="w-full pl-4 pr-8 py-4 bg-white border-none rounded-xl text-slate-900 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-sm appearance-none"
                    required
                  >
                    <option value="">Select Sport</option>
                    {defaultSports.map(ds => <option key={ds} value={ds}>{ds}</option>)}
                  </select>
                </div>
                <div className="w-32 space-y-1">
                  <input
                    type="number"
                    value={s.price}
                    onChange={(e) => handleSportChange(idx, "price", e.target.value)}
                    placeholder="LKR/hr"
                    className="w-full pl-4 pr-4 py-4 bg-white border-none rounded-xl text-slate-900 focus:ring-4 focus:ring-emerald-500/10 transition-all font-black text-sm"
                    required
                  />
                </div>
                {formData.sports.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSport(idx)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Facilities */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Facilities & Amenities</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {defaultFacilities.map((f) => (
              <label key={f} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.facilities.includes(f)}
                  onChange={() => handleFacilityChange(f)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs text-slate-600">{f}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700">Gallery Images</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {previewImages.map((src, idx) => (
              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group">
                <img src={src} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            ))}
            <label className="aspect-square rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-all">
              <span className="text-2xl text-slate-400">+</span>
              <span className="text-[10px] font-bold text-slate-500">Upload</span>
              <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-lg hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-100 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-8 uppercase tracking-widest"
        >
          {isSubmitting
            ? isEditing ? "Synchronizing Changes..." : "Creating Facility..."
            : isEditing ? "Save Arena Details" : "Publish This Arena"}
        </button>
      </form>
    </div>
  );
}

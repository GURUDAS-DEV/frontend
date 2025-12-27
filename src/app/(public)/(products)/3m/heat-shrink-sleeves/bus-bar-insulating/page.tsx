"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/loader";
import Navigation from "@/components/navigation";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { updateLocalStorageArray } from "@/utils/localstorage";
import { Download } from "lucide-react";
import { useVisibility } from "@/app/provider";

export default function Component() {
  const [formData, setFormData] = useState({
    size: "",
    quantity: 1,
    voltage: "",
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const {setIsVisible} = useVisibility();

  const productImages = [
    "/new_pics/Bus-Bar-Insulating.jpg",
    "/3m/HEAT_SHRINK_SLEEVES/BUSBAR_SLEEVES/img1.png",
    "/3m/HEAT_SHRINK_SLEEVES/BUSBAR_SLEEVES/img2.png",
  ];

  const sizeOptions = [
    "35/12 mm",
    "55/20 mm",
    "70/30 mm",
    "100/40 mm",
    "160/50 mm",
    "205/60 mm",
  ];
  const voltageOptions = ["22 kV", "33 kV", "52 kV"];

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddToCart = async () => {
    if (!formData.size) {
      toast({ description: "Please select a size type." });
      return;
    }

    setLoading(true);

    try {
      setIsVisible(false);
      const sku = `3M_HS_BB_${formData.voltage.split(" ")[0]}_${
        formData.size.split(" ")[0]
      }`;
      const quantity = formData.quantity;
      const name = `3M Bus Bar Insulating ${formData.size} FOR ${formData.voltage}`;

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/order`,
        { sku, quantity, name }
      );

      if (res?.data?.id) {
        const key = "3mItems";
        updateLocalStorageArray(key, res.data.id);
      }

      toast({ description: "Added to Cart Successfully" });
 window.location.reload()


    } catch (error) {
      console.error(error);
      toast({ description: "Failed to add to cart, please try again." });
    } finally {
      setLoading(false);
      setIsVisible(true); 
    }
  };

  return (
    <div className="container w-full mx-auto px-10 py-8 mt-[3rem]">
      {loading && <LoadingSpinner />}
      <Card className="overflow-visible">
        <CardContent className="p-0">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {/* Left side - Image + Thumbnails + Description */}
                 <div className="p-10 space-y-8">
                   {/* Main product image */}
                   <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] rounded-lg overflow-visible bg-white shadow">
                     <Image
                       src={productImages[selectedImage]}
                       alt={`Product Image ${selectedImage + 1}`}
                       layout="fill"
                       objectFit="contain"
                       className="rounded-lg"
                     />
                  {/* Add download button - positioned absolutely */}
                  <div className="absolute -bottom-6 right-4 z-10">
                    <a
                      href="/3m/HEAT_SHRINK_SLEEVES/BUSBAR_SLEEVES/busbar_sleeve.pdf"
                      download
                      className="flex items-center justify-center gap-1 p-2 bg-white/90 border rounded-md hover:bg-gray-100 transition-colors shadow-sm"
                    >
                      <Download className="h-3 w-3" />
                      <span className="text-xs font-medium">Tech Sheet</span>
                    </a>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pb-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 relative rounded-md overflow-visible ${
                      selectedImage === index ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </button>
                ))}
              </div>
        </div>

            {/* Right side - Product details and form */}
            <div className="w-full lg:w-1/2 p-6 flex flex-col">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    Bus Bar Insulating
                  </h1>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="size">Size</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("size", value)
                      }
                    >
                      <SelectTrigger id="size">
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                      <SelectContent>
                        {sizeOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="voltage">Voltage</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("voltage", value)
                      }
                    >
                      <SelectTrigger id="voltage">
                        <SelectValue placeholder="Select Voltage" />
                      </SelectTrigger>
                      <SelectContent>
                        {voltageOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) =>
                        handleInputChange(
                          "quantity",
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
          <div className="prose p-10 w-full text-gray-700">
            <h2 className="text-xl font-semibold"> Heat Shrink Sleeves Bus Bar Product Description</h2>
            <p>
             Our Heat Shrink Tubing for Busbars is designed to provide reliable insulation and protection for indoor and outdoor applications up to 52kV. Suitable for both round and rectangular busbars, this high-performance tubing ensures safety, durability, and operational efficiency in critical electrical environments.
By preventing bird and animal-related faults as well as flashovers in reduced clearance situations, it enhances the reliability of power systems while reducing maintenance risks.

            </p>

            <h3 className="font-semibold mt-4">Features:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Easy to install with heat shrink technology.</li>
              <li>Excellent anti-tracking and insulation properties.</li>
              <li>Prevents bird and animal interference.</li>
              <li>Reduces risk of flashovers in compact installations.</li>
            </ul>

            <h3 className="font-semibold mt-4">Applications:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Indoor and outdoor busbar insulation up to 52kV</li>
              <li>
                Round and rectangular busbars
              </li>
              <li>Busbar and cable connection insulation</li>
              <li>Busbars in switchgear cabinets and panels</li>
            </ul>
          </div>
      </Card>
    
    </div>
  );
}

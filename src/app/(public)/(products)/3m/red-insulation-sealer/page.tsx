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
import { ArrowLeft, Download } from "lucide-react";
import LoadingSpinner from "@/components/loader";
import Navigation from "@/components/navigation";
import { updateLocalStorageArray } from "@/utils/localstorage";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useVisibility } from "@/app/provider";

export default function Component() {
  const [formData, setFormData] = useState({
    size: "",
    quantity: 1,
  });

  const [loading, setLoading] = useState(false);
  const {setIsVisible} = useVisibility();
  const [selectedImage, setSelectedImage] = useState(0);

  const productImages = ["/new_pics/Red-Insulation-Sealer.jpg"];

  const sizeOptions = ["AEROSOL 1602-R 12 OZ"];

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
      const sku = "3M_AS_1602-R";
      const quantity = formData.quantity;
      const name = `3M Red Insulation Sealer AEROSOL 1602-R`;

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
    <div className="container w-full mx-auto px-2 py-4 mt-[3rem]">
      {loading && <LoadingSpinner />}

      <Card className="overflow-visible">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Images */}
            <div className="w-full lg:w-1/2 p-10 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
              <div className="sticky top-0 bg-background pt-4">
                <div className="relative h-[300px] md:h-[400px] lg:h-[500px] mb-4">
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
                      href="/3m/RED_INSULATION_SEALER/aerosol_red.pdf"
                      download
                      className="flex items-center justify-center gap-1 p-2 bg-white/90 border rounded-md hover:bg-gray-100 transition-colors shadow-sm"
                    >
                      <Download className="h-3 w-3" />
                      <span className="text-xs font-medium">Tech Sheet</span>
                    </a>
                  </div>
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
                    Red Insulation Sealer
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
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => {
                        // Allow empty or valid number input
                        const newValue = e.target.value;
                        if (newValue === "" || !isNaN(parseInt(newValue))) {
                          handleInputChange("quantity", newValue);
                        }
                      }}
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
  <h2 className="text-xl font-semibold">3M™ Electrical Insulating Sealer 1602-R Product Description</h2>
  <p>
    The 3M™ Electrical Insulating Sealer 1602-R is a premium, electrical-grade, fast-drying sealer and insulator 
    designed to safeguard electrical systems from weather, moisture, corrosion, oil, alkalis, and acids. 
    Packaged in a convenient pressurized spray can, it allows for quick and effective application, even in 
    hard-to-reach areas.
  </p>
  <p>
    This versatile sealer can be applied over insulation on wire and cable splices, or used as a touch-up 
    insulator on motor windings and frames—ensuring long-lasting protection and reliability in demanding 
    electrical environments.
  </p>

  <h3 className="font-semibold mt-4">Features:</h3>
  <ul className="list-disc pl-5 space-y-1">
    <li>Electrical-grade, fast-drying protective sealer.</li>
    <li>Safeguards against moisture, corrosion, oil, alkalis, and acids.</li>
    <li>Convenient 12-oz pressurized can for easy use.</li>
    <li>Effective for touch-ups and general-purpose sealing.</li>
    <li>Easily reaches inaccessible or compact areas.</li>
    <li>RoHS 2011/65/EU compliant.</li>
  </ul>

  <h3 className="font-semibold mt-4">Applications:</h3>
  <ul className="list-disc pl-5 space-y-1">
    <li>Over insulation on wire and cable splices.</li>
    <li>Touch-up insulation on motor windings and frames.</li>
    <li>General-purpose electrical sealing and protection.</li>
  </ul>
</div>
      </Card>
      

    </div>
  );
}

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
import { Download } from "lucide-react";
import { useVisibility } from "@/app/provider";
import { toast } from "@/hooks/use-toast";
import { updateLocalStorageArray } from "@/utils/localstorage";
import axios from "axios";

export default function Component() {
  const [formData, setFormData] = useState({
    size: "",
    quantity: 1,
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { setIsVisible } = useVisibility();

  const productImages = [
    "/new_pics/Heat-Shrink-Sleeves-Wrap-Around.jpg",
    "/3m/HEAT_SHRINK_SLEEVES/wrap_around/img1.png",
  ];

  const sizeOptions = [
    "52/10 mm",
    "76/22 mm",
    "120/34 mm",
    "122/38 mm",
    "140/42 mm",
    "160/50 mm",
    "200/60 mm",
  ];

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
      const sku = `3M_WAS_${formData.size}_${formData.size.split(" ")[0]}`;
      const quantity = formData.quantity;
      const name = `3M Wrap Around Seleeves ${formData.size}`;

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
    <div className="container w-full mx-auto px-4 py-8 mt-[3rem]">
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
                      href="/3m/HEAT_SHRINK_SLEEVES/wrap-around/Wrap_Around_Sleeve.pdf"
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
                    Wrap Around Sleeves
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
                        <SelectValue placeholder="Select size" />
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
  <h2 className="text-xl font-semibold">Heat Shrink Sleeves Wrap Around Product Description</h2>
  <p>
    3M’s reinforcement heat shrink splice closure system is designed to provide excellent split 
    resistance along with strong environmental and mechanical protection for cable joints. 
    Manufactured from polyolefin material with polyethylene layers, an aluminum barrier for 
    moisture-vapour transmission, and a hot melt adhesive on the inner surface, these sleeves 
    ensure long-lasting durability and sealing performance.
  </p>
  <p>
    Supplied in wraparound form with stainless steel channels to make the sleeves cylindrical 
    before shrinking, they are easy to install. When heat is applied, the inner adhesive layer 
    melts and bonds to the cable surface, creating a reliable waterproof seal.
  </p>

  <h3 className="font-semibold mt-4">Features & Benefits:</h3>
  <ul className="list-disc pl-5 space-y-1">
    <li>Quick and easy installation.</li>
    <li>Maximum protection against mechanical stress.</li>
    <li>Good bonding to standard cable jacket materials.</li>
    <li>For outer jacketing on cables from 1.1kV to 33kV.</li>
    <li>Excellent performance in harsh environmental conditions.</li>
    <li>Hot melt adhesive forms a durable, moisture-resistant seal.</li>
  </ul>

  <h3 className="font-semibold mt-4">Applications:</h3>
  <ul className="list-disc pl-5 space-y-1">
    <li>Quick re-jacketing of cables in the field.</li>
    <li>Repairing damaged outer jackets on cables.</li>
    <li>Outer sealing jacket for cable joints from 1.1kV to 33kV.</li>
    <li>Suitable for installations in confined spaces using standard heating equipment such as a torch.</li>
  </ul>
</div>
      </Card>
      

    </div>
  );
}

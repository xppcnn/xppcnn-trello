"use client";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { Check, Loader2 } from "lucide-react";
import { defaultImages } from "@/constants/images";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import Link from "next/link";
import FormErrors from "./FormErrors";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | null> | null;
}
const FormPicker = ({ id, errors }: FormPickerProps) => {
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectImageId, setSelectImageId] = useState<string | null>(null);
  const { pending } = useFormStatus();
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["mxiajIFdBs4"],
          count: 9,
        });
        if (result.response) {
          setImages(result.response as Array<Record<string, any>>);
        } else {
          setImages(defaultImages);
        }
      } catch (error) {
        setImages(defaultImages);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video  hover:opacity-70 transition bg-muted group",
              pending && "cursor-auto opacity-50 hover:opacity-50"
            )}
            onClick={() => {
              if (pending) return;
              setSelectImageId(image.id);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              fill
              alt=""
              src={image.urls.thumb}
              className="object-cover rounded-sm"
            />
            {selectImageId === image.id && (
              <div className="absolute h-full w-full flex justify-center items-center inset-y-0">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="absolute bottom-0 w-full text-[10px] opacity-0 group-hover:opacity-100 truncate text-white hover:underline p-1 bg-black/50"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  );
};

export default FormPicker;

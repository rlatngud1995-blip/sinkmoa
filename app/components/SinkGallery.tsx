
"use client";

import { useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

type Props = {
  brand?: string;
  mode?: "product" | "installation" | "cutting";
};

const BRAND_IMAGES: Record<
  string,
  GalleryImage[]
> = {
  regens: [
    {
      src: "/IMG_0299.png",
      alt: "리젠스 사각 싱크볼 제품 이미지",
      caption: "리젠스 제품 이미지",
    },
  ],
  baekjo: [
    {
      src: "/IMG_1642.png",
      alt: "백조 고니 사각 싱크볼 제품 이미지",
      caption: "백조 고니 제품 이미지",
    },
  ],
};

const INSTALLATION_IMAGES: GalleryImage[] = [
  {
    src: "/IMG_1528.jpeg",
    alt: "사각 싱크볼 설치 현장",
    caption: "사각 싱크볼 설치 사례",
  },
  {
    src: "/IMG_0403.jpeg",
    alt: "스테인리스 사각 싱크볼 시공",
    caption: "싱크볼 설치 사례",
  },
  {
    src: "/IMG_0080.jpeg",
    alt: "싱크볼 및 수전 사용 모습",
    caption: "싱크볼·수전 시공 사례",
  },
  {
    src: "/53EE260C-F4EF-4593-8354-F5E29F65BDDD.png",
    alt: "사각 싱크볼 설치 완료 현장",
    caption: "싱크볼 설치 완료 사례",
  },
];

const CUTTING_IMAGES: GalleryImage[] = [
  {
    src: "/IMG_0394.jpeg",
    alt: "싱크대 상판 타공 작업 현장",
    caption: "상판 타공 작업 사례",
  },
];

export default function SinkGallery({
  brand,
  mode = "product",
}: Props) {
  const images =
    mode === "installation"
      ? INSTALLATION_IMAGES
      : mode === "cutting"
      ? CUTTING_IMAGES
      : BRAND_IMAGES[brand ?? ""] ?? [];

  const [selected, setSelected] = useState(0);

  if (images.length === 0) {
    return null;
  }

  const active = images[selected] ?? images[0];

  return (
    <section className="sink-gallery">
      <div className="gallery-main">
        <img
          src={active.src}
          alt={active.alt}
          loading="lazy"
        />
      </div>

      <p className="gallery-caption">
        {active.caption}
      </p>

      {images.length > 1 && (
        <div className="gallery-thumbnails">
          {images.map((image, index) => (
            <button
              type="button"
              key={image.src}
              onClick={() => setSelected(index)}
              className={
                selected === index ? "active" : ""
              }
              aria-label={`${index + 1}번 사진 보기`}
              aria-pressed={selected === index}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        .sink-gallery {
          width: 100%;
          margin: 24px 0;
        }

        .gallery-main {
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #f7f5f0;
          border: 1px solid #e6e0d7;
        }

        .gallery-main img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .gallery-caption {
          color: #777;
          font-size: 12px;
          margin: 12px 0 16px;
          text-align: center;
        }

        .gallery-thumbnails {
          display: grid;
          grid-template-columns: repeat(
            4,
            minmax(0, 1fr)
          );
          gap: 10px;
        }

        .gallery-thumbnails button {
          padding: 0;
          border: 1px solid #ddd7cd;
          background: white;
          cursor: pointer;
          aspect-ratio: 1;
          overflow: hidden;
        }

        .gallery-thumbnails button.active {
          border: 2px solid #c4b49a;
        }

        .gallery-thumbnails img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 600px) {
          .gallery-thumbnails {
            gap: 6px;
          }

          .gallery-caption {
            font-size: 11px;
          }
        }
      `}</style>
    </section>
  );
}

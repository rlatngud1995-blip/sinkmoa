import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  INSTALLATION_REGIONS,
  getAllInstallationPaths,
  getInstallationLocation,
} from "../../../data/installation-regions";

const SITE = "https://www.sinkmoa.com";

type PageProps = {
  params: Promise<{
    region: string;
    district: string;
  }>;
};

type LocalSeo = {
  searchName: string;
  title: string;
  description: string;
  subtitle: string;
  neighborhoods: string[];
  intro1: string;
  intro2: string;
};

const SEO: Record<string, LocalSeo> = {
  gangnam: {
    searchName: "강남",
    title:
      "강남 싱크볼 교체 | 사각싱크볼 설치·상판 타공 | 싱크모아",
    description:
      "강남 싱크볼 교체 및 사각싱크볼 설치 상담. 역삼·논현·대치·도곡·청담·삼성동 싱크볼 시공, 기존 싱크볼 철거, 상판 타공, 수전·배수구 연결까지 안내합니다.",
    subtitle: "사각싱크볼 설치부터 상판 타공까지",
    neighborhoods: [
      "역삼동",
      "논현동",
      "대치동",
      "도곡동",
      "청담동",
      "삼성동",
    ],
    intro1:
      "강남구에서 오래된 싱크볼을 교체하거나 기존 싱크볼을 사각싱크볼로 변경할 때는 제품 크기뿐 아니라 기존 상판 타공 크기와 상판 재질을 함께 확인해야 합니다.",
    intro2:
      "싱크모아는 강남 싱크볼 교체 상담 시 현재 싱크볼 사진과 타공 사이즈를 확인하고 백조·리젠스·벨라고·아티잔 제품 중 설치 가능한 제품과 필요한 작업을 안내합니다.",
  },

  songpa: {
    searchName: "송파",
    title:
      "송파 싱크볼 교체 | 잠실·문정 사각싱크볼 설치 | 싱크모아",
    description:
      "송파 싱크볼 교체 및 사각싱크볼 설치 상담. 잠실·문정·가락·방이·석촌 등 송파구 싱크볼 교체, 상판 타공, 기존 싱크볼 철거와 수전·배수구 연결 안내.",
    subtitle: "잠실·문정 사각싱크볼 설치 상담",
    neighborhoods: [
      "잠실동",
      "문정동",
      "가락동",
      "방이동",
      "석촌동",
      "오금동",
    ],
    intro1:
      "송파구 아파트와 주택에서 싱크볼을 교체할 때 기존 상판 타공 규격과 신규 싱크볼 규격을 먼저 비교해야 합니다.",
    intro2:
      "잠실·문정·가락·방이·석촌 등 송파구 싱크볼 교체 상담 시 현장 사진과 현재 싱크볼 크기를 확인하여 사각싱크볼 설치와 상판 타공 필요 여부를 안내합니다.",
  },

  seocho: {
    searchName: "서초",
    title:
      "서초 싱크볼 교체 | 반포·방배 사각싱크볼 설치 |

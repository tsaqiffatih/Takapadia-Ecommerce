"use client";
import { useSearchParams } from "next/navigation";

export default function ErrorNotif() {
  const params = useSearchParams();
  const err = params.get("error");
  console.log(err);
  return err && <h2 className="text-red-600 font-bold underline">{err} !!!</h2>;
}